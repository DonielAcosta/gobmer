import {
  API,
  SECRETARIA_IDS,
  SECRETARIA_META,
  PER_PAGE,
  getFallbackSecretarias,
} from './config.js'

const ociWarned = new Set()

function warnOnce(key, message) {
  if (ociWarned.has(key)) return
  ociWarned.add(key)
  console.info(message)
}

function networkMessage(err) {
  const detail = err?.message || String(err)
  if (/Failed to fetch|NetworkError|EAI_AGAIN|ENOTFOUND|EPROTO|502|oci_unreachable|DNS|red/i.test(detail)) {
    return 'OCI no está disponible ahora (problema de red o DNS). Se muestran datos locales.'
  }
  return detail
}

async function request(url) {
  let res
  try {
    res = await fetch(url, {
      headers: { Accept: 'application/json' },
    })
  } catch (err) {
    const error = new Error(networkMessage(err))
    error.cause = err
    error.network = true
    throw error
  }

  if (!res.ok) {
    let detail = res.statusText || 'Error al consultar la API'
    let code = null
    try {
      const body = await res.json()
      if (body?.message) detail = body.message
      if (body?.code) code = body.code
    } catch {
      /* ignore */
    }
    const err = new Error(detail)
    err.status = res.status
    err.code = code
    err.network =
      res.status >= 500 ||
      code === 'oci_unreachable' ||
      /DNS|red|OCI no está disponible|oci_unreachable/i.test(detail)
    throw err
  }

  let data
  try {
    data = await res.json()
  } catch (parseErr) {
    const error = new Error('La respuesta de la API no contiene un formato JSON válido.')
    error.cause = parseErr
    error.status = res.status
    error.network = false
    throw error
  }

  return {
    data,
    totalPages: Number(res.headers.get('X-WP-TotalPages') || 1),
    total: Number(res.headers.get('X-WP-Total') || 0),
  }
}

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, '').trim()
}

function decodeEntities(text = '') {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

/** Extrae intro, entes adscritos y noticias del HTML Elementor de OCI */
export function parseSecretariaContent(html = '') {
  if (!html || typeof html !== 'string') {
    return { intro: [], entities: [], relatedNews: [] }
  }

  try {
    const intro = []
    const seenIntro = new Set()
    for (const match of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
      const text = decodeEntities(stripHtml(match[1])).replace(/\s+/g, ' ').trim()
      if (
        !text ||
        text.length < 40 ||
        /órganos y entes adscritos/i.test(text) ||
        seenIntro.has(text)
      ) {
        continue
      }
      seenIntro.add(text)
      intro.push(text)
      if (intro.length >= 3) break
    }

    const entities = []
    const seenEntity = new Set()
    for (const match of html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)) {
      const text = decodeEntities(stripHtml(match[1])).replace(/\s+/g, ' ').trim()
      if (!text || text.length < 4 || seenEntity.has(text)) continue
      seenEntity.add(text)
      entities.push(text.replace(/\.$/, ''))
    }

    const relatedNews = []
    const seenNews = new Set()
    const parts = html.split(/eael-grid-post eael-post-grid-column/i)
    for (const part of parts.slice(1)) {
      const title =
        part.match(/eael-entry-title[\s\S]*?title="([^"]+)"/i)?.[1] ||
        decodeEntities(
          stripHtml(part.match(/eael-entry-title[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i)?.[1] || '')
        )
      const href =
        part.match(/eael-grid-post-link"[^>]*href="([^"]+)"/i)?.[1] ||
        part.match(/href="(https?:\/\/[^"]+)"/i)?.[1]
      const image =
        part.match(/eael-entry-thumbnail[\s\S]*?<img[^>]+src="([^"]+)"/i)?.[1] || null
      const dateLabel =
        part.match(/eael-posted-on[^>]*>[\s\S]*?(\d{1,2}\s+de\s+\w+\s+de\s+\d{4})/i)?.[1] ||
        null

      if (!title || !href || seenNews.has(href)) continue
      seenNews.add(href)
      relatedNews.push({
        title: decodeEntities(title).trim(),
        href,
        image,
        dateLabel,
      })
    }

    return { intro, entities, relatedNews }
  } catch (err) {
    console.warn('[OCI] Error procesando contenido HTML de secretaría:', err)
    return { intro: [], entities: [], relatedNews: [] }
  }
}

function mapSecretaria(page) {
  try {
    const content = page?.content?.rendered || ''
    const parsed = parseSecretariaContent(content)
    const meta = SECRETARIA_META[page?.id] || {
      short: stripHtml(page?.title?.rendered || ''),
      accent: 'var(--brand-blue)',
      icon: null,
      slug: page?.slug,
      title: stripHtml(page?.title?.rendered || ''),
      excerpt: stripHtml(page?.excerpt?.rendered || ''),
    }

    return {
      id: page?.id,
      slug: meta.slug || page?.slug,
      title: meta.title || stripHtml(page?.title?.rendered || ''),
      excerpt: meta.excerpt || stripHtml(page?.excerpt?.rendered || ''),
      content,
      link: page?.link || '',
      short: meta.short,
      accent: meta.accent,
      icon: meta.icon,
      intro: parsed.intro.length ? parsed.intro : [meta.excerpt].filter(Boolean),
      entities: parsed.entities,
      relatedNews: parsed.relatedNews,
    }
  } catch (err) {
    console.warn('[OCI] Error mapeando datos de secretaría:', err)
    return {
      id: page?.id,
      slug: page?.slug || '',
      title: stripHtml(page?.title?.rendered || ''),
      excerpt: '',
      content: '',
      link: page?.link || '',
      short: '',
      accent: 'var(--brand-blue)',
      icon: null,
      intro: [],
      entities: [],
      relatedNews: [],
    }
  }
}

