import type { ReactNode } from 'react';

export function SectionIntro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>{title}</h2>
      <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>{children}</p>
    </div>
  );
}

type Capability = { title: string; detail: string; status: 'available' | 'rolling-out' | 'coming-soon' };

export function CapabilityList({ items, renderStatus }: { items: Capability[]; renderStatus: (status: Capability['status']) => ReactNode }) {
  return (
    <ul className='mt-10 divide-y divide-border border-y border-border'>
      {items.map(({ title, detail, status }) => (
        <li key={title} className='grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:gap-6'>
          <div>
            <h3 className='font-semibold'>{title}</h3>
            <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>{detail}</p>
          </div>
          <div className='sm:pt-0.5'>{renderStatus(status)}</div>
        </li>
      ))}
    </ul>
  );
}

export type { Capability };
