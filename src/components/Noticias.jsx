import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../api/wp.js'
import { useReveal } from '../hooks/useReveal.js'
import { Loader } from './Loader.jsx'
import { PostCard } from './PostCard.jsx'

export function Noticias({ limit = 8, showMore = true }) {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [offline, setOffline] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    getPosts(1)
      .then(({ posts: data, offline: isOffline }) => {z``
        if (cancelled) return
        setPosts(data.slice(0, limit))
        setOffline(Boolean(isOffline))
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'No se pudieron cargar las noticias.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [limit])

  useReveal(loading, posts.length, offline)

  return (
    <section className="section" id="noticias">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Comunicación institucional</p>
          <h2>Noticias</h2>
          <p>Últimas publicaciones institucionales.</p>
        </div>

        {loading ? <Loader label="Cargando noticias…" /> : null}
        {error ? <div className="error-box">{error}</div> : null}

        {!loading && !error && offline ? (
          <div className="error-box">
            OCI no está disponible ahora (red/DNS). Las noticias se cargarán
            cuando vuelva la conexión con oci.merida.gob.ve.
          </div>
        ) : null}

        {!loading && !error && !offline ? (
          <>
            <div className="noticias-grid">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className={`reveal reveal-delay-${(index % 3) + 1}`}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            {showMore ? (
              <div className="section-cta reveal">
                <Link className="btn btn-primary" to="/noticias">
                  Ver todas las noticias
                </Link>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  )
}
