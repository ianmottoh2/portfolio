import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Septian Mottoh - Full-Stack Developer',
  description: 'Portfolio & Engineering Benchmarks of Septian Mottoh.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white bg-[#212124] antialiased selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
