import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { PostWithAuthor } from '@/types/database';

export default async function Home() {
  const supabase = await createClient();

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
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">📚 Latest Posts</h1>

      {posts && posts.length > 0 ? (
        <div className="grid gap-6">
          {(posts as PostWithAuthor[]).map((post) => (
            <article
              key={post.id}
              className="border rounded-lg p-6 hover:shadow-lg transition"
            >
              <Link
                href={`/posts/${post.slug}`}
                className="block hover:text-blue-600"
              >
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              </Link>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By {post.profiles.display_name || 'Anonymous'}</span>
                <span>
                  {new Date(post.published_at || '').toLocaleDateString()}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts yet. Be the first to write!</p>
      )}
    </div>
  );
}
