'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (active) {
        setUser(user);
        setLoading(false);
      }
    };
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) {
        return;
      }
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  if (loading) return null;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2 hover:text-blue-100 transition">
          <span className="text-3xl">📝</span>
          <span>SimpleBlog</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="font-medium hover:text-blue-100 transition duration-200">
            Home
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="font-medium hover:text-blue-100 transition duration-200">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="font-medium hover:text-blue-100 transition duration-200">
                Login
              </Link>
              <Link href="/register" className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition duration-200">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
