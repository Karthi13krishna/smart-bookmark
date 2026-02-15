'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import LogoutButton from '@/components/LogoutButton';
import SignInButton from './SignInButton';
import Image from 'next/image';
import { MdBookmarks } from 'react-icons/md';
import { User } from '@supabase/supabase-js';

import { FaGoogle } from 'react-icons/fa6';
import Link from 'next/link';

export default function Navigation() {
  const supabase = useMemo(() => createClient(), []);
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
    <nav className="px-8 py-6 flex items-center justify-between">
      <Link href="/" className="flex gap-2 justify-center items-center">
        <MdBookmarks className="bg-blue-500 text-white p-1.5 w-8 h-8 rounded-xl" />
        <h1 className="text-lg font-bold">Smart Bookmark</h1>
      </Link>

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
        <SignInButton>
          <FaGoogle />
        </SignInButton>
      )}
    </nav>
  );
}
