import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Quote | The MechLab Engineering',
  description:
    'Request a custom mechanical engineering, 3D CAD, sheetmetal, drafting, or 3D printing project quote from The MechLab Engineering.',
  alternates: {
    canonical: '/quote',
  },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}

