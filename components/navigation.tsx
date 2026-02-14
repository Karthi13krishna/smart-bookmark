'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import LogoutButton from '@/components/LogoutButton';
import SignInButton from './SignInButton';
import Image from 'next/image';
import { Bookmark } from 'lucide-react';
import { User } from '@supabase/supabase-js';

export default function Navigation() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex gap-2 justify-center items-center">
        <Bookmark className="bg-blue-500 text-white p-1 w-8 h-8 rounded" />
        <h1 className="text-lg font-bold">Smart Bookmark</h1>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <Image
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.full_name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <LogoutButton />
        </div>
      ) : (
        <SignInButton />
      )}
    </nav>
  );
}
