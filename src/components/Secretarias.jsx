import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSecretarias } from '../api/wp.js'
import { useReveal } from '../hooks/useReveal.js'
import { Loader } from './Loader.jsx'

export function Secretarias() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    getSecretarias()
      .then((data) => {
        if (!cancelled) setItems(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.message ||
              'No se pudieron cargar las secretarías desde la API de OCI.'
          )
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useReveal(loading, items.length)

  return (
    <section className="section secretarias" id="secretarias">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Órganos superiores</p>
          <h2>Secretarías de Transformación</h2>
          <p>
            Iconografía institucional y articulación de políticas públicas
            alineadas con las 7 Grandes Transformaciones.
          </p>
        </div>

        {loading ? <Loader label="Cargando secretarías…" /> : null}
        {error ? <div className="error-box">{error}</div> : null}

        {!loading && !error ? (
          <div className="secretarias-grid">
            {items.map((item, index) => (
              <Link
                key={item.id}
                to={`/secretarias/${item.slug}`}
                className={`secretaria-item reveal reveal-delay-${(index % 3) + 1}`}
                style={{ '--item-accent': item.accent }}
              >
                <div className="secretaria-icon-wrap">
                  {item.icon ? (
                    <img src={item.icon} alt="" width={220} height={110} />
                  ) : (
                    <span className="accent-mark" aria-hidden="true" />
                  )}
                </div>
                <div className="secretaria-body">
                  <h3>{item.short}</h3>
                  <p>{item.excerpt || item.title}</p>
                  <span className="more">Conocer más →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
