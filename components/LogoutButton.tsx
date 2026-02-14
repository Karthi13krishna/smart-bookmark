'use client';

import { createClient } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    redirect('/auth/sign-in');
  };

  return (
    <button
      className="border-blue-500 border-2 px-6 py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
