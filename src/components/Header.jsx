import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ASSETS, NAV, SOCIAL } from '../api/config.js'

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

function Chevron({ className = 'nav-chevron' }) {
  return (
    <svg className={className} viewBox="0 0 12 8" aria-hidden="true">
      <path
        d="M1 1.5 6 6.5 11 1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NavItemLink({ item, onNavigate, role = 'menuitem' }) {
  if (item.external === false) {
    if (item.href.startsWith('/#')) {
      return (
        <a href={item.href} role={role} onClick={onNavigate}>
          {item.label}
        </a>
      )
    }

    return (
      <Link to={item.href} role={role} onClick={onNavigate}>
        {item.label}
      </Link>
    )
  }

  return (
    <a
      href={item.href}
      role={role}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
    >
      {item.label}
    </a>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [quienesOpen, setQuienesOpen] = useState(false)
  const [lineasOpen, setLineasOpen] = useState(false)
  const dropdownRef = useRef(null)
  const dropdownId = useId()
  const submenuId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onDocClick = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setQuienesOpen(false)
        setLineasOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setQuienesOpen(false)
        setLineasOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const closeMenus = () => {
    setQuienesOpen(false)
    setLineasOpen(false)
    setMenuOpen(false)
  }

  return (
    <>
      <div className="brand-ribbon" aria-hidden="true" />
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header-inner">
          <NavLink to="/" className="brand" end onClick={closeMenus}>
            <img
              className="brand-logo"
              src={ASSETS.logoHorizontal}
              alt="Gobernación del Estado Bolivariano de Mérida"
              width={280}
              height={115}
            />
          </NavLink>

          <nav
            id="main-menu"
            className={`main-nav${menuOpen ? ' is-open' : ''}`}
            aria-label="Principal"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `main-nav-link${isActive ? ' is-active' : ''}`
              }
              onClick={closeMenus}
            >
              Inicio
            </NavLink>

            <div
              className={`nav-dropdown${quienesOpen ? ' is-open' : ''}`}
              ref={dropdownRef}
            >
              <button
                type="button"
                className="main-nav-link nav-dropdown-trigger"
                aria-expanded={quienesOpen}
                aria-controls={dropdownId}
                onClick={() => {
                  setQuienesOpen((v) => !v)
                  setLineasOpen(false)
                }}
              >
                Quiénes Somos
                <Chevron />
              </button>
              <div id={dropdownId} className="nav-dropdown-panel" role="menu">
                {NAV.quienesSomos.map((item) => {
                  if (item.children?.length) {
                    return (
                      <div
                        key={item.label}
                        className={`nav-submenu${lineasOpen ? ' is-open' : ''}`}
                        onMouseEnter={() => setLineasOpen(true)}
                        onMouseLeave={() => setLineasOpen(false)}
                      >
                        <button
                          type="button"
                          className="nav-submenu-trigger"
                          aria-expanded={lineasOpen}
                          aria-controls={submenuId}
                          onClick={(e) => {
                            e.stopPropagation()
                            setLineasOpen((v) => !v)
                          }}
                        >
                          <span>{item.label}</span>
                          <Chevron className="nav-chevron nav-chevron-side" />
                        </button>
                        <div
                          id={submenuId}
                          className="nav-submenu-panel"
                          role="menu"
                        >
                          <a
                            href={item.href}
                            role="menuitem"
                            className="nav-submenu-overview"
                            onClick={closeMenus}
                          >
                            Ver las 7 líneas
                          </a>
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              role="menuitem"
                              onClick={closeMenus}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  }

                  return (
                    <NavItemLink
                      key={item.label}
                      item={item}
                      onNavigate={closeMenus}
                    />
                  )
                })}
              </div>
            </div>

            <NavLink
              to="/noticias"
              className={({ isActive }) =>
                `main-nav-link${isActive ? ' is-active' : ''}`
              }
              onClick={closeMenus}
            >
              Noticias
            </NavLink>

            <a
              className="main-nav-cta"
              href={NAV.contrataciones}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenus}
            >
              Contrataciones
            </a>
          </nav>

          <div className="header-tools">
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
            <button
              type="button"
              className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="main-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">Menú</span>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
