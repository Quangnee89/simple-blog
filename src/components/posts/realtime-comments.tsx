'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CommentWithAuthor } from '@/types/database';
import CommentList from './comment-list';

interface RealtimeCommentsProps {
  postId: string;
  initialComments: CommentWithAuthor[];
}

export default function RealtimeComments({
  postId,
  initialComments,
}: RealtimeCommentsProps) {
  const [comments, setComments] = useState(initialComments);
  const supabase = createClient();

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
            setComments([...comments, newComment]);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [postId, comments, supabase]);

  return <CommentList comments={comments} postId={postId} />;
}
