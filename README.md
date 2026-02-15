# Smart Bookmark App

## Overview

Smart Bookmark is a Google-authenticated, full-stack bookmark manager built with **Next.js (App Router)**, **Supabase**, and **Tailwind CSS**. Users can securely add, delete, and view their own bookmarks in real-time. Each user’s bookmarks are private, and changes are instantly synced across tabs without requiring a page refresh.

## Features

- **Google Auth only:** Users sign up and log in exclusively with Google accounts.
- **Add bookmarks:** Users can save a URL with a title.
- **Private bookmarks:** Each user can only see their own bookmarks.
- **Real-time sync:** Adding a bookmark in one tab updates all other open tabs instantly.
- **Delete bookmarks:** Users can remove their own bookmarks.
- **Responsive UI:** Styled with Tailwind CSS for a clean, simple interface.

## Tech Stack

- **Next.js (App Router)**
- **Supabase:** Auth, Database, Realtime
- **React / TypeScript**
- **Tailwind CSS**
- **React Icons** for UI enhancement

## Technical Implementation

### Authentication

- Integrated **Supabase Auth** for Google login.
- OAuth callback handled in `/auth/callback/route.ts` to exchange the code for a session and redirect users.
- Navigation updates immediately on login/logout using `supabase.auth.onAuthStateChange` in client components.

### Bookmark Management

- CRUD operations implemented as **server actions** (`actions.ts`) for security and reliability.
- Input validation (URL format) is enforced on both client and server.
- `getBookmarks` fetches all bookmarks for the logged-in user, ensuring privacy.

### Real-time Sync

- Supabase **Realtime** subscriptions ensure all tabs stay in sync for inserts and deletes.
- Fallback fetch implemented for deletes when `payload.old` is missing to guarantee consistency.

### Client/Server Component Strategy

- Components that depend on user state (Navigation, bookmarks list) are client components.
- Server actions handle database operations and return data to client components.
- Supabase client is memoized in client components to avoid unnecessary re-renders.

### Deployment

- App deployed on **Vercel** for live testing.
- Realtime features, Google OAuth, and server actions all work in the deployed environment.

## Challenges and Solutions

1. **OAuth callback handling in App Router:**

   - Problem: OAuth login redirects could fail or hit 404.
   - Solution: Implemented dedicated `route.ts` for `/auth/callback` to exchange code and redirect properly.

2. **Client vs server component issues:**

   - Problem: User-dependent components were not updating correctly; confusion between client and server Supabase usage.
   - Solution: Converted navigation and user-dependent components to client components and used `useEffect` with `supabase.auth.onAuthStateChange` to update UI.

3. **Real-time synchronization across tabs:**

   - Problem: Bookmarks added in one tab did not appear in others.
   - Solution: Used Supabase Realtime subscriptions combined with initial fetch and fallback for deletes when `payload.old` was missing.

4. **URL validation:**

   - Problem: Invalid URLs could be submitted.
   - Solution: Implemented regex validation both in client form and server action.

## Project Structure

- `app/actions.ts` — Server actions for bookmark CRUD
- `components/Navigation.tsx` — Client-side navigation with auth state handling
- `components/AddBookmarkForm.tsx` — Form with input validation
- `components/DisplayBookmarks.tsx` — Bookmark list with real-time updates
- `components/Bookmarks.tsx` — Combines form and list, manages subscriptions
- `lib/supabase/client.ts` — Browser Supabase client
- `lib/supabase/server.ts` — Server Supabase client

## Live Demo

- **Vercel URL:** [https://bookmark.karthi.fyi](https://bookmark.karthi.fyi)
- **GitHub Repo:** [https://github.com/Karthi13krishna/smart-bookmark](https://github.com/Karthi13krishna/smart-bookmark)

