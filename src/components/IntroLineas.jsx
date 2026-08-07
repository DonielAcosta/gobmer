import { ASSETS } from '../api/config.js'

export function IntroLineas() {
  return (
    <section className="section intro-lineas" id="intro-lineas">
      <div className="container intro-lineas-grid">
        <div className="reveal">
          <p className="eyebrow">Plan de la Patria 2025–2031</p>
          <h2>7 líneas de transformación para el pueblo merideño</h2>
          <p>
            Reorganización de los órganos de seguimiento de políticas públicas
            para articular, formular y evaluar estrategias, planes y proyectos
            en las materias de sus competencias.
          </p>
          <div className="intro-stats">
            <div
              className="intro-stat reveal reveal-delay-1"
              style={{ '--stat-accent': 'var(--accent-green)' }}
            >
              <strong>7</strong>
              <span>Secretarías de transformación</span>
            </div>
            <div
              className="intro-stat reveal reveal-delay-2"
              style={{ '--stat-accent': 'var(--accent-red)' }}
            >
              <strong>1</strong>
              <span>Plan de gobierno alineado</span>
            </div>
            <div
              className="intro-stat reveal reveal-delay-3"
              style={{ '--stat-accent': 'var(--brand-sky)' }}
            >
              <strong>∞</strong>
              <span>Compromiso con Mérida</span>
            </div>
          </div>
        </div>
        <div className="reveal reveal-delay-2">
          <img
            className="intro-banner"
            src={ASSETS.logoMark}
            alt="Emblema de la Gobernación del Estado Bolivariano de Mérida"
            width={280}
            height={280}
          />
        </div>
      </div>
    </section>
  )
}
