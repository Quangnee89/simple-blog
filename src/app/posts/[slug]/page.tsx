import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import CommentForm from '@/components/comments/comment-form';
import CommentList from '@/components/comments/comment-list';
import { PostWithAuthor } from '@/types/database';

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

  return (
    <article className="max-w-3xl mx-auto py-8">
      <header className="mb-8 border-b pb-6">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>By {(post as PostWithAuthor).profiles.display_name || 'Anonymous'}</span>
          <span>
            Published{' '}
            {new Date(post.published_at || '').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </header>

      <div className="prose prose-sm max-w-none mb-12">
        {post.content?.split('\n').map((paragraph: string, idx: number) => (
          paragraph.trim() && <p key={idx}>{paragraph}</p>
        ))}
      </div>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">
          💬 Comments ({comments?.length || 0})
        </h2>

        <CommentForm postId={post.id} />

        {comments && comments.length > 0 ? (
          <CommentList postId={post.id} />
        ) : (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        )}
      </section>
    </article>
  );
}
