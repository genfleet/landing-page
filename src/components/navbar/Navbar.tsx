import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { ListIcon } from '@phosphor-icons/react/dist/csr/List';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import { Button } from '@/shadcn/components/ui/button';
import { Wordmark } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

const navigationItems = [
  { label: 'Platform', to: '/platform' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Pricing', to: '/pricing' },
] as const;

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className='fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5'>
      <div className='mx-auto max-w-7xl rounded-[1.75rem] border border-border bg-background/90 py-2.5 pl-4 pr-2.5 backdrop-blur-md sm:pl-5'>
        <div className='flex items-center justify-between gap-3'>
          <Link to='/' onClick={closeMenu} className={`flex shrink-0 items-center rounded-full ${focusRing}`} aria-label='Genfleet home'>
            <Wordmark />
          </Link>

          <nav className='hidden items-center gap-7 lg:flex' aria-label='Primary navigation'>
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full py-2 text-sm text-muted-foreground transition-colors hover:text-foreground ${focusRing}`}
                activeProps={{ className: 'text-foreground font-medium', 'aria-current': 'page' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-2'>
            <ThemeToggle />
            <Button asChild className='hidden h-10 rounded-full px-6 sm:inline-flex'>
              <Link to='/demo'>
                Request a demo
                <ArrowRightIcon aria-hidden='true' />
              </Link>
            </Button>
            <button
              type='button'
              onClick={() => setMobileMenuOpen((open) => !open)}
              className={`inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden ${focusRing}`}
              aria-expanded={mobileMenuOpen}
              aria-controls='mobile-navigation'
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            >
              {mobileMenuOpen ? <XIcon aria-hidden='true' className='size-4' /> : <ListIcon aria-hidden='true' className='size-4' />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav id='mobile-navigation' className='mt-3 grid gap-1 border-t border-border pt-3 lg:hidden' aria-label='Mobile navigation'>
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className='rounded-lg px-3 py-3 text-base text-muted-foreground hover:bg-muted hover:text-foreground'
                activeProps={{ className: 'text-foreground font-medium', 'aria-current': 'page' }}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className='mt-2 h-11 rounded-full sm:hidden'>
              <Link to='/demo' onClick={closeMenu}>
                Request a demo
                <ArrowRightIcon aria-hidden='true' />
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
