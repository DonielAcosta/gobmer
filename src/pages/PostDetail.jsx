import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../api/wp.js'
import { Loader } from '../components/Loader.jsx'

export function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getPost(id)
      .then((data) => {
        if (!cancelled) setPost(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'No se pudo cargar la publicación.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <article className="page-detail">
      <div className="container">
        <Link className="back" to="/noticias">
          ← Volver a noticias
        </Link>

        {loading ? <Loader /> : null}
        {error ? <div className="error-box">{error}</div> : null}

        {post ? (
          <>
            {post.image ? (
              <div className="page-detail-hero">
                <img src={post.image} alt={post.imageAlt} />
              </div>
            ) : null}
            <h1>{post.title}</h1>
            <p className="meta">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('es-VE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </p>
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </>
        ) : null}
      </div>
    </article>
  )
}
