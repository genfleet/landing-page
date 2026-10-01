import type { ReactNode } from 'react';
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { InfoTip } from '@/components/info-tip';
import { NudgeArrow } from '@/components/nudge-arrow';
import {
  type BillingInterval,
  type DeveloperPricingPlan,
  type PlanFeature,
  type StandardPricingPlan,
} from '@/data/pricing';
import { Button } from '@/shadcn/components/ui/button';
import { PlanPrice } from './PricingDetails';

type SelectPlan = (planId: string, billing: BillingInterval) => void;

type PlanCardProps = {
  family: string;
  name: string;
  description: string;
  price: ReactNode;
  heading: string;
  features: PlanFeature[];
  footnote?: string;
  recommended?: boolean;
  cta: { label: string; primary: boolean; onClick: () => void };
};

// One layout for every plan. Fixed-height slots for the description and price
// keep the divider and feature lists level across cards in the same row.
function PlanCard({ family, name, description, price, heading, features, footnote, recommended, cta }: PlanCardProps) {
  return (
    <article className={`flex min-h-full flex-col rounded-2xl bg-card p-6 sm:p-7 ${recommended ? 'ring-2 ring-inset ring-foreground' : ''}`}>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-sm font-medium text-muted-foreground'>{family}</p>
          <h3 className='mt-2 text-2xl font-semibold tracking-tight'>{name}</h3>
        </div>
        {recommended && <span className='rounded-full bg-signal px-2.5 py-1 text-xs font-medium text-white'>Recommended</span>}
      </div>
      <p className='mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground'>{description}</p>
      <div className='mt-7 min-h-24'>{price}</div>
      <div className='my-7 border-t border-border pt-6'>
        <p className='mb-3 text-sm font-medium'>{heading}</p>
        <ul className='space-y-3'>
          {features.map(({ text, info, infoLabel }) => (
            <li key={text} className='flex gap-3 text-sm leading-snug'>
              <CheckIcon aria-hidden='true' className='mt-0.5 size-4 shrink-0 text-signal' weight='bold' />
              <span>
                {text}
                {info && (
                  <>
                    {' '}
                    <InfoTip label={infoLabel ?? `More about ${text}`}>{info}</InfoTip>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
        {footnote && <p className='mt-4 text-xs text-muted-foreground'>{footnote}</p>}
      </div>
      <Button
        type='button'
        variant={cta.primary ? 'default' : 'outline'}
        onClick={cta.onClick}
        className={`mt-auto h-11 w-full rounded-full ${cta.primary ? 'hover:bg-signal hover:text-white' : 'border-foreground/25 bg-transparent hover:border-signal hover:bg-signal hover:text-white'}`}
      >
        {cta.label}
        <NudgeArrow />
      </Button>
    </article>
  );
}

const supportLabel = { limited: 'Basic support', standard: 'Standard support', priority: 'Priority support', dedicated: 'Dedicated support', none: 'Community support' } as const;

export function StandardPricingCard({ plan, billing, onSelectPlan }: { plan: StandardPricingPlan; billing: BillingInterval; onSelectPlan: SelectPlan }) {
  const features: PlanFeature[] = [
    { text: `Up to ${plan.agents} agents` },
    { text: plan.connectors === 'unlimited' ? 'Unlimited connectors' : `Up to ${plan.connectors} connectors` },
    {
      text: 'Use your own model API keys',
      infoLabel: 'About managed API keys',
      info: `Want us to manage keys for you? Include at least $${plan.startingCredits} in starting credits.`,
    },
    { text: supportLabel[plan.support as keyof typeof supportLabel] },
  ];

  return (
    <PlanCard
      family='Standard'
      name={plan.name}
      description='The right capacity for a growing AI team.'
      price={<PlanPrice plan={plan} billing={billing} />}
      heading='Includes:'
      features={features}
      recommended={plan.id === 'pro'}
      cta={{ label: `Choose ${plan.name}`, primary: plan.id === 'pro', onClick: () => onSelectPlan(plan.id, billing) }}
    />
  );
}

export function DeveloperPricingCard({ plan, billing, onSelectPlan }: { plan: DeveloperPricingPlan; billing: BillingInterval; onSelectPlan: SelectPlan }) {
  const features = billing === 'annual' ? [...plan.features, ...(plan.annualFeatures ?? [])] : plan.features;
  const free = plan.monthlyPrice === 0;

  return (
    <PlanCard
      family='Developer'
      name={plan.name}
      description={free ? 'Build agents for the Genfleet marketplace.' : 'Build, publish, and grow with the Genfleet developer program.'}
      price={<PlanPrice plan={plan} billing={billing} monthlyEGP={plan.monthlyPriceEGP} />}
      heading={plan.includesPlan ? `Everything in ${plan.includesPlan}, plus:` : 'Includes:'}
      features={features}
      footnote={billing === 'monthly' && plan.annualFeatures ? `With yearly billing: ${plan.annualFeatures.map((feature) => feature.text).join(', ')}.` : undefined}
      cta={{ label: 'Join waitlist', primary: !free, onClick: () => onSelectPlan(plan.id, billing) }}
    />
  );
}

const enterpriseFeatures: PlanFeature[] = [
  { text: 'Agent limits set around your teams' },
  { text: 'Dedicated support' },
  { text: 'Custom connectors built on request' },
  { text: 'Help connecting your systems' },
];

export function EnterprisePricingCard({ billing, onSelectPlan }: { billing: BillingInterval; onSelectPlan: SelectPlan }) {
  return (
    <PlanCard
      family='Enterprise'
      name='Custom plan'
      description='Capacity, access, and support tailored to your organization.'
      price={
        <div>
          <p className='font-display text-4xl font-bold tracking-[-0.03em]'>Custom</p>
          <p className='mt-2 text-sm text-muted-foreground'>Quoted for your organization</p>
        </div>
      }
      heading='Includes:'
      features={enterpriseFeatures}
      cta={{ label: 'Request a demo', primary: true, onClick: () => onSelectPlan('enterprise', billing) }}
    />
  );
}
