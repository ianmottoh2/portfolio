import type { Metadata } from 'next';
import './globals.css';
import metaIcon from '../assets/images/metaIcon.jpeg';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS } from '../config/site';
import { PERSONAL_INFO, SKILL_CATEGORIES } from '../data/portfolioData';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: PERSONAL_INFO.name,
      alternateName: PERSONAL_INFO.preferredName,
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      jobTitle: PERSONAL_INFO.title,
      description: PERSONAL_INFO.tagline,
      email: PERSONAL_INFO.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: PERSONAL_INFO.location,
        addressCountry: 'ID',
      },
      worksFor: { '@type': 'Organization', name: 'Adira Finance' },
      sameAs: [
        PERSONAL_INFO.linkedin,
        PERSONAL_INFO.github,
        'https://momotor.id',
        'https://momobil.id',
      ],
      knowsAbout: SKILL_CATEGORIES.flatMap((category) => category.skills.map((skill) => skill.name)),
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: PERSONAL_INFO.preferredName, url: PERSONAL_INFO.linkedin }],
  creator: PERSONAL_INFO.preferredName,
  publisher: PERSONAL_INFO.preferredName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: PERSONAL_INFO.preferredName,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: metaIcon.src,
    apple: metaIcon.src,
  },
  category: 'Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white bg-[#060607] antialiased selection:bg-white/20 selection:text-white">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
