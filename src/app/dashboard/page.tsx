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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your posts and create new ones</p>
        </div>
        <Link
          href="/dashboard/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center gap-2"
        >
          <span className="text-lg">+</span> New Post
        </Link>
      </div>

      {posts && posts.length > 0 ? (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Posts</h2>
            <p className="text-gray-600 text-sm mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''} total</p>
          </div>
          <PostList posts={posts || []} />
        </div>
      ) : (
        <div className="text-center py-12 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
          <p className="text-gray-600 text-lg font-medium mb-2">No posts yet</p>
          <p className="text-gray-500 mb-6">Start by creating your first post</p>
          <Link
            href="/dashboard/new"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Create First Post
          </Link>
        </div>
      )}
    </div>
  );
}
