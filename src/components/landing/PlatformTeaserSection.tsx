import { Link } from '@tanstack/react-router';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { ArrowsSplitIcon } from '@phosphor-icons/react/dist/csr/ArrowsSplit';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { PlugsConnectedIcon } from '@phosphor-icons/react/dist/csr/PlugsConnected';
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/csr/ShieldCheck';

const pillars = [
  { title: 'Isolated by default', detail: 'Every agent in its own container, inside a workspace only your company can reach.', hash: 'security', icon: ShieldCheckIcon },
  { title: 'Connected to your systems', detail: 'Connectors bring your ERP, CRM, and inbox to the agents that need them.', hash: 'connectors', icon: PlugsConnectedIcon },
  { title: 'Every action on record', detail: 'Logs of every run and tool call, so your team can check the work.', hash: 'activity', icon: EyeIcon },
  { title: 'The right model for each task', detail: 'A model router between your agents and AI providers.', hash: 'models', icon: ArrowsSplitIcon },
] as const;

export function PlatformTeaserSection() {
  return (
    <section className='dark bg-background px-5 py-24 text-foreground sm:px-8 sm:py-32'>
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
          <h2 className='max-w-2xl text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>Stay in control as your agent team grows.</h2>
          <Link to='/platform' className='inline-flex items-center gap-2 self-start rounded-full py-2 font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:self-auto'>
            Explore the platform
            <ArrowRightIcon aria-hidden='true' className='size-4' />
          </Link>
        </div>
        <ul className='mt-14 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4'>
          {pillars.map(({ title, detail, hash, icon: Icon }) => (
            <li key={hash} className='border-b border-border lg:border-b-0 lg:border-r lg:last:border-r-0'>
              <Link to='/platform' hash={hash} className='group flex h-full flex-col p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:p-7'>
                <Icon aria-hidden='true' className='size-6 text-signal' />
                <h3 className='mt-10 text-lg font-semibold leading-snug group-hover:underline group-hover:underline-offset-4'>{title}</h3>
                <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{detail}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
