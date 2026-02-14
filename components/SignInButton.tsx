'use client';

import { createClient } from '@/lib/supabase/client';

export default function SignInPage() {
  const supabase = createClient();
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    const { data } = await supabase.auth.getSession();
    console.log(data.session);
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-6 py-3 rounded-xl bg-blue-500 text-white"
    >
      Continue with Google
    </button>
  );
}
