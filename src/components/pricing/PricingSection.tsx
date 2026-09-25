import { useState } from 'react';
import { pricingPlans, type BillingInterval } from '@/data/pricing';
import { DeveloperPricingCard, EnterprisePricingCard, StandardPricingCard } from './PricingCard';
import { PlanSwitch, type PlanFamily } from './PlanSwitch';
import { PricingSwitch } from './PricingSwitch';

type PricingSectionProps = {
  onSelectPlan: (planId: string, billing: BillingInterval) => void;
};

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
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
    <section id='pricing' className='bg-muted px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto max-w-7xl'>
        <div className='mx-auto max-w-5xl text-center'>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>
            Start with one agent. Grow into a team.
          </h2>
          <p className='mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground'>
            Every plan uses your own model API keys. If you would rather we
            manage keys for you, that is available at an extra charge.
          </p>
        </div>
        <div className='mt-10 flex flex-col items-center gap-4'>
          <PlanSwitch
            selectedFamily={selectedFamily}
            onFamilyChange={setSelectedFamily}
          />
          <PricingSwitch billing={billing} onBillingChange={setBilling} />
        </div>
        <div className={`mt-8 space-y-4 md:grid md:space-y-0 md:grid-cols-2 lg:grid-cols-4 items-stretch gap-2.5`}>
          {pricingCards}
        </div>
      </div>
    </section>
  );
}
