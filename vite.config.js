import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'node:https'
import { constants as cryptoConstants } from 'node:crypto'

/**
 * OCI cierra sockets keep-alive, a veces corta el TLS y el certificado
 * puede estar vencido. Proxy propio con TLS laxo + reintentos.
 */
const ociAgent = new https.Agent({
  keepAlive: false,
  rejectUnauthorized: false,
  minVersion: 'TLSv1',
  maxVersion: 'TLSv1.3',
  secureOptions: cryptoConstants.SSL_OP_LEGACY_SERVER_CONNECT,
})

const TRANSIENT = new Set([
  'ECONNRESET',
  'EPIPE',
  'ETIMEDOUT',
  'ECONNREFUSED',
  'UND_ERR_SOCKET',
  'EPROTO',
])

function isTransient(err) {
  const code = err?.code || ''
  const msg = err?.message || ''
  return TRANSIENT.has(code) || /socket hang up|ECONNRESET|timeout/i.test(msg)
}

function fetchOci(path, { accept = '*/*', timeout = 20000 } = {}, attempt = 1) {
  const url = `https://oci.merida.gob.ve${path}`

  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: 'GET',
        agent: ociAgent,
        headers: {
          Accept: accept,
          'User-Agent': 'GOBME-dev-proxy',
          Connection: 'close',
        },
        timeout,
      },
      (upstream) => {
        const chunks = []
        upstream.on('data', (chunk) => chunks.push(chunk))
        upstream.on('end', () => {
          resolve({
            status: upstream.statusCode || 502,
            headers: upstream.headers,
            body: Buffer.concat(chunks),
          })
        })
        upstream.on('error', reject)
      }
    )

    req.on('timeout', () => {
      req.destroy(Object.assign(new Error('timeout'), { code: 'ETIMEDOUT' }))
    })
    req.on('error', reject)
    req.end()
  }).catch(async (err) => {
    if (attempt < 3 && isTransient(err)) {
      await new Promise((wait) => setTimeout(wait, 300 * attempt))
      return fetchOci(path, { accept, timeout }, attempt + 1)
    }
    throw err
  })
}

function sendJsonError(res, err) {
  if (!res || res.writableEnded) return
  const code = err?.code || err?.message
  if (code === 'EAI_AGAIN' || code === 'ENOTFOUND') {
    console.warn('[oci-proxy] DNS no resuelve oci.merida.gob.ve — usando fallback local')
  } else {
    console.warn('[oci-proxy]', code, '— reintentos agotados')
  }
  res.statusCode = 502
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(
    JSON.stringify({
      code: 'oci_unreachable',
      message:
        'No se pudo conectar con oci.merida.gob.ve (DNS/red). La app usará datos locales.',
      detail: code,
    })
  )
}

function attachOciMiddleware(middlewares) {
  middlewares.use(async (req, res, next) => {
    if (req.method !== 'GET' || !req.url) return next()

    // API JSON
    if (req.url.startsWith('/oci-api')) {
      const path = req.url.replace(/^\/oci-api/, '/wp-json/wp/v2')
      try {
        const upstream = await fetchOci(path, {
          accept: 'application/json',
          timeout: 12000,
        })
        for (const key of [
          'content-type',
          'x-wp-total',
          'x-wp-totalpages',
          'link',
          'allow',
        ]) {
          const value = upstream.headers[key]
          if (value) res.setHeader(key, value)
        }
        res.statusCode = upstream.status
        res.end(upstream.body)
      } catch (err) {
        sendJsonError(res, err)
      }
      return
    }

    // Medios (imágenes) — evita bloqueo por certificado vencido
    if (req.url.startsWith('/oci-media')) {
      const path = req.url.replace(/^\/oci-media/, '') || '/'
      try {
        const upstream = await fetchOci(path, {
          accept: 'image/*,*/*',
          timeout: 25000,
        })
        const type = upstream.headers['content-type'] || 'application/octet-stream'
        res.setHeader('Content-Type', type)
        if (upstream.headers['cache-control']) {
          res.setHeader('Cache-Control', upstream.headers['cache-control'])
        } else {
          res.setHeader('Cache-Control', 'public, max-age=86400')
        }
        if (upstream.headers['etag']) res.setHeader('ETag', upstream.headers['etag'])
        res.statusCode = upstream.status
        res.end(upstream.body)
      } catch (err) {
        console.warn('[oci-media]', err?.code || err?.message)
        res.statusCode = 502
        res.end()
      }
      return
    }

    return next()
  })
}

function ociProxyPlugin() {
  return {
    name: 'oci-proxy',
    configureServer(server) {
      attachOciMiddleware(server.middlewares)
    },
    configurePreviewServer(server) {
      attachOciMiddleware(server.middlewares)
    },
  }
}

export default defineConfig({
  plugins: [react(), ociProxyPlugin()],
})
