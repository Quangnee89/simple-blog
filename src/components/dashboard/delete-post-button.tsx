'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/app/actions/posts';

interface DeletePostButtonProps {
  postId: string;
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setLoading(true);
    try {
      await deletePost(postId);
      router.refresh();
    } catch (error) {
      alert('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-200 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-300 disabled:opacity-50"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
