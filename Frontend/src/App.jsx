import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'

/* ── Background orbs (shared) ── */
function Background() {
  return (
    <div className="bg">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
  )
}

/* ── Header ── */
function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <header className="header">
      <div className="header-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <span className="logo">📸</span>
        <h1>Snapboard</h1>
      </div>
      <nav className="header-nav">
        <button
          className={`nav-btn ${pathname === '/posts' ? 'active' : ''}`}
          onClick={() => navigate('/posts')}
        >
          View Posts
        </button>
        <button
          className={`nav-btn neon ${pathname === '/create-post' ? 'active' : ''}`}
          onClick={() => navigate('/create-post')}
        >
          + Create
        </button>
      </nav>
    </header>
  )
}

/* ── Home page ── */
function HomePage() {
  const navigate = useNavigate()
  return (
    <main className="home-main">
      <div className="home-hero">
        <div className="hero-glow" />
        <span className="hero-icon">📸</span>
        <h2 className="hero-title">Share your moments</h2>
        <p className="hero-sub">Upload photos, write captions, and explore posts from everyone.</p>
        <div className="hero-btns">
          <button className="hero-btn primary" onClick={() => navigate('/posts')}>
            View Posts
          </button>
          <button className="hero-btn secondary" onClick={() => navigate('/create-post')}>
            Create Post
          </button>
        </div>
      </div>
    </main>
  )
}

/* ── Create page ── */
function CreatePage() {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(file ? URL.createObjectURL(file) : null)
    setSuccess(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image || !caption.trim()) return
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('caption', caption)
      const res = await fetch('/create-post', { method: 'POST', body: formData })
      if (!res.ok) throw new Error()
      setCaption('')
      setImage(null)
      setPreview(null)
      setSuccess(true)
    } catch {
      setError('Failed to create post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="main">
      <section>
        <p className="section-label">New Post</p>
        <form className="create-form" onSubmit={handleSubmit}>
          <div
            className="upload-area"
            onClick={() => document.getElementById('fileInput').click()}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="preview-img" />
            ) : (
              <div className="upload-placeholder">
                <span className="upload-icon">🖼️</span>
                <p>Click to select an image</p>
                <span className="hint">JPG, PNG, WEBP</span>
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>

          <input
            type="text"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="caption-input"
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">✦ Post shared successfully!</p>}

          <button
            type="submit"
            className="submit-btn"
            disabled={loading || !image || !caption.trim()}
          >
            {loading ? 'Posting...' : 'Share Post'}
          </button>
        </form>
      </section>
    </main>
  )
}

/* ── Posts page ── */
function PostsPage() {
  const [posts, setPosts] = useState([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/posts')
        const data = await res.json()
        setPosts(data.posts)
      } catch {
        setError('Failed to load posts.')
      } finally {
        setFetching(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <main className="main">
      <section>
        <div className="posts-header">
          <p className="section-label">All Posts</p>
          {!fetching && (
            <span className="posts-count">{posts.length} post{posts.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {fetching && <div className="spinner-wrap"><div className="spinner" /></div>}
        {error && <p className="error" style={{ textAlign: 'center' }}>{error}</p>}

        {!fetching && posts.length === 0 && (
          <p className="status-msg">No posts yet — be the first to share.</p>
        )}

        {!fetching && posts.length > 0 && (
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post._id} className="post-card">
                <div className="post-img-wrap">
                  <img src={post.image} alt={post.caption} className="post-img" />
                </div>
                <div className="post-footer">
                  <div className="post-avatar">✦</div>
                  <p className="post-caption">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

/* ── App ── */
export default function App() {
  return (
    <div className="app">
      <Background />
      <Header />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/posts"       element={<PostsPage />} />
        <Route path="/create-post" element={<CreatePage />} />
      </Routes>
    </div>
  )
}
