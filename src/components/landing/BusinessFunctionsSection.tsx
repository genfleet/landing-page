import { Link } from '@tanstack/react-router';
import { NudgeArrow } from '@/components/nudge-arrow';
import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus';
import { ChartLineUpIcon } from '@phosphor-icons/react/dist/csr/ChartLineUp';
import { CodeIcon } from '@phosphor-icons/react/dist/csr/Code';
import { CurrencyDollarIcon } from '@phosphor-icons/react/dist/csr/CurrencyDollar';
import { GearSixIcon } from '@phosphor-icons/react/dist/csr/GearSix';
import { HeadsetIcon } from '@phosphor-icons/react/dist/csr/Headset';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
import { MegaphoneIcon } from '@phosphor-icons/react/dist/csr/Megaphone';
import { UsersFourIcon } from '@phosphor-icons/react/dist/csr/UsersFour';

const businessFunctions = [
  { label: 'Engineering', slug: 'engineering', description: 'Support planning, documentation, reviews, and recurring technical work.', icon: CodeIcon },
  { label: 'Customer service', slug: 'customer-service', description: 'Help teams respond, summarize conversations, and resolve routine requests.', icon: HeadsetIcon },
  { label: 'Finance', slug: 'finance', description: 'Organize reporting, review information, and prepare recurring financial workflows.', icon: CurrencyDollarIcon },
  { label: 'Human resources', slug: 'human-resources', description: 'Coordinate onboarding, answer internal questions, and support people operations.', icon: UsersFourIcon },
  { label: 'Sales', slug: 'sales', description: 'Research accounts, prepare follow-ups, and keep opportunities moving.', icon: ChartLineUpIcon },
  { label: 'Marketing', slug: 'marketing', description: 'Turn research and briefs into campaigns, drafts, and reusable content.', icon: MegaphoneIcon },
  { label: 'Operations', slug: 'operations', description: 'Coordinate recurring work, track handoffs, and keep processes moving.', icon: GearSixIcon },
  { label: 'Research and analysis', slug: 'research', description: 'Gather information, compare options, and prepare decision-ready findings.', icon: MagnifyingGlassIcon },
];

export function BusinessFunctionsSection() {
  return (
    <section id='agents' className='bg-muted px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20'>
          <div>
            <h2 className='max-w-lg text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>Specialized help across your entire business.</h2>
            <p className='mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground'>Find agents for individual tasks or combine specialists into a team that works across functions.</p>
          </div>
          <div>
            <ul className='grid border-t border-border sm:grid-cols-2'>
              {businessFunctions.map(({ label, slug, description, icon: Icon }, index) => (
                <li key={label} className={`border-b border-border ${index % 2 === 0 ? 'sm:border-r' : ''}`}>
                  <Link
                    to='/agents'
                    search={{ fn: slug }}
                    className='group grid h-full grid-cols-[auto_1fr] gap-4 py-6 sm:p-6'
                  >
                    <Icon
                      aria-hidden='true'
                      className='mt-0.5 size-5 text-foreground transition-colors duration-300 group-hover:animate-[icon-nudge_400ms_var(--ease-glide)_forwards] group-hover:text-signal group-focus-visible:text-signal'
                    />
                    <span>
                      <span className='block font-semibold transition-colors duration-300 group-hover:text-signal group-focus-visible:text-signal'>{label}</span>
                      <span className='mt-2 block text-sm leading-relaxed text-muted-foreground'>{description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className='flex flex-col gap-3 border-b border-border py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
              <p className='flex items-center gap-3 text-sm text-muted-foreground'>
                <PlusIcon aria-hidden='true' className='size-5 text-foreground' />
                And more
              </p>
              <Link to='/agents' className='group inline-flex items-center gap-2 self-start rounded-full py-1 text-sm font-medium transition-colors duration-200 hover:text-signal sm:self-auto'>
                Browse all agents
                <NudgeArrow className='size-4' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