let secretariasCache = null
let secretariasOffline = false

export async function getSecretarias() {
  if (secretariasCache) return secretariasCache

  try {
    const ids = SECRETARIA_IDS.join(',')
    const { data } = await request(
      `${API}/pages?include=${ids}&per_page=${SECRETARIA_IDS.length}&_fields=id,slug,title,excerpt,content,link`
    )

    if (!Array.isArray(data)) {
      throw new Error('La respuesta recibida no es un listado válido de páginas.')
    }

    const order = new Map(SECRETARIA_IDS.map((id, i) => [id, i]))
    secretariasCache = [...data]
      .sort((a, b) => (order.get(a.id) ?? 99) - (order.get(b.id) ?? 99))
      .map(mapSecretaria)
    secretariasOffline = false
    return secretariasCache
  } catch (err) {
    warnOnce(
      'secretarias',
      `[OCI] ${err.network ? 'sin conexión' : 'error de consulta'} — secretarías con datos locales`
    )
    secretariasOffline = true
    secretariasCache = getFallbackSecretarias()
    return secretariasCache
  }
}

export async function getSecretariaBySlug(slug) {
  try {
    const list = await getSecretarias()
    let found = list?.find((s) => s.slug === slug)

    if (!found) {
      const fallbackList = getFallbackSecretarias()
      found = fallbackList.find((s) => s.slug === slug)
    }

    if (!found) {
      const err = new Error('Secretaría no encontrada')
      err.status = 404
      throw err
    }
    return { ...found, offline: Boolean(found.offline || secretariasOffline) }
  } catch (err) {
    if (err.status === 404) {
      throw err
    }
    try {
      const fallbackList = getFallbackSecretarias()
      const fallbackFound = fallbackList.find((s) => s.slug === slug)
      if (fallbackFound) {
        return { ...fallbackFound, offline: true }
      }
    } catch {
      /* ignore */
    }
    const error = new Error(`Error al obtener la secretaría: ${err.message}`)
    error.status = err.status || 500
    error.cause = err
    throw error
  }
}

export async function getPosts(page = 1) {
  try {
    const { data, totalPages, total } = await request(
      `${API}/posts?_embed&per_page=${PER_PAGE}&page=${page}`
    )

    const posts = Array.isArray(data) ? data.map(normalizePost) : []

    return {
      posts,
      totalPages: Number(totalPages) || 1,
      total: Number(total) || posts.length,
      offline: false,
    }
  } catch (err) {
    warnOnce('noticias', `[OCI] sin conexión o error al cargar noticias: ${err.message}`)
    return {
      posts: [],
      totalPages: 0,
      total: 0,
      offline: true,
      error: err.message,
    }
  }
}

export async function getPost(id) {
  try {
    if (!id) {
      const err = new Error('ID de publicación no proporcionado.')
      err.status = 400
      throw err
    }

    const { data } = await request(`${API}/posts/${id}?_embed`)
    if (!data) {
      const err = new Error('Publicación no encontrada')
      err.status = 404
      throw err
    }

    return normalizePost(data)
  } catch (err) {
    if (err.status === 404) {
      const error = new Error('La publicación solicitada no existe o no fue encontrada.')
      error.status = 404
      throw error
    }
    const error = new Error(
      err.network
        ? 'No se pudo conectar con el servidor para cargar la publicación.'
        : (err.message || 'Error al consultar la publicación.')
    )
    error.status = err.status || 500
    error.cause = err
    throw error
  }
}

function normalizePost(post) {
  try {
    const media = post?._embedded?.['wp:featuredmedia']?.[0]
    return {
      id: post?.id,
      slug: post?.slug,
      title: stripHtml(post?.title?.rendered || ''),
      excerpt: stripHtml(post?.excerpt?.rendered || ''),
      content: post?.content?.rendered || '',
      date: post?.date,
      link: post?.link,
      image: media?.source_url || null,
      imageAlt: media?.alt_text || stripHtml(post?.title?.rendered || ''),
    }
  } catch (err) {
    console.warn('[OCI] Error normalizando post:', err)
    return {
      id: post?.id || 0,
      slug: post?.slug || '',
      title: stripHtml(post?.title?.rendered || 'Sin título'),
      excerpt: '',
      content: '',
      date: post?.date || '',
      link: post?.link || '#',
      image: null,
      imageAlt: '',
    }
  }
}

