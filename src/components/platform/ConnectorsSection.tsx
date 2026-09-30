import { ArrowsClockwiseIcon } from '@phosphor-icons/react/dist/csr/ArrowsClockwise';
import { PlugsIcon } from '@phosphor-icons/react/dist/csr/Plugs';
import { WrenchIcon } from '@phosphor-icons/react/dist/csr/Wrench';
import { LogoMark } from '@/components/logo';
import { connectors } from '@/components/marketplace/connectors';
import { connectorKeys, type ConnectorKey } from '@/data/agents';
import { FeatureGrid, PlatformSection } from './shared';

const features = [
  { icon: PlugsIcon, title: 'Connect once', detail: 'Your company signs in to each system once. Every agent that needs it can use that connection.' },
  { icon: ArrowsClockwiseIcon, title: 'Disconnect anytime', detail: 'Remove a connection whenever you like, from the same place you added it.' },
  { icon: WrenchIcon, title: 'Custom connectors', detail: 'Running a system nobody else does? We build the connector with you during onboarding.' },
];

function Tile({ id }: { id: ConnectorKey }) {
  const { label, icon: Icon } = connectors[id];
  return (
    <li className='flex items-center gap-3 rounded-xl bg-card px-3.5 py-3'>
      <span className='flex size-8 items-center justify-center rounded-lg border border-border'>
        <Icon className='size-4' />
      </span>
      <span className='text-sm font-medium'>{label}</span>
    </li>
  );
}

// Genfleet in the middle, the systems it reaches around it.
function ConnectorHub() {
  const left = connectorKeys.slice(0, 4);
  const right = connectorKeys.slice(4);
  return (
    <figure aria-label='Genfleet connects your agents to Slack, Jira, Linear, GitHub, your ERP, CRM, email, and calendar' className='grid items-center gap-3 rounded-[1.75rem] bg-background p-3 sm:p-4 md:grid-cols-[1fr_auto_1fr]'>
      <ul className='grid grid-cols-2 gap-2 md:grid-cols-1'>{left.map((id) => <Tile key={id} id={id} />)}</ul>
      <div className='flex items-center justify-center gap-3 py-2 md:flex-col md:px-2'>
        <span aria-hidden='true' className='h-px w-10 bg-border md:h-10 md:w-px' />
        <span className='flex size-20 flex-col items-center justify-center gap-1 rounded-2xl bg-card ring-1 ring-foreground/80'>
          <LogoMark className='w-8' />
          <span className='text-[0.7rem] font-semibold'>Genfleet</span>
        </span>
        <span aria-hidden='true' className='h-px w-10 bg-border md:h-10 md:w-px' />
      </div>
      <ul className='grid grid-cols-2 gap-2 md:grid-cols-1'>{right.map((id) => <Tile key={id} id={id} />)}</ul>
    </figure>
  );
}

export function ConnectorsSection() {
  return (
    <PlatformSection
      id='connectors'
      tone='tint'
      title='Connected to the systems you run on.'
      lead='A connector brings a system’s tools to your agents, like reading a Slack channel, updating a Jira issue, or looking up an order in your ERP.'
    >
      <div className='grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16'>
        <ConnectorHub />
        <FeatureGrid items={features} className='sm:grid-cols-1' />
      </div>
    </PlatformSection>
  );
}
