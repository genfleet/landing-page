import { Wordmark } from '@/components/logo';

type FooterProps = {
  onNavigate: (target: string) => void;
};

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className='bg-footer px-5 py-10 text-footer-foreground sm:px-8'>
      <div className='mx-auto flex max-w-7xl flex-col gap-6 text-sm text-footer-foreground/70 sm:flex-row sm:items-center sm:justify-between'>
        <button
          type='button'
          onClick={() => onNavigate('top')}
          className='self-start rounded-md text-footer-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          aria-label='Go to the top of the page'
        >
          <Wordmark markClassName='w-6' className='text-lg' />
        </button>
        <p>Find, customize, and manage your AI agent team.</p>
        <p>&copy; 2026 Genfleet</p>
      </div>
    </footer>
  );
}
