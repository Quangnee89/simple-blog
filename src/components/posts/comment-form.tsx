'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) {
        return;
      }

      setUser(user);
      setCheckingAuth(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) {
        return;
      }
      setUser(session?.user ?? null);
      setCheckingAuth(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const normalizedContent = content.trim();
    if (!normalizedContent) {
      setError('Comment cannot be empty.');
      return;
    }

    if (!user) {
      setError('You must be logged in to comment.');
      return;
    }

    setLoading(true);
    try {
      const { error: insertError } = await supabase.from('comments').insert({
        post_id: postId,
        author_id: user.id,
        content: normalizedContent,
      });

      if (insertError) {
        throw insertError;
      }

      setContent('');
    } catch (err: any) {
      setError(err.message || 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return null;
  }

  if (!user) {
    return (
      <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
        <p className="text-blue-700">
          Please{' '}
          <Link href="/login" className="font-semibold underline">
            login
          </Link>{' '}
          to comment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-3">
      {error && (
        <div className="bg-red-50 border border-red-200 p-3 rounded text-red-700">
          {error}
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        placeholder="Write a comment..."
        className="w-full border p-3 rounded text-sm"
        rows={3}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}
