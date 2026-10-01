import { useState } from 'react';
import { ArrowsSplitIcon } from '@phosphor-icons/react/dist/csr/ArrowsSplit';
import { BrainIcon } from '@phosphor-icons/react/dist/csr/Brain';
import { GaugeIcon } from '@phosphor-icons/react/dist/csr/Gauge';
import { KeyIcon } from '@phosphor-icons/react/dist/csr/Key';
import { LightningIcon } from '@phosphor-icons/react/dist/csr/Lightning';
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/csr/ShieldCheck';
import { ScalesIcon } from '@phosphor-icons/react/dist/csr/Scales';
import { FeatureGrid, PlatformSection } from './shared';

type Mode = 'pick' | 'smart';
type Lane = 'fast' | 'balanced' | 'reasoning';

const lanes: Array<{ id: Lane; label: string; detail: string; icon: typeof LightningIcon }> = [
  { id: 'fast', label: 'Fast model', detail: 'Quick answers, lowest cost', icon: LightningIcon },
  { id: 'balanced', label: 'Balanced model', detail: 'Everyday work', icon: ScalesIcon },
  { id: 'reasoning', label: 'Reasoning model', detail: 'Hard, multi-step problems', icon: BrainIcon },
];

const tasks: Array<{ label: string; lane: Lane; why: string }> = [
  { label: 'Answer a simple question', lane: 'fast', why: 'A short, simple question, so the fast model answers it in a moment for a fraction of the cost.' },
  { label: 'Summarize a long contract', lane: 'balanced', why: 'A long document but a clear task, so the balanced model handles it well.' },
  { label: 'Plan a system migration', lane: 'reasoning', why: 'Many steps that depend on each other, so the reasoning model takes it on.' },
];

const PINNED: Lane = 'balanced';

const features = [
  { icon: KeyIcon, title: 'Your keys or ours', detail: 'Use your company’s own model provider keys on every plan, or let us manage them for an extra charge.' },
  { icon: ShieldCheckIcon, title: 'Automatic fallback', detail: 'If a provider slows down or goes offline, requests move to a healthy one.' },
  { icon: GaugeIcon, title: 'Budgets and usage per agent', detail: 'Set spending limits and see what each agent costs, by model.' },
];

function RouterDemo() {
  const [mode, setMode] = useState<Mode>('smart');
  const [taskIndex, setTaskIndex] = useState(0);
  const task = tasks[taskIndex];
  const lane = mode === 'pick' ? PINNED : task.lane;
  const why = mode === 'pick' ? 'This agent is pinned to the balanced model, so every request goes there, whatever it asks.' : task.why;

  return (
    <div className='rounded-[1.75rem] border border-border bg-card p-3 sm:p-4'>
      <div role='radiogroup' aria-label='Routing mode' className='inline-grid grid-cols-2 gap-1 rounded-full bg-muted p-1'>
        {([['pick', 'Pick a model'], ['smart', 'Smart routing']] as const).map(([value, label]) => (
          <button
            key={value}
            type='button'
            role='radio'
            aria-checked={mode === value}
            onClick={() => setMode(value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-(--dur-standard) ${mode === value ? 'bg-signal text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className='mt-4 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]'>
        <div>
          <p className='px-1 pb-2 text-xs font-semibold text-muted-foreground'>A request comes in</p>
          <ul className='space-y-1.5'>
            {tasks.map(({ label }, index) => {
              const active = index === taskIndex;
              return (
                <li key={label}>
                  <button
                    type='button'
                    aria-pressed={active}
                    onClick={() => setTaskIndex(index)}
                    className={`w-full rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition-colors duration-(--dur-quick) ${active ? 'border-foreground/70 bg-muted' : 'border-border text-muted-foreground hover:text-foreground'}`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='flex items-center justify-center gap-2 md:flex-col'>
          <span aria-hidden='true' className='h-px w-8 bg-border md:h-8 md:w-px' />
          <span className='flex size-16 flex-col items-center justify-center gap-1 rounded-2xl bg-muted text-center'>
            <ArrowsSplitIcon aria-hidden='true' className='size-5 text-signal' />
            <span className='text-[0.65rem] font-semibold leading-none'>Router</span>
          </span>
          <span aria-hidden='true' className='h-px w-8 bg-border md:h-8 md:w-px' />
        </div>

        <div>
          <p className='px-1 pb-2 text-xs font-semibold text-muted-foreground'>It goes to</p>
          <ul className='space-y-1.5'>
            {lanes.map(({ id, label, detail, icon: Icon }) => {
              const active = id === lane;
              return (
                <li
                  key={id}
                  aria-current={active ? 'true' : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-3 transition-[background-color,color,opacity] duration-(--dur-glide) ease-[var(--ease-glide)] ${active ? 'bg-signal text-white' : 'bg-muted opacity-60'}`}
                >
                  <Icon aria-hidden='true' className='size-5 shrink-0' />
                  <span>
                    <span className='block text-sm font-semibold'>{label}</span>
                    <span className={`block text-xs ${active ? 'text-white/85' : 'text-muted-foreground'}`}>{detail}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p key={`${mode}-${taskIndex}`} className='mt-4 animate-in rounded-xl bg-muted px-4 py-3 text-sm leading-relaxed text-muted-foreground duration-300 fade-in' aria-live='polite'>
        {why}
      </p>
    </div>
  );
}

export function ModelsSection() {
  return (
    <PlatformSection
      id='models'
      tone='band'
      title='The right model for every task.'
      lead='Your agents should not care which AI provider answers them. The Genfleet model router sits in between, so you can change models without changing agents.'
    >
      <RouterDemo />
      <FeatureGrid items={features} className='mt-14 lg:grid-cols-3' />
    </PlatformSection>
  );
}
