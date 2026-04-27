import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { PostWithAuthor } from '@/types/database';
import { formatDateForUi } from '@/lib/date-format';

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
    <div className="space-y-12">
      <section className="text-center py-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to SimpleBlog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing stories and insights from our community of writers. Share your voice with the world.
        </p>
      </section>

      {posts && posts.length > 0 ? (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {(posts as PostWithAuthor[]).map((post) => (
              <article
                key={post.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 group"
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="block"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-3">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt || 'No excerpt available'}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        {post.profiles.avatar_url && (
                          <img 
                            src={post.profiles.avatar_url} 
                            alt={post.profiles.display_name || 'Author'}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {post.profiles.display_name || 'Anonymous'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDateForUi(post.published_at)}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Read
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-blue-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">No published posts yet.</p>
          <p className="text-gray-500">Be the first to share your story!</p>
        </div>
      )}
    </div>
  );
}
