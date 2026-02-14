'use client';

import SignInButton from '@/components/SignInButton';
import { MdBookmarks } from 'react-icons/md';

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-2 h-[calc(100vh-176px)] items-center justify-center ">
      <MdBookmarks className="bg-blue-500 text-white p-1.5 w-12 h-12 rounded-xl" />
      <div className="flex flex-col gap-1 justify-center items-center mb-6">
        <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
        <p>Sign in to continue</p>
      </div>
      <SignInButton />
    </div>
  );
}
