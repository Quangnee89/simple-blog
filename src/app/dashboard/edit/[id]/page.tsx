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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Post</h1>
        <p className="text-gray-600">Update your post content</p>
      </div>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <PostForm post={post} />
      </div>
    </div>
  );
}
