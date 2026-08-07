import { Link } from 'react-router-dom'

export function PostCard({ post }) {
  return (
    <Link className="post-card" to={`/noticias/${post.id}`}>
      <div className="post-card-media">
        {post.image ? (
          <img src={post.image} alt={post.imageAlt} loading="lazy" />
        ) : null}
      </div>
      <div className="post-card-body">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('es-VE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h3>{post.title}</h3>
        {post.excerpt ? <p>{post.excerpt}</p> : null}
      </div>
    </Link>
  )
}
