import { redirect } from 'next/navigation';

export default function NewPostPage() {
  // Redirect to dashboard/new - the proper route for creating posts
  redirect('/dashboard/new');
}
