import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import PostList from '@/components/dashboard/post-list';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: posts } = await supabase
    .from('posts')
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
    .eq('author_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">📋 My Posts</h1>
        <Link
          href="/dashboard/new"
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
        >
          + New Post
        </Link>
      </div>

      <PostList posts={posts || []} />
    </div>
  );
}
