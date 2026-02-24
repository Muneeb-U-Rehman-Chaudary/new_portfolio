import { Poppins, Inter, Space_Grotesk } from 'next/font/google';
import ClientWrapper from './clientWrapper';
import './globals.css';
import Preloader from '../Components/Preloader/Preloader';
import SmoothCursor from '../Components/CustomCursor/CustomCursor';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const siteUrl = 'https://muneeb-portfolio.vercel.app';
const siteTitle = 'Muneeb U Rehman — Fullstack Developer | React, Next.js, Node.js';
const siteDescription =
  'Muneeb U Rehman Chaudhary — Fullstack Developer based in Lahore, Pakistan. Specializing in React, Next.js, Node.js, Express, and MongoDB. Open to freelance and full-time opportunities.';
const ogImage = `${siteUrl}/Images/my_image1.jpeg`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Muneeb U Rehman',
  },
  description: siteDescription,
  keywords: [
    'Muneeb U Rehman',
    'Muneeb Chaudhary',
    'Fullstack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'MERN Stack Developer',
    'Web Developer Lahore',
    'Pakistan Developer',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio',
    'Software Engineer',
    'Superior University',
    'Crickslab',
  ],
  authors: [{ name: 'Muneeb U Rehman Chaudhary', url: siteUrl }],
  creator: 'Muneeb U Rehman Chaudhary',
  publisher: 'Muneeb U Rehman Chaudhary',
  category: 'technology',
  classification: 'Portfolio',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Muneeb U Rehman — Portfolio',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Muneeb U Rehman — Fullstack Developer',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
    creator: '@muneeb_u_rehman329',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },

  verification: {
    // Add your Google Search Console verification token here when you have it
    // google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muneeb U Rehman Chaudhary',
  url: siteUrl,
  image: ogImage,
  jobTitle: 'Fullstack Developer',
  description: siteDescription,
  email: 'muneebrehman.codes@gmail.com',
  telephone: '+92-318-6044351',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lahore',
    addressCountry: 'PK',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Superior University',
  },
  sameAs: [
    'https://github.com/Muneeb-U-Rehman-Chaudary',
    'https://www.linkedin.com/in/muneeb-u-rehman-a0151a31a',
    'https://www.instagram.com/muneeb_u_rehman329/',
  ],
  knowsAbout: [
    'React.js',
    'Next.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
    'GSAP',
    'Framer Motion',
    'REST APIs',
    'Socket.IO',
    'MERN Stack',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <ClientWrapper>
          <SmoothCursor />
          <Preloader />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
