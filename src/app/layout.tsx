import type { Metadata } from 'next';
import './globals.css';
import metaIcon from '../assets/images/metaIcon.jpeg';

export const metadata: Metadata = {
  title: 'Septian Mottoh - Full-Stack Developer',
  description: 'Portfolio & Engineering Benchmarks of Septian Mottoh.',
  icons: {
    icon: metaIcon.src
  }
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
