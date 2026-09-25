import { UserIcon } from '@phosphor-icons/react/dist/csr/User';
import { LogoMark } from '@/components/logo';

const steps = [
  { actor: 'Customer', text: '“My order was due Monday and it still has not arrived. What is going on?”', kind: 'customer' },
  { actor: 'Support agent', text: 'Looks up order 4821 in your ERP and sees the shipment is waiting on one back-ordered item.', kind: 'agent' },
  { actor: 'Support agent', text: 'Drafts a reply with the new delivery date and a discount on the next order, following your refund policy.', kind: 'agent' },
  { actor: 'Your team', text: 'Reads the draft, adjusts one sentence, and sends it. The whole exchange is in the activity log.', kind: 'human' },
] as const;

function Actor({ kind }: { kind: (typeof steps)[number]['kind'] }) {
  if (kind === 'agent') return <LogoMark className='w-7 text-agent-1' />;
  return (
    <span className={`flex size-7 items-center justify-center rounded-full ${kind === 'human' ? 'bg-human-fill text-white' : 'border border-foreground/30 text-foreground'}`}>
      <UserIcon aria-hidden='true' className='size-4' weight='bold' />
    </span>
  );
}

export function WorkedExampleSection() {
  return (
    <section className='bg-muted px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24'>
        <div>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>A late order, handled in minutes.</h2>
          <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>
            Here is what one support request looks like with a Genfleet agent connected to your order system. The agent does the digging, and your team keeps the final word.
          </p>
        </div>
        <ol className='relative space-y-2.5'>
          {steps.map(({ actor, text, kind }, index) => (
            <li key={index} className={`grid grid-cols-[1.75rem_1fr] gap-4 rounded-2xl bg-card p-5 ${kind === 'human' ? 'border-2 border-human-fill' : ''}`}>
              <Actor kind={kind} />
              <div>
                <p className={`text-sm font-semibold ${kind === 'human' ? 'text-human' : ''}`}>
                  <span className='sr-only'>Step {index + 1}: </span>
                  {actor}
                </p>
                <p className='mt-1 leading-relaxed text-muted-foreground'>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
