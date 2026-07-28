import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { supabase } from './lib/supabase';

function HomePage() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setPosts(data || []);
      } catch (err) {
        setError(err.message || 'Unable to load posts.');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const term = search.toLowerCase();
    return posts.filter((post) => {
      const title = (post.title || '').toLowerCase();
      const description = (post.description || '').toLowerCase();
      return title.includes(term) || description.includes(term);
    });
  }, [posts, search]);

  return (
    <div className="page-shell">
      <header className="hero-card">
        <div>
          <p className="eyebrow">Premium gaming library</p>
          <h1>Find the best Roblox scripts</h1>
          <p className="hero-copy">
            Discover polished gameplay tools, premium scripts, and curated resources in a sleek platform built for modern creators and players.
          </p>
          <div className="search-box">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for scripts, guides, or gameplay packs"
            />
          </div>
        </div>
      </header>

      {loading && <p className="status-text">Loading posts from Supabase…</p>}
      {error && <p className="status-text error">{error}</p>}

      <section className="post-grid">
        {filteredPosts.map((post) => (
          <article className="post-card" key={post.id}>
            <img className="yt-thumb" src={getCardImage(post)} alt={`${post.title || 'Post'} thumbnail`} />
            <div className="card-content">
              <h2>{post.title || 'Untitled post'}</h2>
              <p>{post.description || 'No description provided.'}</p>
              <Link className="primary-button" to={`/post/${post.id}`}>
                Get Script
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPost() {
      try {
        const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();

        if (error) {
          throw error;
        }

        setPost(data);
      } catch (err) {
        setError(err.message || 'Unable to load this post.');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  if (loading) {
    return <div className="page-shell"><p className="status-text">Loading post…</p></div>;
  }

  if (error || !post) {
    return <Navigate to="/" replace />;
  }

  const videoId = getYouTubeId(post.youtube_link);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const handleResourceClick = (event) => {
    if (!post.resource_link) {
      event.preventDefault();
      return;
    }

    window.open(post.resource_link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="page-shell post-detail">
      <Link className="back-link" to="/">
        ← Back to home
      </Link>
      <div className="post-detail-card">
        <div className="video-wrapper">
          <iframe
            src={embedUrl}
            title={post.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">Featured Resource</p>
          <h1>{post.title || 'Untitled post'}</h1>
          <p>{post.description || 'No description provided.'}</p>
          <a className="primary-button large" href={post.resource_link || '#'} onClick={handleResourceClick} target="_blank" rel="noreferrer">
            Get Script
          </a>
        </div>
      </div>
    </div>
  );
}

function getYouTubeId(url) {
  if (!url) return 'dQw4w9WgXcQ';
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/i);
  return match ? match[1] : 'dQw4w9WgXcQ';
}

function getYouTubeThumbnail(url) {
  const videoId = getYouTubeId(url);
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function getCardImage(post) {
  if (post.thumbnail) return post.thumbnail;
  if (post.youtube_link) return getYouTubeThumbnail(post.youtube_link);
  return 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80';
}

export default function App() {
  return (
    <main>
      <nav className="top-nav">
        <div className="brand">ScriptHub</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
        </div>
      </nav>
      <AppRoutes />
    </main>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  );
}
