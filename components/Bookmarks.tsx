'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AddBookmarkForm from './AddBookmarkForm';
import DisplayBookmarks from './DisplayBookmarks';
import { deleteBookmark, getBookmarks } from '@/app/actions';
import { User } from '@supabase/supabase-js';

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
  user_id: string;
};

export default function BookmarksDashboard({ userId }: { userId: string }) {
  const supabase = useMemo(() => createClient(), []);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, [supabase.auth]);

  // Initial Fetch
  useEffect(() => {
    const fetchBookmarks = async () => {
      const data = await getBookmarks({ user_id: userId });
      setBookmarks(data);
      setLoading(false);
    };

    fetchBookmarks();
  }, [userId]);

  // Realtime Sync
  useEffect(() => {
    const channel = supabase
      .channel('bookmarks-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
          }

          if (payload.eventType === 'DELETE' && payload.old?.id) {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, supabase]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error('Failed to delete bookmark:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {user && (
        <div className="flex flex-col gap-0.5 justify-center items-center mb-6 text-center">
          <h2 className="text-2xl font-bold">
            Hello, {user.user_metadata?.full_name}
          </h2>
          <p className="text-gray-500">
            Welcome to your curated digital library
          </p>
        </div>
      )}
      <AddBookmarkForm userId={userId} />

      <DisplayBookmarks
        bookmarks={bookmarks}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
}
