'use client';

import { useState } from 'react';
import { addBookmark } from '@/app/actions';
import { MdBookmarkAdd } from 'react-icons/md';

export default function AddBookmarkForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    setLoading(true);

    try {
      await addBookmark({ title, url, user_id: userId });
      setTitle('');
      setUrl('');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border-2 border-gray-400 dark:border-gray-600 p-4 rounded-xl w-full"
    >
      <h2 className="font-semibold text-lg mb-2 ml-2">Add Bookmark</h2>

      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <input
            className="border-2 border-gray-400 dark:border-gray-600 px-3 py-2 rounded-lg"
            placeholder="Title"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title" className="text-sm text-gray-400 ml-1">
            Title
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <input
            className="border-2 border-gray-400 dark:border-gray-600 px-3 py-2 rounded-lg"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <label htmlFor="title" className="text-sm text-gray-400">
            URL
          </label>
        </div>
        <button
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-6 w-48 ml-2 rounded-lg place-self-start disabled:opacity-50"
        >
          <span className="flex items-center">
            <MdBookmarkAdd className="mr-2 w-6 h-6" />
            {loading ? 'Adding...' : 'Add Bookmark'}
          </span>
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
