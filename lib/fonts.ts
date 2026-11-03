import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Mono, Old_Standard_TT, Source_Serif_4 } from 'next/font/google';

// Headings across all marketing pages
export const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
});

// Primary body and user interface typography
export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

// Engineering labels, drawings callouts, technical numbers, code
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// Dispatch newspaper masthead and section headlines (only on /dispatch)
export const oldStandardTT = Old_Standard_TT({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif-masthead',
  display: 'swap',
});

// Dispatch newspaper editorial body (only on /dispatch) - variable font
export const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif-body',
  display: 'swap',
});
