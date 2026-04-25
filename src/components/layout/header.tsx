'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  };

  if (loading) return null;

  return (
    <header className="bg-slate-900 text-white py-4">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          📝 Simple Blog
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-blue-300">
            Home
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-300">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-300">
                Login
              </Link>
              <Link href="/register" className="hover:text-blue-300">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
