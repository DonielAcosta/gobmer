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
          className="hero-mark"
          src={ASSETS.logoMark}
          alt="Emblema de la Gobernación del Estado Bolivariano de Mérida"
          width={120}
          height={120}
        />
        <p className="hero-script">Mérida</p>
        <p className="hero-brand">
          GOB<span>ME</span>
        </p>
        <h1 className="hero-title">
          Gobernación del Estado Bolivariano de Mérida
        </h1>
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
