import { Link } from '@tanstack/react-router';
import { Wordmark } from '@/components/logo';

const footerLinks = [
  { label: 'Platform', to: '/platform' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Request a demo', to: '/demo' },
] as const;

export function Footer() {
  return (
    <footer className='bg-footer px-5 py-14 text-footer-foreground sm:px-8'>
      <div className='mx-auto grid max-w-7xl gap-10 sm:grid-cols-[1fr_auto] sm:items-start'>
        <div>
          <Link to='/' className='inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring' aria-label='Genfleet home'>
            <Wordmark markClassName='w-6' className='text-lg' />
          </Link>
          <p className='mt-4 max-w-xs text-sm leading-relaxed text-footer-foreground/70'>
            Find, customize, and manage your AI agent team.
          </p>
        </div>
        <nav aria-label='Footer navigation'>
          <ul className='grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:flex sm:gap-8'>
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className='text-footer-foreground/80 transition-colors hover:text-footer-foreground'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className='mx-auto mt-12 max-w-7xl border-t border-footer-foreground/15 pt-6 text-sm text-footer-foreground/60'>
        &copy; 2026 Genfleet
      </div>
    </footer>
  );
}
