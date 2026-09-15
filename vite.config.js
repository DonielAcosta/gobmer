import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'node:https'
import { constants as cryptoConstants } from 'node:crypto'

/**
 * OCI a veces negocia TLS antiguo; OpenSSL 3 / Node 20 lo rechaza.
 * Este agent permite handshake legacy y evita EPROTO en el proxy de Vite.
 */
const ociAgent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: false,
  minVersion: 'TLSv1',
  maxVersion: 'TLSv1.3',
  secureOptions: cryptoConstants.SSL_OP_LEGACY_SERVER_CONNECT,
  timeout: 8000,
})

function sendProxyError(res, err) {
  if (!res || res.headersSent || typeof res.writeHead !== 'function') return
  try {
    res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(
      JSON.stringify({
        code: 'oci_unreachable',
        message:
          'No se pudo conectar con oci.merida.gob.ve (DNS/red). La app usará datos locales.',
        detail: err.code || err.message,
      })
    )
  } catch {
    /* ignore broken socket */
  }
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/oci-api': {
        target: 'https://oci.merida.gob.ve',
        changeOrigin: true,
        secure: false,
        agent: ociAgent,
        timeout: 10000,
        proxyTimeout: 10000,
        rewrite: (path) => path.replace(/^\/oci-api/, '/wp-json/wp/v2'),
        configure: (proxy) => {
          proxy.on('error', (err, _req, res) => {
            const code = err.code || err.message
            // Evitar spam: un log corto basta; el cliente ya hace fallback.
            if (code === 'EAI_AGAIN' || code === 'ENOTFOUND') {
              console.warn(
                '[oci-proxy] DNS no resuelve oci.merida.gob.ve — usando fallback local'
              )
            } else {
              console.warn('[oci-proxy]', code)
            }
            sendProxyError(res, err)
          })
        },
      },
    },
  },
})
