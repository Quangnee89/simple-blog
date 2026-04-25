-- Simple Blog - Supabase SQL Schema
-- Copy toàn bộ script này vào Supabase SQL Editor và chạy

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create enum for post status
create type post_status as enum ('draft', 'published');

-- 2. Profiles table
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz default timezone('utc', now()) not null,
  updated_at timestamptz default timezone('utc', now()) not null
);

-- 3. Posts table
create table posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references profiles on delete cascade,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  status post_status default 'draft' not null,
  created_at timestamptz default timezone('utc', now()) not null,
  updated_at timestamptz default timezone('utc', now()) not null,
  published_at timestamptz
);

-- 4. Comments table
create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts on delete cascade,
  author_id uuid not null references profiles on delete cascade,
  content text not null,
  created_at timestamptz default timezone('utc', now()) not null
);

-- 5. Create indexes for common queries
create index idx_posts_author_id on posts(author_id);
create index idx_posts_status on posts(status);
create index idx_posts_slug on posts(slug);
create index idx_comments_post_id on comments(post_id);
create index idx_comments_author_id on comments(author_id);
create index idx_profiles_created_at on profiles(created_at);

-- 6. Function: Generate slug from title
create or replace function generate_slug(title text) returns text as $$
  select
    lower(
      regexp_replace(
        regexp_replace(trim(title), '\s+', '-', 'g'),
        '[^a-z0-9-]',
        '',
        'g'
      )
    )
$$ language sql immutable;

-- 7. Function: Update updated_at timestamp
create or replace function update_updated_at() returns trigger as $$
  begin
    new.updated_at = timezone('utc', now());
    return new;
  end;
$$ language plpgsql;

-- 8. Function: Handle new user signup
create or replace function handle_new_user() returns trigger as $$
  begin
    insert into public.profiles (id, display_name, avatar_url)
    values (
      new.id,
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'avatar_url'
    );
    return new;
  end;
$$ language plpgsql security definer;

-- 9. Trigger: Create profile on new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- 10. Function: Set post slug before insert
create or replace function set_post_slug() returns trigger as $$
  begin
    if new.slug is null or new.slug = '' then
      new.slug = generate_slug(new.title) || '-' || substr(new.id::text, 1, 8);
    end if;
    return new;
  end;
$$ language plpgsql;

-- 11. Trigger: Generate slug on post insert
create trigger before_post_insert
  before insert on posts
  for each row execute procedure set_post_slug();

-- 12. Trigger: Update posts.updated_at on update
create trigger on_posts_updated
  before update on posts
  for each row execute procedure update_updated_at();

-- 13. Trigger: Update profiles.updated_at on update
create trigger on_profiles_updated
  before update on profiles
  for each row execute procedure update_updated_at();

-- 14. Enable RLS on all tables
alter table profiles enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- PROFILES TABLE POLICIES

-- 15. Policy: Anyone can view all profiles
create policy "Profile is viewable by everyone"
  on profiles for select using (true);

-- 16. Policy: Authenticated users can only update their own profile
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- ============================================
-- POSTS TABLE POLICIES

-- 17. Policy: Anyone can view published posts OR own draft posts
create policy "Published posts are viewable by all"
  on posts for select using (
    status = 'published' or auth.uid() = author_id
  );

-- 18. Policy: Authenticated users can create posts
create policy "Authenticated users can create posts"
  on posts for insert with check (auth.uid() = author_id);

-- 19. Policy: Authors can only update their own posts
create policy "Authors can update own posts"
  on posts for update using (auth.uid() = author_id);

-- 20. Policy: Authors can only delete their own posts
create policy "Authors can delete own posts"
  on posts for delete using (auth.uid() = author_id);

-- ============================================
-- COMMENTS TABLE POLICIES

-- 21. Policy: Comments visible on published posts (or own post drafts)
create policy "Comments visible on published posts"
  on comments for select using (
    exists (
      select 1 from posts
      where posts.id = comments.post_id
      and (posts.status = 'published' or auth.uid() = posts.author_id)
    )
  );

-- 22. Policy: Authenticated users can create comments
create policy "Authenticated users can create comments"
  on comments for insert with check (auth.uid() = author_id);

-- 23. Policy: Users can only delete their own comments
create policy "Users can delete own comments"
  on comments for delete using (auth.uid() = author_id);
