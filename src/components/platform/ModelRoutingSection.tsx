import { StatusTag } from '@/components/status-tag';
import { SectionIntro } from './SectionIntro';

const modes = [
  {
    title: 'Pick a model',
    detail: 'Pin each agent to a specific model. Its behavior stays predictable, and switching later is a setting, not a rebuild.',
  },
  {
    title: 'Smart routing',
    detail: 'Let the router choose for each request, weighing how hard the task is, the capabilities it needs, provider health, speed, and cost, within the limits you set.',
  },
];

const extras = [
  { title: 'Bring your own keys', detail: 'Use your company’s own model provider keys on every plan, or let us manage them for an extra charge.', status: 'available' as const },
  { title: 'Automatic fallback', detail: 'If a provider slows down or goes offline, requests move to a healthy one.', status: 'coming-soon' as const },
  { title: 'Budgets and usage per agent', detail: 'Set spending limits and see what each agent costs, by model.', status: 'coming-soon' as const },
];

export function ModelRoutingSection() {
  return (
    <section id='models' className='dark bg-background px-5 py-24 text-foreground sm:px-8 sm:py-32'>
      <div className='mx-auto max-w-7xl'>
        <SectionIntro title='The right model for every task.'>
          Your agents should not care which AI provider answers them. The Genfleet model router sits in between, so you can change models without changing agents.
        </SectionIntro>

        <div className='mt-14 grid gap-2.5 md:grid-cols-2'>
          {modes.map(({ title, detail }) => (
            <article key={title} className='rounded-[1.75rem] border border-border bg-card p-6 sm:p-8'>
              <div className='flex items-start justify-between gap-4'>
                <h3 className='font-display text-2xl font-bold tracking-[-0.02em]'>{title}</h3>
                <StatusTag status='coming-soon' />
              </div>
              <p className='mt-3 leading-relaxed text-muted-foreground'>{detail}</p>
            </article>
          ))}
        </div>

        <ul className='mt-2.5 grid gap-2.5 md:grid-cols-3'>
          {extras.map(({ title, detail, status }) => (
            <li key={title} className='flex flex-col rounded-[1.75rem] border border-border p-6'>
              <StatusTag status={status} className='self-start' />
              <h3 className='mt-6 font-semibold'>{title}</h3>
              <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>{detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
