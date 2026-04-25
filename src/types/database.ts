export type PostStatus = 'draft' | 'published';

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  status: PostStatus;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface PostWithAuthor extends Post {
  profiles: Profile;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

export interface CommentWithAuthor extends Comment {
  profiles: Profile;
}
