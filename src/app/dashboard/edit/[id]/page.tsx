import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import PostForm from '@/components/dashboard/post-form';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .eq('author_id', user.id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">✏️ Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
