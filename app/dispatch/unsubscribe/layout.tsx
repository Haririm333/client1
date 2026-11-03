import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unsubscribe | The MechLab Dispatch',
  description: 'Unsubscribe from The MechLab Dispatch technical newsletter.',
  alternates: {
    canonical: '/dispatch/unsubscribe',
  },
};

export default function UnsubscribeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

