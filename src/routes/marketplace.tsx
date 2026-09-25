import { createFileRoute } from '@tanstack/react-router';
import { CtaBand } from '@/components/cta-band';
import { CatalogPreview } from '@/components/marketplace/CatalogPreview';
import { KindsSection } from '@/components/marketplace/KindsSection';
import { ReviewSection } from '@/components/marketplace/ReviewSection';
import { PageHeader } from '@/components/page-header';

const listings = [
  { category: 'Customer service', name: 'Inbox and response assistant', kind: 'Agent' },
  { category: 'Sales', name: 'Account research and follow-up assistant', kind: 'Agent' },
  { category: 'Finance', name: 'Reporting and reconciliation assistant', kind: 'Agent' },
  { category: 'Operations', name: 'ERP connector', kind: 'Connector' },
  { category: 'Research and analysis', name: 'Web research', kind: 'Tool' },
] as const;

export const Route = createFileRoute('/marketplace')({
  head: () => ({ meta: [{ title: 'Marketplace | Genfleet' }] }),
  component: MarketplacePage,
});

function MarketplacePage() {
  return (
    <>
      <PageHeader
        title='Find what your business needs next.'
        lead='Browse agents, tools, and connectors for every part of your business. Add what you need today and grow your team as your work changes.'
      >
        <div className='mt-14'>
          <CatalogPreview listings={[...listings]} />
        </div>
      </PageHeader>
      <KindsSection />
      <ReviewSection />
      <CtaBand title='Not sure where to start?' lead='Request a demo and we will recommend the agents, tools, and connectors that fit your business.' />
    </>
  );
}
