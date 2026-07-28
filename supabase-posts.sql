CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  youtube_link TEXT NOT NULL,
  resource_link TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE posts IS 'Gaming resource posts for ScriptHub';
COMMENT ON COLUMN posts.youtube_link IS 'YouTube URL for the featured video';
COMMENT ON COLUMN posts.resource_link IS 'External link to the downloadable or viewable resource';
