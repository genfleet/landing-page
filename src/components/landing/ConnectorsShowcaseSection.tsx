import type { ReactNode } from 'react';
import { SlackLogo } from '@/components/marketplace/brand-logos';
import { brandMarks } from '@/data/brand-marks';

// Customer channels lead, then the everyday team tools, then docs, engineering, and CRM.
const showcase = [
  'whatsapp', 'instagram', 'github', 'slack', 'gmail',
  'googledrive', 'googlecalendar', 'notion', 'confluence', 'jira', 'linear', 'attio', 'zendesk',
] as const;

type ShowcaseSlug = Exclude<(typeof showcase)[number], 'slack'>;

function Mark({ slug }: { slug: ShowcaseSlug }) {
  const { color, path, viewBox = '0 0 24 24', fillRule } = brandMarks[slug];
  return (
    <svg viewBox={viewBox} aria-hidden='true' className='size-8'>
      {(Array.isArray(path) ? path : [path]).map((d) => (
        <path key={d.slice(0, 24)} d={d} fill={color ?? 'currentColor'} fillRule={fillRule} clipRule={fillRule} />
      ))}
    </svg>
  );
}

function Tile({ name, children }: { name: string; children: ReactNode }) {
  return (
    <li className='flex flex-col items-center justify-center gap-3 rounded-2xl bg-card px-3 py-6 text-center'>
      {children}
      <span className='text-sm font-medium'>{name}</span>
    </li>
  );
}

export function ConnectorsShowcaseSection() {
  return (
    <section className='px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto max-w-7xl'>
        <div className='max-w-3xl'>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>Works with the tools you already use.</h2>
          <p className='mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground'>
            Connect your agents to the systems your team works in every day. Connect each one once, and every agent that needs it can use it.
          </p>
        </div>
        <ul className='mt-14 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7' aria-label='Connectors'>
          {showcase.map((slug) =>
            // Slack's four-color mark isn't in the shared set, so it has its own component.
            slug === 'slack' ? (
              <Tile key={slug} name='Slack'>
                <SlackLogo className='size-8' />
              </Tile>
            ) : (
              <Tile key={slug} name={brandMarks[slug].name}>
                <Mark slug={slug} />
              </Tile>
            ),
          )}
          {/* A statement, not a control: no border, no icon, so it doesn't read as "add". */}
          <li className='flex flex-col items-center justify-center px-3 py-6 text-center'>
            <span className='font-display text-xl font-bold tracking-[-0.02em]'>And more</span>
            <span className='mt-1 text-xs leading-snug text-muted-foreground'>Custom connectors built on request</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
