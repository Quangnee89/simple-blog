'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/app/actions/posts';
import { Post } from '@/types/database';

interface PostFormProps {
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [status, setStatus] = useState<'draft' | 'published'>(
    post?.status || 'draft'
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (post) {
        await updatePost(post.id, title, excerpt, content, status);
      } else {
        await createPost(title, excerpt, content, status);
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
      {error && (
        <div className="bg-red-50 border border-red-200 p-3 rounded text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-3 rounded"
          placeholder="Post title"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border p-3 rounded"
          placeholder="Short summary of your post"
          rows={2}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full border p-3 rounded font-mono"
          placeholder="Write your post content here..."
          rows={10}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
          className="w-full border p-3 rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}
