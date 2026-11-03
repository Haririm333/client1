import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Confirm Subscription | The MechLab Dispatch',
  description: 'Confirm your double opt-in subscription to The MechLab Dispatch technical newsletter.',
  alternates: {
    canonical: '/dispatch/confirm',
  },
};

export default function ConfirmLayout({ children }: { children: React.ReactNode }) {
  return children;
}

