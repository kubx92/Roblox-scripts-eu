# ScriptHub

A modern React-based gaming resources website with a homepage feed, post detail view, and a Supabase-ready PostgreSQL schema.

## Features
- Responsive gaming UI
- Search bar for browsing posts
- Post cards with YouTube thumbnail and preview image
- Dedicated post page with embedded YouTube preview and resource button
- SQL file ready for Supabase PostgreSQL

## Run locally
1. Install Node.js and npm from https://nodejs.org/
2. In the project folder, run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL shown by Vite (usually http://localhost:3000)

## Supabase setup
1. Create a new Supabase project.
2. Open the SQL Editor.
3. Run the contents of [supabase-posts.sql](supabase-posts.sql).
4. In the project root, create a file named `.env` and add:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Put the actual Supabase URL and anon key into that `.env` file exactly as shown.
6. Restart the dev server after changing `.env`.
