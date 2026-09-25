import { createFileRoute } from '@tanstack/react-router';
import { DemoSection } from '@/components/landing/DemoSection';
import type { BillingInterval } from '@/data/pricing';

type DemoSearch = {
  plan?: string;
  billing?: BillingInterval;
};

export const Route = createFileRoute('/demo')({
  validateSearch: (search: Record<string, unknown>): DemoSearch => ({
    plan: typeof search.plan === 'string' ? search.plan : undefined,
    billing: search.billing === 'monthly' || search.billing === 'annual' ? search.billing : undefined,
  }),
  head: () => ({ meta: [{ title: 'Request a demo | Genfleet' }] }),
  component: DemoPage,
});

function DemoPage() {
  const { plan = '', billing = 'annual' } = Route.useSearch();
  return <DemoSection selectedPlan={plan} selectedBilling={billing} />;
}
