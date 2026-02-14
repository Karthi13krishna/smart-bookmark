'use client';

import { createClient } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';

export default function LogoutButton() {
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect('/auth/sign-in');
  };

  return (
    <button className="bg-blue-500 px-6 py-3 rounded-xl" onClick={handleLogout}>
      Logout
    </button>
  );
}
