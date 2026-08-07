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
})

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/oci-api': {
        target: 'https://oci.merida.gob.ve',
        changeOrigin: true,
        secure: false,
        agent: ociAgent,
        timeout: 30000,
        rewrite: (path) => path.replace(/^\/oci-api/, '/wp-json/wp/v2'),
        configure: (proxy) => {
          proxy.on('error', (err, _req, res) => {
            console.error('[oci-proxy]', err.code || err.message)
            if (res && !res.headersSent) {
              res.writeHead(502, { 'Content-Type': 'application/json' })
              res.end(
                JSON.stringify({
                  code: 'oci_unreachable',
                  message:
                    'No se pudo conectar con oci.merida.gob.ve (DNS/red/TLS). Revisa tu conexión e intenta de nuevo.',
                  detail: err.code || err.message,
                })
              )
            }
          })
        },
      },
    },
  },
})
