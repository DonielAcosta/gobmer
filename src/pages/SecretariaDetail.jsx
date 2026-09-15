import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PLAN_GOBIERNO } from '../api/config.js'
import { getSecretariaBySlug } from '../api/wp.js'
import { Loader } from '../components/Loader.jsx'
import { useReveal } from '../hooks/useReveal.js'

export function SecretariaDetail() {
  const { slug } = useParams()
  const [page, setPage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getSecretariaBySlug(slug)
      .then((data) => {
        if (!cancelled) setPage(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'No se pudo cargar la secretaría.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  useReveal(loading, page?.id, page?.relatedNews?.length)

  const planLinea = PLAN_GOBIERNO.lineas.find((l) => l.slug === slug)

  if (loading) {
    return (
      <article className="page-detail secretaria-page">
        <div className="container" style={{ paddingTop: '2rem' }}>
          <Loader label="Cargando secretaría…" />
        </div>
      </article>
    )
  }

  if (error || !page) {
    return (
      <article className="page-detail secretaria-page">
        <div className="container" style={{ paddingTop: '2rem' }}>
          <Link className="back" to="/#secretarias">
            ← Volver a secretarías
          </Link>
          <div className="error-box">
            {error || 'No se pudo cargar la secretaría.'}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className="page-detail secretaria-page"
      style={{ '--sec-accent': page.accent || 'var(--accent-green)' }}
    >
      <header className="secretaria-hero">
        <div className="container secretaria-hero-inner">
          <Link className="back secretaria-back" to="/#secretarias">
            ← Volver a secretarías
          </Link>

          <div className="secretaria-hero-grid reveal">
            <div className="secretaria-hero-copy">
              <p className="eyebrow">7 Líneas de Transformación</p>
              <h1>{page.title}</h1>
              {page.excerpt ? (
                <p className="secretaria-hero-lead">{page.excerpt}</p>
              ) : null}
              <div className="secretaria-hero-actions">
                {planLinea?.pdf ? (
                  <a
                    className="btn btn-primary"
                    href={planLinea.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Descargar línea (PDF)
                  </a>
                ) : null}
                <Link className="btn btn-ghost" to="/plan-de-gobierno">
                  Plan de Gobierno
                </Link>
              </div>
            </div>

            {page.icon ? (
              <div className="secretaria-hero-visual">
                <img src={page.icon} alt="" width={360} height={200} />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className="container secretaria-body">
        {page.intro?.length ? (
          <section className="secretaria-intro reveal">
            <div className="section-head">
              <p className="eyebrow">Propósito</p>
              <h2>¿Qué impulsa esta secretaría?</h2>
            </div>
            <div className="secretaria-intro-grid">
              {page.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ) : null}

        {page.entities?.length ? (
          <section className="secretaria-entities reveal">
            <div className="section-head">
              <p className="eyebrow">Estructura</p>
              <h2>Órganos y entes adscritos</h2>
            </div>
            <ul className="secretaria-entities-grid">
              {page.entities.map((entity, index) => (
                <li
                  key={entity}
                  className={`reveal reveal-delay-${(index % 3) + 1}`}
                >
                  <span className="secretaria-entity-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <strong>{entity}</strong>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {page.relatedNews?.length ? (
          <section className="secretaria-news">
            <div className="section-head reveal">
              <p className="eyebrow">Actualidad</p>
              <h2>Noticias de esta línea</h2>
              <p>Publicaciones recientes relacionadas con la secretaría.</p>
            </div>
            <div className="secretaria-news-grid">
              {page.relatedNews.map((item, index) => (
                <a
                  key={item.href}
                  className={`secretaria-news-card reveal reveal-delay-${(index % 3) + 1}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="secretaria-news-media">
                    {item.image ? (
                      <img src={item.image} alt="" loading="lazy" />
                    ) : null}
                  </div>
                  <div className="secretaria-news-body">
                    {item.dateLabel ? <time>{item.dateLabel}</time> : null}
                    <h3>{item.title}</h3>
                    <span className="more">Leer en OCI →</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {!page.intro?.length &&
        !page.entities?.length &&
        !page.relatedNews?.length ? (
          <div
            className="wp-content secretaria-wp-fallback"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : null}
      </div>
    </article>
  )
}
