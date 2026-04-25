'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createComment(postId: string, content: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('comments')
    .insert({
      post_id: postId,
      author_id: user.id,
      content,
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath(`/posts/[slug]`, 'page');
  return data;
}

export async function deleteComment(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)
    .eq('author_id', user.id);

  if (error) throw error;
}
