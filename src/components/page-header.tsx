import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: ReactNode;
  lead: string;
  children?: ReactNode;
};

export function PageHeader({ title, lead, children }: PageHeaderProps) {
  return (
    <section className='px-5 pb-4 pt-36 sm:px-8 sm:pb-8 sm:pt-44'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='max-w-4xl text-balance text-[clamp(2.6rem,5.4vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em]'>
          {title}
        </h1>
        <p className='mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl'>{lead}</p>
        {children}
      </div>
    </section>
  );
}
