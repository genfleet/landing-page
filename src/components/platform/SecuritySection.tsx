import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { KeyIcon } from '@phosphor-icons/react/dist/csr/Key';
import { LockSimpleIcon } from '@phosphor-icons/react/dist/csr/LockSimple';
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/csr/ShieldCheck';
import { StackIcon } from '@phosphor-icons/react/dist/csr/Stack';
import { LogoMark } from '@/components/logo';
import { FeatureGrid, PlatformSection } from './shared';

const features = [
  { icon: StackIcon, title: 'A sandbox for every agent', detail: 'Agent code never shares machinery. Each agent runs locked down, with its own limits.' },
  { icon: ShieldCheckIcon, title: 'A workspace for every company', detail: 'Agents, data, and settings are scoped to your company and invisible to anyone else.' },
  { icon: KeyIcon, title: 'Secrets kept out of agent code', detail: 'API keys and connected accounts live in a secrets store, and every read is logged.' },
  { icon: EyeIcon, title: 'Outbound traffic in view', detail: 'See every outside address an agent reaches, so nothing talks to the internet unnoticed.' },
];

const sandboxes = [
  { name: 'Support', color: 'text-agent-1' },
  { name: 'Finance', color: 'text-agent-2' },
  { name: 'Sales', color: 'text-agent-3' },
];

function IsolationDiagram() {
  return (
    <figure aria-label='Inside Genfleet, your workspace holds each agent in its own sandbox next to a secrets store. Another company’s workspace is fully separate.' className='rounded-[1.75rem] border border-dashed border-foreground/25 p-3 sm:p-4'>
      <figcaption className='px-1 pb-3 text-xs font-semibold text-muted-foreground'>Genfleet cloud</figcaption>
      <div className='grid gap-3 md:grid-cols-[1fr_0.42fr]'>
        <div className='rounded-2xl bg-card p-3 ring-1 ring-foreground/80 sm:p-4'>
          <p className='px-1 pb-3 text-sm font-semibold'>Your workspace</p>
          <ul className='grid grid-cols-3 gap-2'>
            {sandboxes.map(({ name, color }) => (
              <li key={name} className='rounded-xl border border-border p-3'>
                <div className='flex items-start justify-between'>
                  <LogoMark className={`w-7 ${color}`} />
                  <LockSimpleIcon aria-hidden='true' className='size-3.5 text-muted-foreground' />
                </div>
                <p className='mt-5 text-sm font-semibold'>{name}</p>
                <p className='text-xs text-muted-foreground'>Own sandbox</p>
              </li>
            ))}
          </ul>
          <div className='mt-2 flex items-center gap-2.5 rounded-xl bg-muted px-3 py-2.5 text-sm'>
            <KeyIcon aria-hidden='true' className='size-4 text-signal' />
            <span className='font-medium'>Secrets store</span>
            <span className='ml-auto text-xs text-muted-foreground'>Reads logged</span>
          </div>
        </div>
        <div className='flex flex-col rounded-2xl border border-border p-3 text-muted-foreground sm:p-4'>
          <p className='px-1 text-sm font-semibold'>Another company</p>
          <div className='mt-3 grid flex-1 place-items-center rounded-xl border border-dashed border-border p-4 text-center text-xs'>
            Separate agents, data, and secrets
          </div>
        </div>
      </div>
    </figure>
  );
}

export function SecuritySection() {
  return (
    <PlatformSection
      id='security'
      tone='base'
      title='Isolated by default.'
      lead='Agents run code on your behalf, so each one is boxed in: its own sandbox, inside a workspace that belongs only to your company.'
    >
      <div className='grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16'>
        <IsolationDiagram />
        <FeatureGrid items={features} className='sm:grid-cols-1' />
      </div>
    </PlatformSection>
  );
}
