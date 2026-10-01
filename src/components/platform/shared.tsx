import type { ComponentType, ReactNode } from 'react';
import { cn } from '@/shadcn/lib/utils';

type Tone = 'base' | 'tint' | 'band';

const toneClass: Record<Tone, string> = {
  base: '',
  tint: 'bg-muted',
  band: 'dark bg-band text-foreground',
};

export function PlatformSection({
  id,
  tone,
  title,
  lead,
  children,
}: {
  id: string;
  tone: Tone;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn('scroll-mt-40 px-5 py-24 sm:px-8 sm:py-28', toneClass[tone])}>
      <div className='mx-auto max-w-7xl'>
        <div className='max-w-3xl'>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>{title}</h2>
          <p className='mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground'>{lead}</p>
        </div>
        <div className='mt-14'>{children}</div>
      </div>
    </section>
  );
}

export type Feature = { icon: ComponentType<{ className?: string }>; title: string; detail: string };

export function FeatureGrid({ items, className }: { items: Feature[]; className?: string }) {
  return (
    <ul className={cn('grid gap-x-8 gap-y-8 sm:grid-cols-2', className)}>
      {items.map(({ icon: Icon, title, detail }) => (
        <li key={title} className='grid grid-cols-[1.25rem_1fr] gap-3.5'>
          <Icon aria-hidden='true' className='mt-0.5 size-5 text-signal' />
          <div>
            <h3 className='font-semibold'>{title}</h3>
            <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>{detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
