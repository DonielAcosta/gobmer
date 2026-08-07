import {
  API,
  SECRETARIA_IDS,
  SECRETARIA_META,
  PER_PAGE,
  getFallbackSecretarias,
} from './config.js'

function networkMessage(err) {
  const detail = err?.message || String(err)
  if (/Failed to fetch|NetworkError|EAI_AGAIN|ENOTFOUND|EPROTO|502/i.test(detail)) {
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
    try {
      const body = await res.json()
      if (body?.message) detail = body.message
    } catch {
      /* ignore */
    }
    const err = new Error(detail)
    err.status = res.status
    err.network = res.status >= 500
    throw err
  }

  const data = await res.json()
  return {
    data,
    totalPages: Number(res.headers.get('X-WP-TotalPages') || 1),
    total: Number(res.headers.get('X-WP-Total') || 0),
  }
}

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, '').trim()
}

function mapSecretaria(page) {
  return {
    id: page.id,
    slug: page.slug,
    title: stripHtml(page.title?.rendered || ''),
    excerpt: stripHtml(page.excerpt?.rendered || ''),
    content: page.content?.rendered || '',
    link: page.link,
    ...(SECRETARIA_META[page.id] || {
      short: stripHtml(page.title?.rendered || ''),
      accent: 'var(--brand-blue)',
      icon: null,
    }),
  }
}

export async function getSecretarias() {
  try {
    const ids = SECRETARIA_IDS.join(',')
    const { data } = await request(
      `${API}/pages?include=${ids}&per_page=${SECRETARIA_IDS.length}&_fields=id,slug,title,excerpt,content,link`
    )

    const order = new Map(SECRETARIA_IDS.map((id, i) => [id, i]))
    return [...data]
      .sort((a, b) => (order.get(a.id) ?? 99) - (order.get(b.id) ?? 99))
      .map(mapSecretaria)
  } catch (err) {
    if (err.network || err.status >= 500) {
      console.warn('[OCI] secretarías offline → fallback local', err.message)
      return getFallbackSecretarias()
    }
    throw err
  }
}

export async function getSecretariaBySlug(slug) {
  const list = await getSecretarias()
  const found = list.find((s) => s.slug === slug)
  if (!found) {
    const err = new Error('Secretaría no encontrada')
    err.status = 404
    throw err
  }
  return found
}

export async function getPosts(page = 1) {
  try {
    const { data, totalPages, total } = await request(
      `${API}/posts?_embed&per_page=${PER_PAGE}&page=${page}`
    )

    return {
      posts: data.map(normalizePost),
      totalPages,
      total,
    }
  } catch (err) {
    if (err.network || err.status >= 500) {
      console.warn('[OCI] noticias offline', err.message)
      return { posts: [], totalPages: 0, total: 0, offline: true }
    }
    throw err
  }
}

export async function getPost(id) {
  const { data } = await request(`${API}/posts/${id}?_embed`)
  return normalizePost(data)
}

function normalizePost(post) {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title?.rendered || ''),
    excerpt: stripHtml(post.excerpt?.rendered || ''),
    content: post.content?.rendered || '',
    date: post.date,
    link: post.link,
    image: media?.source_url || null,
    imageAlt: media?.alt_text || stripHtml(post.title?.rendered || ''),
  }
}
