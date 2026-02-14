'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/* -----------------------------
   Fetch bookmarks (server)
----------------------------- */
export async function getBookmarks({ user_id }: { user_id: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .select('id, title, url, created_at, user_id')
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

  if (!title || !url) return;

  const { data, error } = await supabase
    .from('bookmarks')
    .insert({
      title,
      url,
      user_id,
    })
    .eq('user_id', user_id);

  if (error) throw new Error(error.message);

  revalidatePath('/');

  return data;
}

/* -----------------------------
   Delete bookmark (server)
----------------------------- */
export async function deleteBookmark(id: string, user_id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', id)
    .eq('user_id', user_id);

  if (error) throw new Error(error.message);

  revalidatePath('/');
}
