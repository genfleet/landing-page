import { createFileRoute } from '@tanstack/react-router';
import { WaitlistSection } from '@/components/waitlist/WaitlistSection';
import type { BillingInterval } from '@/data/pricing';

type WaitlistSearch = {
  plan?: string;
  billing?: BillingInterval;
};

export const Route = createFileRoute('/waitlist')({
  validateSearch: (search: Record<string, unknown>): WaitlistSearch => ({
    plan: typeof search.plan === 'string' ? search.plan : undefined,
    billing: search.billing === 'monthly' || search.billing === 'annual' ? search.billing : undefined,
  }),
  head: () => ({ meta: [{ title: 'Developer waitlist | Genfleet' }] }),
  component: WaitlistPage,
});

function WaitlistPage() {
  const { plan = '', billing = 'annual' } = Route.useSearch();
  return <WaitlistSection key={plan} selectedPlan={plan} selectedBilling={billing} />;
}
