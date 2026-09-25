import { StatusTag } from '@/components/status-tag';
import { CapabilityList, SectionIntro, type Capability } from './SectionIntro';

const capabilities: Capability[] = [
  { title: 'A log of every run', detail: 'Which agent ran, what it was asked, and how long it took.', status: 'available' },
  { title: 'Every tool call visible', detail: 'See each system an agent touched and what it did there.', status: 'available' },
  { title: 'Stats for each agent', detail: 'Every agent’s page shows how it has been working, alongside its tools, memory, and logs.', status: 'available' },
  { title: 'Approval steps', detail: 'Hold sensitive actions until someone on your team signs off.', status: 'coming-soon' },
  { title: 'Full audit trail', detail: 'A permanent record of who changed what, for compliance reviews.', status: 'coming-soon' },
];

const feed = [
  { time: '09:14', agent: 'Support agent', action: 'Looked up order 4821 in the ERP', color: 'bg-agent-1' },
  { time: '09:14', agent: 'Support agent', action: 'Drafted a reply with a new delivery date', color: 'bg-agent-1' },
  { time: '09:21', agent: 'Sales agent', action: 'Prepared follow-ups for 6 accounts in the CRM', color: 'bg-agent-3' },
  { time: '09:32', agent: 'Finance agent', action: 'Matched 38 invoices to payments', color: 'bg-agent-2' },
  { time: '09:40', agent: 'Finance agent', action: 'Flagged 2 invoices with mismatched totals', color: 'bg-agent-2' },
];

export function ActivitySection() {
  return (
    <section id='activity' className='px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24'>
        <figure className='order-2 self-center lg:order-1' aria-label='An activity feed showing what each agent did this morning'>
          <div className='rounded-[1.75rem] bg-muted p-2.5 sm:p-3'>
            <div className='flex items-center justify-between px-3 pb-3 pt-1.5'>
              <span className='font-medium'>Activity</span>
              <span className='text-sm text-muted-foreground'>Today</span>
            </div>
            <ol className='space-y-2'>
              {feed.map(({ time, agent, action, color }) => (
                <li key={`${time}-${action}`} className='grid grid-cols-[3rem_1fr] gap-3 rounded-2xl bg-card px-4 py-3.5'>
                  <time className='text-sm tabular-nums text-muted-foreground'>{time}</time>
                  <div>
                    <p className='flex items-center gap-2 text-sm font-semibold'>
                      <span aria-hidden='true' className={`size-2 rounded-full ${color}`} />
                      {agent}
                    </p>
                    <p className='mt-0.5 text-sm text-muted-foreground'>{action}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </figure>
        <div className='order-1 lg:order-2'>
          <SectionIntro title='See what every agent did.'>
            Your agents work while you are busy. Genfleet keeps the record, so anyone on your team can check the work later.
          </SectionIntro>
          <CapabilityList items={capabilities} renderStatus={(status) => <StatusTag status={status} />} />
        </div>
      </div>
    </section>
  );
}
