import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Septian Mottoh - Senior Full-Stack & Platform Engineer',
  description: 'Portfolio & Engineering Benchmarks of Septian Mottoh - Ex-Adira Finance, Traveloka, Momotor, Momobil Senior Software Engineer.',
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
