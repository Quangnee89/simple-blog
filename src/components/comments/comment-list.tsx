'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    display_name: string;
  } | {
    display_name: string;
  }[];
}

interface CommentListProps {
  postId: string;
}

export default function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await supabase
          .from('comments')
          .select(`
            id,
            content,
            created_at,
            profiles (
              display_name
            )
          `)
          .eq('post_id', postId)
          .order('created_at', { ascending: true });

        if (data) {
          setComments(data as Comment[]);
        }
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();

    const channel = supabase
      .channel(`comments:${postId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          setComments((prev) => [...prev, payload.new as Comment]);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [postId, supabase]);

  if (loading) return <p className="text-gray-500">Loading comments...</p>;

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
      ) : (
        comments.map((comment) => {
          const profile = Array.isArray(comment.profiles) ? comment.profiles[0] : comment.profiles;
          return (
            <div key={comment.id} className="border-l-4 border-blue-300 pl-4 py-2">
              <p className="font-semibold text-sm">{profile?.display_name || 'Anonymous'}</p>
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
