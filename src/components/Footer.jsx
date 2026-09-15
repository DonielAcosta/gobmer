import { ASSETS, SOCIAL } from '../api/config.js'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img
            className="footer-mark"
            src={ASSETS.logoMark}
            alt=""
            width={88}
            height={96}
          />
          <p className="footer-kicker">Gobernación del Estado Bolivariano de</p>
          <p className="footer-script">Mérida</p>
          <p>RIF G-20000156-9</p>
        </div>
        <div className="footer-links">
          <a href="/#secretarias">Secretarías</a>
          <a href="/plan-de-gobierno">Plan de Gobierno</a>
          <a href="/resena-historica">Reseña Histórica</a>
          <a href="/noticias">Noticias</a>
          <a href="/#enlaces">Enlaces</a>
          <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
      <div className="container">
        <p className="footer-note">
          Sitio web desarrollado por la D.E.P.P Teleinformática · contenidos vía
          OCI · © {new Date().getFullYear()} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
