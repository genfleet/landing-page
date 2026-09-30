import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { CopyIcon } from '@phosphor-icons/react/dist/csr/Copy';
import { LogoMark } from '@/components/logo';
import { PlatformSection } from './shared';

// From the SDK README (sdk/README.md › Agent Skill).
const INSTALL_COMMAND = 'npx skills add genfleet/sdk';
const PROMPT = 'Convert my support agent to the Genfleet SDK';
// From the CLI README (cli/README.md): pushing submits the agent for review.
const PUBLISH_COMMANDS = ['gf login', 'gf agents push ./support-agent'];


function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type='button'
      onClick={() => navigator.clipboard?.writeText(text).then(() => setCopied(true))}
      aria-label={copied ? 'Copied' : 'Copy the install command'}
      className='inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-(--dur-quick) hover:bg-signal hover:text-white'
    >
      {copied ? <CheckIcon aria-hidden='true' className='size-4' weight='bold' /> : <CopyIcon aria-hidden='true' className='size-4' />}
    </button>
  );
}

function Terminal() {
  return (
    <figure aria-label='Install the genfleet-sdk skill, ask your coding agent to convert your agent, then sign in and push it for review' className='dark overflow-hidden rounded-[1.75rem] bg-band text-foreground'>
      <div className='flex items-center gap-1.5 border-b border-border px-5 py-3.5'>
        <span aria-hidden='true' className='size-2.5 rounded-full bg-foreground/20' />
        <span aria-hidden='true' className='size-2.5 rounded-full bg-foreground/20' />
        <span aria-hidden='true' className='size-2.5 rounded-full bg-foreground/20' />
        <span className='ml-3 text-xs text-muted-foreground'>Your coding agent</span>
      </div>
      <div className='space-y-5 p-5 font-mono text-sm sm:p-6'>
        <div>
          <p className='text-xs text-muted-foreground'>1. In your terminal</p>
          <div className='mt-2 flex items-center justify-between gap-3 rounded-xl bg-card px-4 py-2.5'>
            <code className='min-w-0 truncate'>
              <span className='text-signal'>$</span> {INSTALL_COMMAND}
            </code>
            <CopyButton text={INSTALL_COMMAND} />
          </div>
        </div>
        <div>
          <p className='text-xs text-muted-foreground'>2. Then ask your agent</p>
          <p className='mt-2 rounded-xl bg-card px-4 py-3'>
            <span className='text-signal'>›</span> {PROMPT}
          </p>
        </div>
        <div>
          <p className='text-xs text-muted-foreground'>3. Sign in and submit it for review</p>
          <div className='mt-2 space-y-1 rounded-xl bg-card px-4 py-3'>
            {PUBLISH_COMMANDS.map((command) => (
              <p key={command}>
                <span className='text-signal'>$</span> {command}
              </p>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}

const builderFields = [
  { label: 'Role', value: 'Answers questions about orders and returns' },
  { label: 'Model', value: 'Balanced model' },
  { label: 'Tools', value: 'ERP, Email' },
  { label: 'Knowledge', value: 'Return policy, Shipping FAQ' },
];

// What building an agent in the workspace looks like: a form, no code.
function BuilderCard() {
  return (
    <figure aria-label='Creating a custom agent in the Genfleet workspace by filling in its role, model, tools, and knowledge' className='rounded-[1.75rem] bg-card p-5 sm:p-6'>
      <div className='flex items-center gap-3'>
        <LogoMark className='w-8 text-agent-3' />
        <div>
          <p className='font-semibold'>New agent</p>
          <p className='text-sm text-muted-foreground'>Returns assistant</p>
        </div>
      </div>
      <dl className='mt-5 divide-y divide-border rounded-xl border border-border'>
        {builderFields.map(({ label, value }) => (
          <div key={label} className='grid grid-cols-[6rem_1fr] gap-3 px-4 py-3 text-sm'>
            <dt className='text-muted-foreground'>{label}</dt>
            <dd className='font-medium'>{value}</dd>
          </div>
        ))}
      </dl>
      <div className='mt-4 flex justify-end'>
        <span className='rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground'>Create agent</span>
      </div>
    </figure>
  );
}

// One way to get an agent: the explanation on the left, what it looks like on the right.
function Path({ title, detail, children }: { title: string; detail: string; children: ReactNode }) {
  return (
    <div className='grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16'>
      <div>
        <h3 className='text-2xl font-semibold'>{title}</h3>
        <p className='mt-3 max-w-md leading-relaxed text-muted-foreground'>{detail}</p>
      </div>
      {children}
    </div>
  );
}

export function YourAgentsSection() {
  return (
    <PlatformSection
      id='your-agents'
      tone='tint'
      title='Build your own agents.'
      lead='Create a custom agent right in your workspace, or bring one your team has already built. Either way it runs with its own sandbox, connectors, oversight, and the model router.'
    >
      <div className='space-y-16 lg:space-y-20'>
        <Path
          title='Build it in your workspace'
          detail='No code needed. Give the agent a role, choose its model, and add the tools and company knowledge it should use.'
        >
          <BuilderCard />
        </Path>
        <Path
          title='Convert one you already have'
          detail='Add the genfleet-sdk skill to your favorite coding agent, like Claude Code, Cursor, or Codex, and ask it to convert your agent. Then push it to Genfleet for review.'
        >
          <Terminal />
        </Path>
      </div>
    </PlatformSection>
  );
}
