'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radio } from 'lucide-react';

const NAV_LINKS = [
  { href: '/live', label: 'Live', isLive: true },
  { href: '/calendar', label: 'Calendar' },
  { href: '/results', label: 'Results' },
  { href: '/standings', label: 'Standings' },
  { href: '/drivers', label: 'Drivers' },
  { href: '/teams', label: 'Teams' },
  { href: '/circuits', label: 'Circuits' },
];

export function Navigation() {
  const pathname = usePathname();
  const isLivePage = pathname === '/live';

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/8">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-14 gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-[#e10600] font-black text-xl tracking-tight">WILTZ</span>
            <span className="font-extrabold text-white text-base tracking-wider bg-white/10 px-2 py-0.5 rounded border border-white/10">F1 LIVE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {NAV_LINKS.map(({ href, label, isLive }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors
                    ${active
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                    ${isLive && !active ? 'text-red-400' : ''}
                  `}
                >
                  {isLive && (
                    <Radio
                      size={12}
                      className={`live-pulse ${active ? 'text-red-400' : 'text-red-500'}`}
                      aria-hidden="true"
                    />
                  )}
                  {label}
                  {isLive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full live-pulse" aria-label="Live race in progress" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Nav — horizontal scroll */}
          <nav className="flex md:hidden items-center gap-1 overflow-x-auto scrollbar-none flex-1">
            {NAV_LINKS.map(({ href, label, isLive }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    shrink-0 flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-colors
                    ${active ? 'text-white bg-white/10' : 'text-gray-400'}
                    ${isLive ? 'text-red-400' : ''}
                  `}
                >
                  {isLive && <Radio size={10} className="live-pulse" aria-hidden="true" />}
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mock badge */}
          <div className="ml-auto shrink-0">
            <span className="text-[10px] font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded tracking-wider uppercase">
              Mock Data
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
