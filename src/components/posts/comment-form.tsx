'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { createComment } from '@/app/actions/comments';
import Link from 'next/link';

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, [supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createComment(postId, content);
      setContent('');
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

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
        className="w-full border p-3 rounded font-sm"
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
