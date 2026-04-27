'use client';

import Link from 'next/link';
import { PostWithAuthor } from '@/types/database';
import DeletePostButton from './delete-post-button';
import { formatDateForUi } from '@/lib/date-format';

interface PostListProps {
  posts: PostWithAuthor[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-600">No posts yet. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-300 flex flex-col sm:flex-row justify-between items-start gap-4"
        >
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{post.excerpt || 'No excerpt'}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                Status:{' '}
                <span
                  className={`font-semibold px-2 py-1 rounded-full ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {post.status}
                </span>
              </span>
              <span>Created: {formatDateForUi(post.created_at)}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link
              href={`/dashboard/edit/${post.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
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
