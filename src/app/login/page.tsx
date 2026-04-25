'use client';

import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <LoginForm />
      <p className="text-center mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
