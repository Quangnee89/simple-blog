import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import PostForm from '@/components/dashboard/post-form';

export default async function NewPostPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Post</h1>
        <p className="text-gray-600">Share your thoughts with the world</p>
      </div>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <PostForm />
      </div>
    </div>
  );
}
