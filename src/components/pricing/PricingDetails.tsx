import type { BillingInterval, PricingPlan } from '@/data/pricing';

const formatEGP = (amount: number) => `EGP ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

// Local pricing for Egypt, under the dollar price.
function EgpLine({ monthlyEGP, billing }: { monthlyEGP: number; billing: BillingInterval }) {
  const text = billing === 'monthly' ? `${formatEGP(monthlyEGP)} / month in Egypt` : `${formatEGP(monthlyEGP * 10)} / year in Egypt`;
  return <p className='mt-1.5 text-sm text-muted-foreground'>{text}</p>;
}

export function PlanPrice({ plan, billing, monthlyEGP }: { plan: PricingPlan; billing: BillingInterval; monthlyEGP?: number }) {
  // A free plan has no yearly discount to show.
  if (plan.monthlyPrice === 0) {
    return (
      <p className='flex items-end gap-2'>
        <span className='font-display text-4xl font-bold tracking-[-0.03em]'>$0</span>
        <span className='pb-1 text-sm text-muted-foreground'>/ month</span>
      </p>
    );
  }

  if (billing === 'monthly') {
    return (
      <>
      <p className='flex items-end gap-2'>
        <span className='font-display text-4xl font-bold tracking-[-0.03em]'>${formatPrice(plan.monthlyPrice)}</span>
        <span className='pb-1 text-sm text-muted-foreground'>/ month</span>
      </p>
      {monthlyEGP ? <EgpLine monthlyEGP={monthlyEGP} billing={billing} /> : null}
    </>
    );
  }

  const annualTotal = plan.monthlyPrice * 10;
  const monthlyEquivalent = annualTotal / 12;

  return (
    <div>
      <p className='flex flex-wrap items-end gap-x-2 gap-y-1'>
        <span className='font-display text-4xl font-bold tracking-[-0.03em]'>${formatPrice(monthlyEquivalent)}</span>
        <span className='pb-1 text-sm text-muted-foreground'>/ month</span>
      </p>
      <div className='mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground'>
        <span className='line-through'>${formatPrice(plan.monthlyPrice)} / month</span>
        <span>${formatPrice(annualTotal)} billed annually</span>
      </div>
      {monthlyEGP ? <EgpLine monthlyEGP={monthlyEGP} billing={billing} /> : null}
    </div>
  );
}

function formatPrice(price: number) {
  return Number.isInteger(price) ? price.toString() : price.toFixed(2);
}
