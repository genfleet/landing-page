import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { ContactUs } from '@/components/contact-us';
import type { BillingInterval } from '@/data/pricing';

type BetaSectionProps = {
  selectedPlan: string;
  selectedBilling: BillingInterval;
};

const benefits = [
  'Help choosing the right agents',
  'Genfleet-assisted customization',
  'One workspace for your growing team',
];

export function BetaSection({ selectedPlan, selectedBilling }: BetaSectionProps) {
  return (
    <section id='beta' className='relative px-5 py-24 sm:px-8 sm:py-32'>
      <div className='relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24'>
        <div>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl'>Start building your AI team.</h2>
          <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>Tell us where your business needs support. We will help you find, customize, and connect the right agents.</p>
          <ul className='mt-9 space-y-4 text-muted-foreground'>
            {benefits.map((benefit) => (
              <li key={benefit} className='flex items-center gap-3'>
                <span className='flex size-5 items-center justify-center rounded-full bg-foreground text-background'>
                  <CheckIcon aria-hidden='true' className='size-3' weight='bold' />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <ContactUs key={`${selectedPlan}-${selectedBilling}`} defaultPlan={selectedPlan} defaultBilling={selectedBilling} />
      </div>
    </section>
  );
}
