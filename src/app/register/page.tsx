'use client';

import RegisterForm from '@/components/auth/register-form';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join SimpleBlog</h1>
          <p className="text-gray-600">Create your account and start sharing your stories</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <RegisterForm />
        </div>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
