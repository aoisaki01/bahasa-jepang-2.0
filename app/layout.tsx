import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
// import Navbar from './components/ui/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JPaoi',
  description: 'Flash',
  icons: [
    { rel: 'icon', url: '/a.png' },
    { rel: 'shortcut icon', url: '/a.png' },
    { rel: 'apple-touch-icon', url: '/a.png' }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}