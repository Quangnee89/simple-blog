'use client';

import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <LoginForm />
        </div>

        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-700 transition">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
