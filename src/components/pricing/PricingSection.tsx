import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { pricingPlans, type BillingInterval } from '@/data/pricing';
import { DeveloperPricingCard, EnterprisePricingCard, StandardPricingCard } from './PricingCard';
import { PlanSwitch, type PlanFamily } from './PlanSwitch';
import { PricingSwitch } from './PricingSwitch';

export function PricingSection() {
  const navigate = useNavigate();
  // Developer plans open the developer waitlist; business plans go to a demo request.
  const onSelectPlan = (plan: string, billing: BillingInterval) =>
    plan.startsWith('developer')
      ? navigate({ to: '/waitlist', search: { plan, billing } })
      : navigate({ to: '/demo', search: { plan, billing } });
  const [billing, setBilling] = useState<BillingInterval>('annual');
  const [selectedFamily, setSelectedFamily] = useState<PlanFamily>('standard');

  const pricingCards = selectedFamily === 'developer'
    ? pricingPlans.developer.map((plan) => (
      <DeveloperPricingCard key={plan.id} plan={plan} billing={billing} onSelectPlan={onSelectPlan} />
    ))
    : selectedFamily === 'standard'
      ? pricingPlans.standard.map((plan) => (
        <StandardPricingCard key={plan.id} plan={plan} billing={billing} onSelectPlan={onSelectPlan} />
      ))
      : <EnterprisePricingCard billing={billing} onSelectPlan={onSelectPlan} />;

  return (
    <section id='plans' className='bg-muted px-5 py-16 sm:px-8 sm:py-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col items-center gap-4'>
          <PlanSwitch
            selectedFamily={selectedFamily}
            onFamilyChange={setSelectedFamily}
          />
          <PricingSwitch billing={billing} onBillingChange={setBilling} />
        </div>
        {/* Cards keep one width and center in the row, so one, two, or three plans all sit balanced. */}
        <div className='mt-8 flex flex-wrap items-stretch justify-center gap-2.5 [&>*]:w-full md:[&>*]:w-[calc((100%-0.625rem)/2)] lg:[&>*]:w-[calc((100%-1.25rem)/3)]'>
          {pricingCards}
        </div>
      </div>
    </section>
  );
}
