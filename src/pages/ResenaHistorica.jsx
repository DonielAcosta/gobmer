import { Link } from 'react-router-dom'
import { RESENA_HISTORICA } from '../api/config.js'
import { useReveal } from '../hooks/useReveal.js'

export function ResenaHistorica() {
  useReveal()

  return (
    <article className="page-detail resena-page">
      <div className="container">
        <Link className="back" to="/">
          ← Volver al inicio
        </Link>

        <header className="resena-hero reveal">
          <p className="eyebrow">Quiénes somos</p>
          <h1>{RESENA_HISTORICA.title}</h1>
          <p className="resena-subtitle">{RESENA_HISTORICA.subtitle}</p>
          <p className="resena-lead">{RESENA_HISTORICA.lead}</p>
        </header>

        <section className="resena-timeline" aria-label="Línea del tiempo">
          <div className="section-head reveal">
            <p className="eyebrow">Memoria institucional</p>
            <h2>Hitos que forjaron a Mérida</h2>
          </div>

          <ol className="resena-timeline-list">
            {RESENA_HISTORICA.milestones.map((item, index) => (
              <li
                key={item.year}
                className={`resena-timeline-item reveal reveal-delay-${(index % 3) + 1}`}
              >
                <div className="resena-timeline-marker" aria-hidden="true">
                  <span />
                </div>
                <div className="resena-timeline-card">
                  <p className="resena-year">{item.year}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="resena-gallery">
          <div className="section-head reveal">
            <p className="eyebrow">Documentación visual</p>
            <h2>Infografías de la fundación</h2>
            <p>
              Material institucional sobre la fundación de la ciudad de Mérida.
            </p>
          </div>

          <div className="resena-gallery-grid">
            {RESENA_HISTORICA.infografias.map((img, index) => (
              <a
                key={img.src}
                className={`resena-gallery-item reveal reveal-delay-${(index % 3) + 1}`}
                href={img.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={874}
                  height={1080}
                  loading="lazy"
                />
                <span>Ampliar imagen</span>
              </a>
            ))}
          </div>
        </section>

        <section className="resena-cta reveal">
          <div>
            <p className="eyebrow">Continuidad histórica</p>
            <h2>{RESENA_HISTORICA.tagline}</h2>
          </div>
          <div className="resena-cta-actions">
            <Link className="btn btn-primary" to="/plan-de-gobierno">
              Ver Plan de Gobierno
            </Link>
            <Link className="btn btn-outline" to="/#secretarias">
              7 Líneas de Transformación
            </Link>
          </div>
        </section>
      </div>
    </article>
  )
}
