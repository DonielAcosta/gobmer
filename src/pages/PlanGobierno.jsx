import { Link } from 'react-router-dom'
import { PLAN_GOBIERNO } from '../api/config.js'
import { useReveal } from '../hooks/useReveal.js'

export function PlanGobierno() {
  useReveal()

  return (
    <article className="page-detail plan-page">
      <div className="container">
        <Link className="back" to="/">
          ← Volver al inicio
        </Link>

        <header className="plan-hero reveal">
          <p className="eyebrow">Quiénes somos</p>
          <h1>{PLAN_GOBIERNO.title}</h1>
          <p className="plan-subtitle">{PLAN_GOBIERNO.subtitle}</p>
          <p className="plan-lead">{PLAN_GOBIERNO.lead}</p>
        </header>

        <section className="plan-gobernador reveal">
          <img
            src={PLAN_GOBIERNO.gobernador.image}
            alt={PLAN_GOBIERNO.gobernador.name}
            width={420}
            height={520}
          />
          <div>
            <h2>{PLAN_GOBIERNO.gobernador.name}</h2>
            <p>{PLAN_GOBIERNO.gobernador.role}</p>
          </div>
        </section>

        <section className="plan-lineas">
          <div className="section-head reveal">
            <p className="eyebrow">7 Grandes Transformaciones</p>
            <h2>{PLAN_GOBIERNO.tagline}</h2>
          </div>

          <div className="plan-lineas-grid">
            {PLAN_GOBIERNO.lineas.map((linea, index) => (
              <article
                key={linea.id}
                className={`plan-linea-card reveal reveal-delay-${(index % 3) + 1}`}
              >
                <a
                  href={linea.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="plan-linea-media"
                  title={`Descargar PDF — ${linea.title}`}
                >
                  <img
                    src={linea.image}
                    alt={linea.title}
                    width={500}
                    height={167}
                    loading="lazy"
                  />
                </a>
                <div className="plan-linea-body">
                  <h3>
                    {linea.id}. {linea.title}
                  </h3>
                  <div className="plan-linea-actions">
                    <a
                      className="btn btn-outline"
                      href={linea.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Descargar PDF
                    </a>
                    <Link
                      className="btn btn-primary"
                      to={`/secretarias/${linea.slug}`}
                    >
                      Ver secretaría
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
