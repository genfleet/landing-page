import { Link } from '@tanstack/react-router';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { CatalogPreview } from '@/components/marketplace/CatalogPreview';

export function MarketplaceSection() {
  return (
    <section id='marketplace' className='px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-24'>
        <div>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>Find what your business needs next.</h2>
          <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>Browse agents, tools, and connectors for different roles and business functions. Every listing is reviewed by Genfleet before it is published.</p>
          <Link to='/marketplace' className='mt-8 inline-flex items-center gap-2 rounded-full py-2 font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'>
            Browse the marketplace
            <ArrowRightIcon aria-hidden='true' className='size-4' />
          </Link>
        </div>
        <CatalogPreview />
      </div>
    </section>
  );
}
