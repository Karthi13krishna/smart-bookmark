'use client';

import { Bookmark } from './Bookmarks';
import { MdBookmarkRemove } from 'react-icons/md';

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
    <>
      <h2 className="text-2xl font-bold text-center mt-6">
        All Bookmarks{' '}
        <span className="text-gray-500">({bookmarks.length})</span>
      </h2>
      <ul className="flex flex-col gap-2">
        {bookmarks.map((b) => (
          <li
            key={b.id}
            className="border-2 border-gray-600 rounded-xl py-3 px-6 flex justify-between items-center"
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
              className=" text-sm cursor-pointer hover:text-red-500 transition-colors duration-300 ease-in-out"
            >
              <MdBookmarkRemove className="w-6 h-6" />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
