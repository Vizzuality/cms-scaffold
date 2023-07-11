import '@/styles/globals.css';
import '@/styles/mapbox.css';

import { Inter } from 'next/font/google';

import Providers from '@/app/layout-providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CMS scaffold client',
  description: 'CMS scaffold client description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
