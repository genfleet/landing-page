import { Link } from '@tanstack/react-router';
import { NudgeArrow } from '@/components/nudge-arrow';
import { pricingPlans } from '@/data/pricing';
import { Button } from '@/shadcn/components/ui/button';

// The lowest Standard plan, so the pricing hint never drifts from the pricing page.
const startingPrice = Math.min(...pricingPlans.standard.map((plan) => plan.monthlyPrice));

type CtaBandProps = {
  title?: string;
  lead?: string;
};

export function CtaBand({
  title = 'Start building your AI team.',
  lead = 'Tell us where your business needs support. We will help you find, customize, and connect the right agents.',
}: CtaBandProps) {
  return (
    <section className='px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto flex max-w-7xl flex-col gap-10 rounded-[2rem] bg-muted p-8 sm:p-14 lg:flex-row lg:items-end lg:justify-between'>
        <div className='max-w-2xl'>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>{title}</h2>
          <p className='mt-5 text-lg leading-relaxed text-muted-foreground'>{lead}</p>
        </div>
        <div className='flex shrink-0 flex-col gap-3 lg:items-end'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <Button asChild size='lg' className='h-12 rounded-full px-7 text-base hover:bg-signal hover:text-white active:bg-signal active:text-white'>
              <Link to='/demo'>
                Request a demo
                <NudgeArrow />
              </Link>
            </Button>
            <Button asChild size='lg' variant='outline' className='h-12 rounded-full border-foreground/20 bg-transparent px-7 text-base hover:border-signal hover:bg-signal hover:text-white'>
              <Link to='/pricing'>See pricing</Link>
            </Button>
          </div>
          <p className='text-sm text-muted-foreground'>
            Plans from ${startingPrice} a month. Enterprise plans are quoted for your organization.
          </p>
        </div>
      </div>
    </section>
  );
}
