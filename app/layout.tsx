import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { barlowCondensed, ibmPlexSans, ibmPlexMono, oldStandardTT, sourceSerif4 } from '@/lib/fonts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBar from '@/components/MobileBar';
import '@/styles/globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://themechlab.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'The MechLab Engineering | Design • Engineer • Deliver',
  description:
    'Mechanical design studio: parametric 3D CAD, sheetmetal design, 2D drafting with GD&T, reverse engineering, fabrication support, and 3D printing.',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'mechanical design studio',
    '3D CAD modelling',
    'sheetmetal design',
    'GD&T drawings',
    'reverse engineering',
    '3D printing prototypes',
    'fabrication support',
  ],
  authors: [{ name: 'The MechLab Engineering' }],
  creator: 'The MechLab Engineering',
  formatDetection: {
    telephone: true,
    email: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Reading headers triggers Next.js CSP nonce detection from middleware
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') || undefined;

  return (
    <html
      lang="en-IN"
      className={`${barlowCondensed.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} ${oldStandardTT.variable} ${sourceSerif4.variable}`}
    >
      <body data-nonce={nonce ? 'active' : 'none'}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" style={{ flex: '1 0 auto' }}>
          {children}
        </main>
        <MobileBar />
        <Footer />
      </body>
    </html>
  );
}
