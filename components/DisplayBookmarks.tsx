'use client';

import { FaTrash } from 'react-icons/fa6';
import { Bookmark } from './Bookmarks';

export default function DisplayBookmarks({
  bookmarks,
  loading,
  onDelete,
}: {
  bookmarks: Bookmark[];
  loading: boolean;
  onDelete: (id: string, user_id: string) => void;
}) {
  if (loading)
    return <p className="text-gray-500 text-center">Loading bookmarks...</p>;

  if (bookmarks.length === 0)
    return <p className="text-gray-500 text-center">No bookmarks yet.</p>;

  return (
    <ul className="flex flex-col gap-2">
      {bookmarks.map((b) => (
        <li
          key={b.id}
          className="border rounded-xl p-3 flex justify-between items-center"
        >
          <div className="flex flex-col">
            <p className="font-semibold">{b.title}</p>
            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm break-all"
            >
              {b.url}
            </a>
          </div>
          <button
            onClick={() => b.id && onDelete(b.id, b.user_id)}
            className="text-red-500 text-sm cursor-pointer hover:text-red-700 transition-colors duration-300 ease-in-out"
          >
            <FaTrash />
          </button>
        </li>
      ))}
    </ul>
  );
}
