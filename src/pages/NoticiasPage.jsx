import { useEffect, useState } from 'react'
import { getPosts } from '../api/wp.js'
import { Loader } from '../components/Loader.jsx'
import { PostCard } from '../components/PostCard.jsx'

export function NoticiasPage() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getPosts(page)
      .then(({ posts: data, totalPages: pages }) => {
        if (cancelled) return
        setPosts(data)
        setTotalPages(pages)
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
  }, [page])

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Noticias</h2>
          <p>Archivo de publicaciones institucionales.</p>
        </div>

        {loading ? <Loader /> : null}
        {error ? <div className="error-box">{error}</div> : null}

        {!loading && !error ? (
          <>
            <div className="noticias-grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {totalPages > 1 ? (
              <div
                className="section-cta"
                style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Anterior
                </button>
                <span style={{ alignSelf: 'center', color: 'var(--ink-muted)' }}>
                  Página {page} de {totalPages}
                </span>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Siguiente
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  )
}
