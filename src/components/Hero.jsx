import { Link } from 'react-router-dom'
import { ASSETS } from '../api/config.js'

export function Hero() {
  return (
    <section
      className="hero"
      style={{ '--hero-image': `url(${ASSETS.hero})` }}
      aria-label="Portada"
    >
      <div className="hero-media" aria-hidden="true" />
      <div className="container hero-content">
        <img
          className="hero-logo"
          src={ASSETS.logoHorizontal}
          alt="Gobernación del Estado Bolivariano de Mérida"
          width={420}
          height={172}
        />
        <p className="hero-kicker">Gobernación del Estado Bolivariano de</p>
        <p className="hero-script">Mérida</p>
        <p className="hero-lead">
          Siete líneas de transformación alineadas con la necesidad del pueblo
          merideño para su desarrollo sustentable.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#secretarias">
            Ver secretarías
          </a>
          <Link className="btn btn-ghost" to="/noticias">
            Ver noticias
          </Link>
        </div>
      </div>
      <a className="hero-scroll" href="#intro-lineas">
        Explorar
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}
