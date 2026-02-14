'use client';

import { useState } from 'react';
import { addBookmark } from '@/app/actions';

export default function AddBookmarkForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    setLoading(true);

    try {
      await addBookmark({ title, url, user_id: userId });
      setTitle('');
      setUrl('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border p-4 rounded-xl"
    >
      <h2 className="font-bold text-lg">Add Bookmark</h2>

      <input
        className="border px-3 py-2 rounded-lg"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border px-3 py-2 rounded-lg"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Bookmark'}
      </button>
    </form>
  );
}
