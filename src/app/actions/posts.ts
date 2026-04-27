'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createPost(
  title: string,
  excerpt: string,
  content: string,
  status: 'draft' | 'published'
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const publishedAt = status === 'published' ? new Date().toISOString() : null;

  const { data, error } = await supabase
    .from('posts')
    .insert({
      author_id: user.id,
      title,
      excerpt,
      content,
      status,
      published_at: publishedAt,
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath('/');
  revalidatePath('/dashboard');
  return data;
}

export async function updatePost(
  id: string,
  title: string,
  excerpt: string,
  content: string,
  status: 'draft' | 'published'
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { data: existingPost, error: existingPostError } = await supabase
    .from('posts')
    .select('published_at')
    .eq('id', id)
    .eq('author_id', user.id)
    .single();

  if (existingPostError) throw existingPostError;

  const publishedAt =
    status === 'published'
      ? existingPost.published_at ?? new Date().toISOString()
      : null;

  const { data, error } = await supabase
    .from('posts')
    .update({
      title,
      excerpt,
      content,
      status,
      published_at: publishedAt,
    })
    .eq('id', id)
    .eq('author_id', user.id)
    .select()
    .single();

  if (error) throw error;

  revalidatePath('/');
  revalidatePath('/dashboard');
  revalidatePath(`/posts/${data.slug}`);
  return data;
}

export async function deletePost(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .eq('author_id', user.id);

  if (error) throw error;

  revalidatePath('/');
  revalidatePath('/dashboard');
}
