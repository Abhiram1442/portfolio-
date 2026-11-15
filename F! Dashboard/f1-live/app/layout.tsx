import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/ui/Navigation';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'F1 LIVE — Everything happening on the track, live.',
  description: 'Live Formula 1 race dashboard. Real-time leaderboard, lap times, pit stops, standings and more.',
  keywords: ['Formula 1', 'F1', 'live', 'race', 'timing', 'leaderboard'],
  openGraph: {
    title: 'F1 LIVE',
    description: 'Everything happening on the track, live.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white min-h-screen`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-white/10 py-6 mt-12">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-black text-lg">F1</span>
              <span className="font-bold text-white">LIVE</span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              ⚠️ PHASE 1 — PROTOTYPE WITH MOCK DATA. Data shown is not real or live.
            </p>
            <p className="text-xs text-gray-600">
              © 2025 F1 LIVE
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
