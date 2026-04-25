'use client';

import Link from 'next/link';
import { PostWithAuthor } from '@/types/database';
import DeletePostButton from './delete-post-button';

interface PostListProps {
  posts: PostWithAuthor[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No posts yet. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg p-4 flex justify-between items-start hover:shadow-md transition"
        >
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>
                Status:{' '}
                <span
                  className={
                    post.status === 'published'
                      ? 'text-green-600 font-semibold'
                      : 'text-yellow-600 font-semibold'
                  }
                >
                  {post.status}
                </span>
              </span>
              <span>
                Created: {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/dashboard/edit/${post.id}`}
              className="bg-slate-200 px-3 py-1 rounded text-sm hover:bg-slate-300"
            >
              Edit
            </Link>
            <DeletePostButton postId={post.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
