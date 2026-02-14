'use server';

import { createClient } from '@/lib/supabase/server';

/* -----------------------------
   Fetch bookmarks (server)
----------------------------- */
export async function getBookmarks({ user_id }: { user_id: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('user_id', user_id);

  if (error) throw new Error(error.message);

  return data;
}

/* -----------------------------
   Add bookmark (server)
----------------------------- */
export async function addBookmark({
  title,
  url,
  user_id,
}: {
  title: string;
  url: string;
  user_id: string;
}) {
  const supabase = await createClient();

  if (!title || !url) throw new Error('Title and URL are required');

  const { data, error } = await supabase.from('bookmarks').insert({
    title,
    url,
    user_id,
  });

  if (error) throw new Error(error.message);

  return data;
}

/* -----------------------------
   Delete bookmark (server)
----------------------------- */
export async function deleteBookmark(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('bookmarks').delete().eq('id', id);

  if (error) throw new Error(error.message);
}
