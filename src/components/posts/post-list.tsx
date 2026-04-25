'use client';

import Link from 'next/link';
import { PostWithAuthor } from '@/types/database';
import DeleteButton from './delete-button';

interface PostListProps {
  posts: PostWithAuthor[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. <Link href="/posts/new" className="text-blue-600 hover:underline">Create one!</Link></p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 flex justify-between items-start hover:shadow-md transition">
            <div className="flex-1">
              <Link href={`/dashboard/edit/${post.id}`} className="text-lg font-bold hover:text-blue-600">
                {post.title}
              </Link>
              <p className="text-gray-600 text-sm mt-1">{post.excerpt}</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-500">
                <span>{post.status === 'published' ? '🚀 Published' : '📝 Draft'}</span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <DeleteButton postId={post.id} />
          </div>
        ))
      )}
    </div>
  );
}
