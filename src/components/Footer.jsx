import { ASSETS, SOCIAL } from '../api/config.js'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img
            className="footer-logo"
            src={ASSETS.logoHorizontal}
            alt="Gobernación del Estado Bolivariano de Mérida"
            width={220}
            height={90}
          />
          <p className="footer-script">Mérida</p>
          <p className="footer-brand">
            GOB<span>ME</span>
          </p>
          <p>Gobernación del Estado Bolivariano de Mérida</p>
          <p>RIF G-20000156-9</p>
        </div>
        <div className="footer-links">
          <a href="/#secretarias">Secretarías</a>
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
