import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@/components/page-header';
import { FaqSection } from '@/components/pricing/FaqSection';
import { PricingSection } from '@/components/pricing/PricingSection';

export const Route = createFileRoute('/pricing')({
  head: () => ({ meta: [{ title: 'Pricing | Genfleet' }] }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <PageHeader
        title='Plans that grow with your AI team.'
        lead='Every plan uses your own model API keys. If you would rather we manage keys for you, that is available at an extra charge.'
      />
      <PricingSection />
      <FaqSection />
    </>
  );
}
