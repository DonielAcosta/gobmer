import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ASSETS, SOCIAL } from '../api/config.js'

function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.4.4 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.4.2-1.1.4-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4a4.1 4.1 0 0 1-1.5-1 4.1 4.1 0 0 1-1-1.5c-.2-.4-.4-1.1-.4-2.3-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .4-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.8.1-1 .1-1.6.2-1.9.4-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.2.3-.3.9-.4 1.9-.1 1.2-.1 1.6-.1 4.8s0 3.5.1 4.8c.1 1 .2 1.6.4 1.9.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.2.9.3 1.9.4 1.2.1 1.6.1 4.8.1s3.5 0 4.8-.1c1-.1 1.6-.2 1.9-.4.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.2-.3.3-.9.4-1.9.1-1.2.1-1.6.1-4.8s0-3.5-.1-4.8c-.1-1-.2-1.6-.4-1.9a2.9 2.9 0 0 0-.7-1.1 2.9 2.9 0 0 0-1.1-.7c-.3-.2-.9-.3-1.9-.4-1.3-.1-1.6-.1-4.8-.1zm0 3.1a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm6.4-.9a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
    </svg>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="brand-ribbon" aria-hidden="true" />
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header-inner">
          <NavLink to="/" className="brand" end>
            <img
              className="brand-logo"
              src={ASSETS.logoHorizontal}
              alt="Gobernación del Estado Bolivariano de Mérida"
              width={200}
              height={82}
            />
            <span className="brand-text">
              <span className="brand-mark">
                GOB<span>ME</span>
              </span>
              <span className="brand-sub">
                Gobernación del Estado Bolivariano de Mérida
              </span>
            </span>
          </NavLink>
          <nav className="nav" aria-label="Principal">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Inicio
            </NavLink>
            <a href="/#secretarias">Secretarías</a>
            <NavLink
              to="/noticias"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Noticias
            </NavLink>
            <a href="/#enlaces">Enlaces</a>
            <div className="nav-social">
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <IconYoutube />
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <IconInstagram />
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
