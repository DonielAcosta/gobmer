import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSecretariaBySlug } from '../api/wp.js'
import { Loader } from '../components/Loader.jsx'

export function SecretariaDetail() {
  const { slug } = useParams()
  const [page, setPage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getSecretariaBySlug(slug)
      .then((data) => {
        if (!cancelled) setPage(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'No se pudo cargar la secretaría.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <article className="page-detail">
      <div className="container">
        <Link className="back" to="/#secretarias">
          ← Volver a secretarías
        </Link>

        {loading ? <Loader /> : null}
        {error ? <div className="error-box">{error}</div> : null}

        {page ? (
          <>
            {page.icon ? (
              <img
                src={page.icon}
                alt=""
                width={220}
                height={110}
                style={{ marginBottom: '1rem', maxWidth: '14rem' }}
              />
            ) : null}
            <h1>{page.title}</h1>
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </>
        ) : null}
      </div>
    </article>
  )
}
