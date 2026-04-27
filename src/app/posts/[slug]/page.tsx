import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import CommentForm from '@/components/posts/comment-form';
import RealtimeComments from '@/components/posts/realtime-comments';
import { CommentWithAuthor, PostWithAuthor } from '@/types/database';
import Link from 'next/link';
import { formatDateForUi } from '@/lib/date-format';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) {
    return { title: 'Post not found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
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
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) {
    notFound();
  }

  const { data: comments } = await supabase
    .from('comments')
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
    .eq('post_id', post.id)
    .order('created_at', { ascending: true });

  const initialComments = (comments ?? []) as CommentWithAuthor[];

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          ← Back to Home
        </Link>
      </div>

      <header className="mb-8 pb-8 border-b border-gray-200">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            {(post as PostWithAuthor).profiles.avatar_url && (
              <img
                src={(post as PostWithAuthor).profiles.avatar_url || ''}
                alt={(post as PostWithAuthor).profiles.display_name || 'Author'}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900">
                {(post as PostWithAuthor).profiles.display_name || 'Anonymous'}
              </p>
              <p className="text-sm text-gray-600">
                {formatDateForUi(post.published_at)}
              </p>
            </div>
          </div>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {Math.ceil((post.content?.length || 0) / 200)} min read
          </span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none mb-12 text-gray-700">
        {post.content?.split('\n').map((paragraph: string, idx: number) =>
          paragraph.trim() ? (
            <p key={idx} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ) : null
        )}
      </div>

      <section className="border-t border-gray-200 pt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Comments ({comments?.length || 0})
        </h2>

        <CommentForm postId={post.id} />
        <RealtimeComments postId={post.id} initialComments={initialComments} />
      </section>
    </article>
  );
}
