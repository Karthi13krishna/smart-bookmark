'use client';

import { createClient } from '@/lib/supabase/client';
import { FaGoogle } from 'react-icons/fa6';

export default function SignInButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  const supabase = createClient();
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-6 py-3 rounded-xl bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors duration-300 ease-in-out"
    >
      {children || (
        <span className="flex gap-2 items-center justify-around">
          <FaGoogle /> Signin with Google
        </span>
      )}
    </button>
  );
}
