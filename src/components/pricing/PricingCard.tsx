import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { Button } from '@/shadcn/components/ui/button';
import { type BillingInterval, type PricingPlan } from '@/data/pricing';
import { PlanFacts, PlanPrice } from './PricingDetails';

type SelectPlan = (planId: string, billing: BillingInterval) => void;

type StandardPricingCardProps = {
  plan: PricingPlan;
  billing: BillingInterval;
  onSelectPlan: SelectPlan;
};

export function StandardPricingCard({ plan, billing, onSelectPlan }: StandardPricingCardProps) {
  const isRecommended = plan.id === 'pro';

  return (
    <article className={`flex min-h-full flex-col rounded-2xl bg-card p-6 sm:p-7 ${isRecommended ? 'ring-2 ring-foreground ring-inset' : ''}`}>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-sm font-medium text-muted-foreground'>Standard</p>
          <h3 className='mt-2 text-2xl font-semibold tracking-tight'>{plan.name}</h3>
        </div>
        {isRecommended && <span className='rounded-full bg-signal px-2.5 py-1 text-xs font-medium text-signal-foreground'>Recommended</span>}
      </div>
      <p className='mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground'>Choose the right capacity for a growing team of agents.</p>
      <div className='mt-7'>
        <PlanPrice plan={plan} billing={billing} />
      </div>
      <PlanFacts plan={plan} />
      <Button type='button' onClick={() => onSelectPlan(plan.id, billing)} className='mt-auto h-11 w-full rounded-full'>
        Choose {plan.name}
        <ArrowRightIcon aria-hidden='true' />
      </Button>
    </article>
  );
}

export function DeveloperPricingCard({ plan, billing, onSelectPlan }: { plan: PricingPlan; billing: BillingInterval; onSelectPlan: SelectPlan }) {
  return (
    <article className='flex min-h-full flex-col rounded-2xl bg-card p-6 sm:p-7'>
      <div className='space-y-2'>
        <p className='text-sm font-medium text-muted-foreground'>Developer</p>
        <h3 className='mt-2 text-2xl font-semibold tracking-tight'>{plan.name}</h3>
        <PlanPrice plan={plan} billing={billing} />
      </div>
      <p className='mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground'>For developers who want to create, publish, and sell agents through the Genfleet marketplace.</p>
      <Button type='button' variant='outline' onClick={() => onSelectPlan(plan.id, billing)} className='mt-auto h-11 w-full rounded-full border-foreground/25 bg-transparent'>
        Get developer access
        <ArrowRightIcon aria-hidden='true' />
      </Button>
    </article>
  );
}

export function EnterprisePricingCard({ billing, onSelectPlan }: { billing: BillingInterval; onSelectPlan: SelectPlan }) {
  return (
    <article className='flex min-h-full flex-col rounded-2xl bg-card p-6 sm:p-7'>
      <div>
        <p className='text-sm font-medium text-muted-foreground'>Enterprise</p>
        <h3 className='mt-2 text-2xl font-semibold tracking-tight'>Custom plan</h3>
      </div>
      <p className='mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground'>Capacity, access, and support tailored to your organization.</p>
      <div className='mt-16'>
        <p className='text-2xl font-semibold tracking-tight'>Contact us for a quotation</p>
        <p className='mt-2 text-sm text-muted-foreground'>We will shape a plan around your teams and operating needs.</p>
      </div>
      <Button type='button' variant='outline' onClick={() => onSelectPlan('enterprise', billing)} className='mt-auto h-11 w-full rounded-full border-foreground/25 bg-transparent'>
        Request a demo
        <ArrowRightIcon aria-hidden='true' />
      </Button>
    </article>
  );
}
