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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">✍️ Create New Post</h1>
      <PostForm />
    </div>
  );
}
