import { Link } from '@tanstack/react-router';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { Button } from '@/shadcn/components/ui/button';

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
        <Button asChild size='lg' className='h-12 shrink-0 self-start rounded-full px-7 text-base lg:self-auto'>
          <Link to='/demo'>
            Request a demo
            <ArrowRightIcon aria-hidden='true' />
          </Link>
        </Button>
      </div>
    </section>
  );
}
