'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AddBookmarkForm from './AddBookmarkForm';
import DisplayBookmarks from './DisplayBookmarks';
import { deleteBookmark, getBookmarks } from '@/app/actions';

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
  user_id: string;
};

export default function BookmarksDashboard({ userId }: { userId: string }) {
  const supabase = createClient();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Initial Fetch
  useEffect(() => {
    const fetchBookmarks = async () => {
      const data = await getBookmarks({ user_id: userId });
      setBookmarks(data);
      setLoading(false);
    };

    fetchBookmarks();
  }, [userId, supabase]);

  // ✅ Realtime Sync
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

          if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, supabase]);

  const handleDelete = async (id: string, userId: string) => {
    await deleteBookmark(id, userId);

    // ✅ Update UI instantly
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <AddBookmarkForm userId={userId} setBookmarks={setBookmarks} />

      <DisplayBookmarks
        bookmarks={bookmarks}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
}
