// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JARVIS - Your AI Tool Assistant',
  description: 'One place for all AI tools. Just ask, JARVIS finds the best tool for you.',
  keywords: 'AI tools, AI assistant, image generation, video AI, writing AI, JARVIS',
  authors: [{ name: 'JARVIS' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'JARVIS',
  },
  openGraph: {
    title: 'JARVIS - Your AI Tool Assistant',
    description: 'One place for all AI tools.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ff1a88',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-[#080818] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
