import { ArrowsSplitIcon } from '@phosphor-icons/react/dist/csr/ArrowsSplit';
import { CloudIcon } from '@phosphor-icons/react/dist/csr/Cloud';
import { DatabaseIcon } from '@phosphor-icons/react/dist/csr/Database';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { PlugsConnectedIcon } from '@phosphor-icons/react/dist/csr/PlugsConnected';
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/csr/ShieldCheck';
import { LogoMark } from '@/components/logo';

const layers = [
  { id: 'security', label: 'Isolation', detail: 'Own sandbox per agent', icon: ShieldCheckIcon },
  { id: 'connectors', label: 'Connectors', detail: 'Your systems, connected once', icon: PlugsConnectedIcon },
  { id: 'oversight', label: 'Oversight', detail: 'Every run on record', icon: EyeIcon },
  { id: 'models', label: 'Model router', detail: 'The right model per task', icon: ArrowsSplitIcon },
];

function Rail() {
  return <span aria-hidden='true' className='mx-auto block h-5 w-px bg-border' />;
}

// The stack in one picture: your agents on top, Genfleet in the middle, and the
// systems and providers it reaches underneath. Each layer jumps to its section.
function StackDiagram() {
  return (
    <figure aria-label='Your agents run on Genfleet, which connects them to your systems and to AI providers' className='rounded-[1.75rem] bg-card p-3 sm:p-4'>
      <div className='flex items-center justify-between rounded-2xl border border-border px-4 py-3'>
        <span className='text-sm font-semibold'>Your agents</span>
        <span className='flex gap-1.5'>
          {['text-agent-1', 'text-agent-2', 'text-agent-3'].map((color) => (
            <LogoMark key={color} className={`w-6 ${color}`} />
          ))}
        </span>
      </div>
      <Rail />
      <div className='rounded-2xl bg-muted p-2'>
        <p className='px-2 pb-2 pt-1 text-xs font-semibold text-muted-foreground'>Genfleet</p>
        <ul className='grid grid-cols-2 gap-2'>
          {layers.map(({ id, label, detail, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className='group flex h-full flex-col rounded-xl bg-card p-3.5 transition-colors duration-(--dur-quick) hover:bg-signal hover:text-white'
              >
                <Icon aria-hidden='true' className='size-5 text-signal transition-colors duration-(--dur-quick) group-hover:text-white' />
                <span className='mt-5 text-sm font-semibold'>{label}</span>
                <span className='mt-0.5 text-xs text-muted-foreground transition-colors duration-(--dur-quick) group-hover:text-white/85'>{detail}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {[
          { label: 'Your systems', icon: DatabaseIcon },
          { label: 'AI providers', icon: CloudIcon },
        ].map(({ label, icon: Icon }) => (
          <div key={label}>
            <Rail />
            <div className='flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-semibold'>
              <Icon aria-hidden='true' className='size-4 text-muted-foreground' />
              {label}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function PlatformHeader() {
  return (
    <section className='px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40'>
      <div className='mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20'>
        <div>
          <h1 className='text-balance text-[clamp(2.6rem,5.4vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em]'>
            The platform your AI team runs on.
          </h1>
          <p className='mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl'>
            Genfleet runs every agent in isolation, connects it to the systems your business already uses, keeps a record of its work, and routes each request to the right model.
          </p>
        </div>
        <StackDiagram />
      </div>
    </section>
  );
}
