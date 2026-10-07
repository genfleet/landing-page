import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { ContactUs } from '@/components/contact-us';
import type { BillingInterval } from '@/data/pricing';

type DemoSectionProps = {
  selectedPlan: string;
  selectedBilling: BillingInterval;
};

const benefits = [
  'A walkthrough built around your use case',
  'Help choosing your first agents',
  'A plan for connecting your systems',
];

export function DemoSection({ selectedPlan, selectedBilling }: DemoSectionProps) {
  return (
    <section className='px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44'>
      <div className='mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24'>
        <div>
          <h1 className='text-[clamp(2.6rem,5.4vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em]'>See Genfleet with your own work.</h1>
          <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>Tell us where your business needs support. In the demo we will show you the agents that fit, how they connect to your systems, and how your team stays in control.</p>
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
