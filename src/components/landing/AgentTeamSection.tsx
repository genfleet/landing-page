import { UserIcon } from '@phosphor-icons/react/dist/csr/User';
import { LogoMark } from '@/components/logo';

const workflow = [
  { agent: 'Research agent', task: 'Collects and organizes the information', color: 'text-agent-1' },
  { agent: 'Operations agent', task: 'Turns findings into an actionable plan', color: 'text-agent-2' },
  { agent: 'Communication agent', task: 'Prepares the team-ready output', color: 'text-agent-3' },
];

export function AgentTeamSection() {
  return (
    <section className='px-5 py-24 text-foreground sm:px-8 sm:py-32'>
      <div className='mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24'>
        <div>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>One goal. A team of specialized agents.</h2>
          <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>Give each agent a clear role, connect the handoffs, and keep human review where your business needs it.</p>
        </div>
        <div className='rounded-[1.75rem] bg-muted p-2.5 sm:p-3'>
          <div className='flex items-center justify-between px-3 pb-3 pt-1.5'>
            <span className='font-medium'>Quarterly planning team</span>
            <span className='text-sm text-muted-foreground'>3 agents, 1 reviewer</span>
          </div>
          <ol className='space-y-2'>
            {workflow.map(({ agent, task, color }) => (
              <li key={agent} className='grid grid-cols-[1.75rem_1fr] items-center gap-4 rounded-2xl bg-card px-4 py-4 sm:grid-cols-[1.75rem_0.8fr_1.2fr] sm:px-5'>
                <LogoMark className={`w-7 ${color}`} />
                <span className='font-medium'>{agent}</span>
                <span className='col-start-2 text-sm text-muted-foreground sm:col-start-auto'>{task}</span>
              </li>
            ))}
            <li className='grid grid-cols-[1.75rem_1fr] items-center gap-4 rounded-2xl border-2 border-human-fill bg-card px-4 py-4 sm:grid-cols-[1.75rem_0.8fr_1.2fr] sm:px-5'>
              <span className='flex size-7 items-center justify-center rounded-full bg-human-fill text-white'>
                <UserIcon aria-hidden='true' className='size-4' weight='bold' />
              </span>
              <span className='font-medium text-human'>Your team</span>
              <span className='col-start-2 text-sm text-muted-foreground sm:col-start-auto'>Reviews and approves the final plan</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
