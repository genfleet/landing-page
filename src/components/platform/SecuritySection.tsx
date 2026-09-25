import { LogoMark } from '@/components/logo';
import { StatusTag } from '@/components/status-tag';
import { CapabilityList, SectionIntro, type Capability } from './SectionIntro';

const capabilities: Capability[] = [
  { title: 'Every agent in its own container', detail: 'Agent code never runs on shared machinery. Each one gets a locked-down container with its own limits.', status: 'available' },
  { title: 'A separate workspace for every company', detail: 'Your agents, data, and settings are scoped to your workspace and invisible to anyone else.', status: 'available' },
  { title: 'Keys and accounts stored as secrets', detail: 'API keys and connected accounts live in a secrets store, not in agent code, and every read is logged.', status: 'available' },
  { title: 'Outbound network control', detail: 'See every outside address an agent reaches today. Blocking anything you have not approved comes next.', status: 'rolling-out' },
];

const yourAgents = [
  { name: 'Support agent', color: 'text-agent-1' },
  { name: 'Finance agent', color: 'text-agent-2' },
  { name: 'Sales agent', color: 'text-agent-3' },
];

export function SecuritySection() {
  return (
    <section id='security' className='px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24'>
        <div>
          <SectionIntro title='Isolated by default.'>
            Agents run code on your behalf, so every one of them is boxed in: its own container, inside a workspace that belongs only to your company.
          </SectionIntro>
          <CapabilityList items={capabilities} renderStatus={(status) => <StatusTag status={status} />} />
        </div>

        <figure className='self-center' aria-label='Your workspace holds three agents, each in its own container, separated from another company’s workspace'>
          <div className='rounded-[1.75rem] border-2 border-foreground p-3 sm:p-4'>
            <p className='px-2 pb-3 pt-1 text-sm font-semibold'>Your workspace</p>
            <ul className='grid gap-2.5 sm:grid-cols-3'>
              {yourAgents.map(({ name, color }) => (
                <li key={name} className='rounded-2xl border border-dashed border-foreground/35 bg-card p-4'>
                  <LogoMark className={`w-7 ${color}`} />
                  <p className='mt-6 text-sm font-semibold'>{name}</p>
                  <p className='mt-0.5 text-xs text-muted-foreground'>Own container</p>
                </li>
              ))}
            </ul>
            <div className='mt-2.5 flex items-center justify-between gap-4 rounded-2xl bg-muted px-4 py-3 text-sm'>
              <span className='font-medium'>Secrets store</span>
              <span className='text-muted-foreground'>Keys and connected accounts</span>
            </div>
          </div>
          <div className='mt-3 rounded-[1.75rem] border border-border p-4 text-muted-foreground'>
            <p className='text-sm font-semibold'>Another company’s workspace</p>
            <p className='mt-1 text-sm'>Separate agents, data, and secrets. No shared access in either direction.</p>
          </div>
        </figure>
      </div>
    </section>
  );
}
