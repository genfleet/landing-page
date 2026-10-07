import { Link } from '@tanstack/react-router';
import { NudgeArrow } from '@/components/nudge-arrow';
import { BriefcaseIcon } from '@phosphor-icons/react/dist/csr/Briefcase';
import { CodeIcon } from '@phosphor-icons/react/dist/csr/Code';
import { CurrencyDollarIcon } from '@phosphor-icons/react/dist/csr/CurrencyDollar';
import { GearSixIcon } from '@phosphor-icons/react/dist/csr/GearSix';
import { HeadsetIcon } from '@phosphor-icons/react/dist/csr/Headset';
import { LinkIcon } from '@phosphor-icons/react/dist/csr/Link';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
import { UsersThreeIcon } from '@phosphor-icons/react/dist/csr/UsersThree';
import { Button } from '@/shadcn/components/ui/button';
import { showPreviewPages } from '@/config/features';

export function Hero() {
  return (
    <section id='top' className='px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40'>
      <div className='mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20'>
        <div>
          <p className='mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground'>
            <span
              className='size-2 rounded-full bg-signal'
              aria-hidden='true'
            />
            Private beta
          </p>
          <h1 className='text-balance text-[clamp(2.75rem,5.8vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.035em]'>
            Your <span className='text-signal'>AI team,</span>
            <br />
            built around your business.
          </h1>
          <p className='mt-8 max-w-[36rem] text-lg leading-relaxed text-muted-foreground sm:text-xl'>
            Find specialized agents, connect them to the tools your company
            uses, and bring them together as a team that works the way your
            company does.
          </p>
          <div className='mt-10 flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Button
              asChild
              size='lg'
              className='h-12 rounded-full px-7 text-base hover:bg-signal hover:text-white active:bg-signal active:text-white data-[status=active]:bg-signal data-[status=active]:text-white'
            >
              <Link to='/demo'>
                Request a demo
                <NudgeArrow />
              </Link>
            </Button>
            {showPreviewPages && (
              <Button
                asChild
                size='lg'
                variant='outline'
                className='h-12 rounded-full border-foreground/20 bg-transparent px-7 text-base'
              >
                <Link to='/agents'>Explore agents</Link>
              </Button>
            )}
          </div>
        </div>

        <AgentWorkspacePreview />
      </div>
    </section>
  );
}

function AgentWorkspacePreview() {
  const stages = [
    {
      label: 'Browse specialists',
      detail: 'Sales · Finance · Support',
      icon: MagnifyingGlassIcon,
    },
    {
      label: 'Connect your tools',
      detail: 'Choose data and access',
      icon: LinkIcon,
    },
    {
      label: 'Assemble a team',
      detail: 'Set roles and handoffs',
      icon: UsersThreeIcon,
    },
  ];
  const selectedAgents = [
    { label: 'Engineering agent', icon: CodeIcon, color: 'text-foreground' },
    {
      label: 'Customer service agent',
      icon: HeadsetIcon,
      color: 'text-foreground',
    },
    {
      label: 'Finance agent',
      icon: CurrencyDollarIcon,
      color: 'text-foreground',
    },
    { label: 'Operations agent', icon: GearSixIcon, color: 'text-foreground' },
  ];

  return (
    <figure
      className='mx-auto w-full max-w-xl'
      aria-label='Building an AI team with Genfleet'
    >
      <div className='overflow-hidden rounded-2xl border border-border bg-card'>
        <div className='flex items-center justify-between border-b border-border px-5 py-4'>
          <div className='flex items-center gap-2 text-sm font-medium'>
            <BriefcaseIcon aria-hidden='true' className='size-4 text-brand' />
            Your Genfleet workspace
          </div>
          <span className='rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground'>
            Team setup
          </span>
        </div>
        <div className='p-5 sm:p-7'>
          <div className='space-y-3'>
            {stages.map(({ label, detail, icon: Icon }, index) => (
              <div
                key={label}
                className='group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0'
              >
                <div className='flex size-9 items-center justify-center rounded-full border border-border text-brand transition-colors duration-200 group-hover:border-signal group-hover:bg-signal group-hover:text-white'>
                  <Icon aria-hidden='true' className='size-4' />
                </div>
                <div className='min-w-0'>
                  <div className='text-sm font-medium'>{label}</div>
                  <div className='mt-0.5 truncate text-xs text-muted-foreground'>
                    {detail}
                  </div>
                </div>
                <span className='text-xs text-muted-foreground'>
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
          <div className='mt-6 rounded-xl border border-border bg-muted p-5 text-foreground'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <div className='text-sm font-semibold'>Your AI team</div>
                <div className='mt-1 text-xs text-muted-foreground'>
                  Connected and ready to work
                </div>
              </div>
              <div
                className='flex -space-x-2'
                aria-label='Four agents selected'
              >
                {selectedAgents.map(({ label, icon: Icon, color }) => (
                  <span
                    key={label}
                    title={label}
                    className={`relative flex size-9 items-center justify-center rounded-full border border-border bg-background hover:z-10 hover:border-signal hover:bg-signal hover:text-white ${color}`}
                  >
                    <Icon aria-hidden='true' className='size-4' weight='bold' />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
