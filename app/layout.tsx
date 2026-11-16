import type { Metadata } from 'next';
import { QueryProvider } from '@/components/layout/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sapphire Device Finance — Nigerian Device Financing Catalog',
  description:
    'Device financing catalog for smartphones, laptops, and tablets across Nigeria.',
  openGraph: {
    title: 'Sapphire Device Finance — Nigerian Device Financing Catalog',
    description:
      'Device financing catalog for smartphones, laptops, and tablets across Nigeria.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sapphire Device Finance — Nigerian Device Financing Catalog',
    description:
      'Device financing catalog for smartphones, laptops, and tablets across Nigeria.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
