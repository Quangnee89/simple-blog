'use client';

import { CommentWithAuthor } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { deleteComment } from '@/app/actions/comments';

interface CommentListProps {
  comments: CommentWithAuthor[];
  postId: string;
}

export default function CommentList({
  comments: initialComments,
}: CommentListProps) {
  const [comments, setComments] = useState(initialComments);
  const [user, setUser] = useState<any>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, [supabase.auth]);

  const handleDelete = async (commentId: string) => {
    if (!confirm('Delete this comment?')) return;

    setDeleting(commentId);
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (error) {
      alert('Failed to delete comment');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border rounded p-4 bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold">
              {comment.profiles.display_name || 'Anonymous'}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-700 mb-2">{comment.content}</p>
          {user?.id === comment.author_id && (
            <button
              onClick={() => handleDelete(comment.id)}
              disabled={deleting === comment.id}
              className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              {deleting === comment.id ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
