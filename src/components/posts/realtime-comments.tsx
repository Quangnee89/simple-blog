'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CommentWithAuthor } from '@/types/database';
import CommentList from './comment-list';
import { deleteComment } from '@/app/actions/comments';
import type { User } from '@supabase/supabase-js';

interface RealtimeCommentsProps {
  postId: string;
  initialComments: CommentWithAuthor[];
}

export default function RealtimeComments({
  postId,
  initialComments,
}: RealtimeCommentsProps) {
  const [comments, setComments] = useState(initialComments);
  const [user, setUser] = useState<User | null>(null);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );
  const [error, setError] = useState('');
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (active) {
        setUser(user);
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
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    const channel = supabase
      .channel(`post-${postId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        async (payload) => {
          const { data: newComment } = await supabase
            .from('comments')
            .select(`
              *,
              profiles:author_id (
                id,
                display_name,
                avatar_url,
                created_at,
                updated_at
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (newComment) {
            setComments((prev) =>
              prev.some((comment) => comment.id === newComment.id)
                ? prev
                : [...prev, newComment as CommentWithAuthor]
            );
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          setComments((prev) =>
            prev.filter((comment) => comment.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [postId, supabase]);

  const handleDeleteComment = async (commentId: string) => {
    setError('');
    setDeletingCommentId(commentId);
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete comment');
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-50 border border-red-200 p-3 rounded text-red-700 text-sm">
          {error}
        </div>
      )}
      <CommentList
        comments={comments}
        currentUserId={user?.id}
        deletingCommentId={deletingCommentId}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
}
