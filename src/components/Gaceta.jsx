import { GACETA } from '../api/config.js'
import { useReveal } from '../hooks/useReveal.js'

export function Gaceta() {
  useReveal()

  return (
    <section className="section gaceta" id="gaceta" aria-label="Gaceta Oficial">
      <div className="container gaceta-inner reveal">
        <div>
          <h2>Gaceta Oficial</h2>
          <p>
            Consulta y descarga la Gaceta Oficial del Estado Bolivariano de
            Mérida con los actos administrativos vigentes.
          </p>
        </div>
        <a
          className="btn btn-primary"
          href={GACETA.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {GACETA.label}
        </a>
      </div>
    </section>
  )
}
