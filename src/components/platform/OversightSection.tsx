import { useState } from 'react';
import { ChartBarIcon } from '@phosphor-icons/react/dist/csr/ChartBar';
import { ListMagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/ListMagnifyingGlass';
import { PulseIcon } from '@phosphor-icons/react/dist/csr/Pulse';
import { UserCheckIcon } from '@phosphor-icons/react/dist/csr/UserCheck';
import { LogoMark } from '@/components/logo';
import { FeatureGrid, PlatformSection } from './shared';

const features = [
  { icon: PulseIcon, title: 'A log of every run', detail: 'Which agent ran, what it was asked, and how long it took.' },
  { icon: ListMagnifyingGlassIcon, title: 'Every step visible', detail: 'Open any run to see each tool call, in order.' },
  { icon: ChartBarIcon, title: 'Stats for every agent', detail: 'Each agent’s page shows how it has been working, next to its tools, memory, and logs.' },
  { icon: UserCheckIcon, title: 'People stay in the loop', detail: 'Hold sensitive actions until someone on your team signs off.' },
];

const runs = [
  {
    time: '09:14',
    agent: 'Support agent',
    color: 'text-agent-1',
    task: 'Where is order 4821?',
    duration: '2.4s',
    steps: ['Read the customer’s email', 'Looked up order 4821 in the ERP', 'Checked the carrier’s tracking page', 'Drafted a reply with the new delivery date'],
  },
  {
    time: '09:21',
    agent: 'Sales agent',
    color: 'text-agent-3',
    task: 'Prepare follow-ups after the demo',
    duration: '4.1s',
    steps: ['Read the meeting notes', 'Pulled 6 accounts from the CRM', 'Wrote a tailored email for each', 'Scheduled follow-ups on the calendar'],
  },
  {
    time: '09:32',
    agent: 'Finance agent',
    color: 'text-agent-2',
    task: 'Match September invoices',
    duration: '6.8s',
    steps: ['Pulled 40 invoices from the ERP', 'Matched 38 to bank payments', 'Flagged 2 with mismatched totals', 'Posted a summary in Slack'],
  },
];

function RunExplorer() {
  const [selected, setSelected] = useState(0);
  const run = runs[selected];

  return (
    <div className='grid gap-2.5 rounded-[1.75rem] bg-muted p-2.5 sm:p-3 md:grid-cols-[0.95fr_1.05fr]'>
      <div>
        <p className='px-3 pb-2.5 pt-1.5 text-sm font-semibold'>Today</p>
        <ul className='space-y-1.5' aria-label='Agent runs'>
          {runs.map(({ time, agent, color, task }, index) => {
            const active = index === selected;
            return (
              <li key={time}>
                <button
                  type='button'
                  aria-pressed={active}
                  onClick={() => setSelected(index)}
                  className={`grid w-full grid-cols-[3rem_1fr] gap-2 rounded-2xl px-4 py-3.5 text-left transition-colors duration-(--dur-quick) ${active ? 'bg-signal text-white' : 'bg-card hover:bg-card/70'}`}
                >
                  <time className={`text-sm tabular-nums ${active ? 'text-white/80' : 'text-muted-foreground'}`}>{time}</time>
                  <span className='min-w-0'>
                    <span className='flex items-center gap-2 text-sm font-semibold'>
                      <LogoMark className={`w-4 ${active ? 'text-white' : color}`} />
                      {agent}
                    </span>
                    <span className={`mt-0.5 block truncate text-sm ${active ? 'text-white/85' : 'text-muted-foreground'}`}>{task}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className='rounded-2xl bg-card p-5 sm:p-6' aria-live='polite'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='font-semibold'>{run.task}</p>
            <p className='mt-0.5 text-sm text-muted-foreground'>
              {run.agent}, {run.time}, finished in {run.duration}
            </p>
          </div>
        </div>
        <ol key={selected} className='mt-6 space-y-0'>
          {run.steps.map((step, index) => (
            <li
              key={step}
              className='relative grid animate-in grid-cols-[1.5rem_1fr] gap-3 pb-5 fill-mode-both fade-in slide-in-from-bottom-1 duration-500 ease-[var(--ease-glide)] last:pb-0 motion-reduce:slide-in-from-bottom-0'
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {index < run.steps.length - 1 && <span aria-hidden='true' className='absolute left-3 top-6 h-[calc(100%-1.25rem)] w-px bg-border' />}
              <span className='flex size-6 items-center justify-center rounded-full border border-border text-xs font-semibold tabular-nums'>{index + 1}</span>
              <span className='pt-0.5 text-sm'>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function OversightSection() {
  return (
    <PlatformSection
      id='oversight'
      tone='base'
      title='See what every agent did.'
      lead='Agents work while your team is busy. Genfleet keeps the record, so anyone can open a run later and follow it step by step.'
    >
      <div className='grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16'>
        <RunExplorer />
        <FeatureGrid items={features} className='sm:grid-cols-1' />
      </div>
    </PlatformSection>
  );
}
