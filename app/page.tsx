import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import BookmarksDashboard from '@/components/Bookmarks';

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 justify-center items-center p-6">
      <BookmarksDashboard userId={data.user.id} />
    </div>
  );
}
