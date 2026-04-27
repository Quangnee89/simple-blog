import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/header';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SimpleBlog - Share Your Stories',
  description: 'A modern blogging platform powered by Supabase. Share your thoughts with the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-6xl min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-gray-300 mt-16 py-8">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <p>&copy; 2024 SimpleBlog. Built with Next.js, Supabase & Tailwind CSS.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
