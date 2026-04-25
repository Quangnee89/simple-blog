'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface PostFormProps {
  post?: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    status: 'draft' | 'published';
  };
}

export default function PostForm({ post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [status, setStatus] = useState<'draft' | 'published'>(post?.status || 'draft');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (post) {
        // Update
        const { error: updateError } = await supabase
          .from('posts')
          .update({
            title,
            excerpt,
            content,
            status,
            published_at: status === 'published' ? new Date().toISOString() : null,
          })
          .eq('id', post.id);
        if (updateError) throw updateError;
      } else {
        // Create
        const { error: insertError } = await supabase.from('posts').insert({
          title,
          excerpt,
          content,
          status,
          author_id: user.id,
          published_at: status === 'published' ? new Date().toISOString() : null,
        });
        if (insertError) throw insertError;
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 border border-red-200 p-3 rounded text-red-700">{error}</div>}

      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border p-2 rounded text-lg font-semibold"
      />

      <input
        type="text"
        placeholder="Excerpt (summary)"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Post Content (markdown supported)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={10}
        className="w-full border p-2 rounded font-mono text-sm"
      />

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="status"
            value="draft"
            checked={status === 'draft'}
            onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
            className="w-4 h-4"
          />
          📝 Draft
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="status"
            value="published"
            checked={status === 'published'}
            onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
            className="w-4 h-4"
          />
          🚀 Published
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}
