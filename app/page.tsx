import LogoutButton from '@/components/LogoutButton';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    redirect('/auth/sign-in');
  }

  console.log(data);

  return (
    <div className="min-h-screen container mx-auto flex flex-col gap-8 justify-center items-center p-6">
      <h1 className="text-xl font-bold">
        Welcome, {data?.user?.user_metadata?.full_name}
      </h1>

      <LogoutButton />
    </div>
  );
}
