'use client';

import { CommentWithAuthor } from '@/types/database';
import { formatDateForUi } from '@/lib/date-format';

interface CommentListProps {
  comments: CommentWithAuthor[];
  currentUserId?: string;
  deletingCommentId?: string | null;
  onDeleteComment?: (commentId: string) => void | Promise<void>;
}

export default function CommentList({
  comments,
  currentUserId,
  deletingCommentId,
  onDeleteComment,
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No comments yet. Be the first to share your thoughts!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            {comment.profiles.avatar_url && (
              <img
                src={comment.profiles.avatar_url}
                alt={comment.profiles.display_name || 'Commenter'}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-gray-900">
                  {comment.profiles.display_name || 'Anonymous'}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDateForUi(comment.created_at)}
                </span>
              </div>

              <p className="text-gray-700 mt-2">{comment.content}</p>

              {currentUserId === comment.author_id && onDeleteComment && (
                <button
                  onClick={() => onDeleteComment(comment.id)}
                  disabled={deletingCommentId === comment.id}
                  className="mt-2 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  {deletingCommentId === comment.id ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
