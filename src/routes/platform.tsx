import { createFileRoute } from '@tanstack/react-router';
import { CtaBand } from '@/components/cta-band';
import { PageHeader } from '@/components/page-header';
import { ActivitySection } from '@/components/platform/ActivitySection';
import { ConnectorsSection } from '@/components/platform/ConnectorsSection';
import { ModelRoutingSection } from '@/components/platform/ModelRoutingSection';
import { SecuritySection } from '@/components/platform/SecuritySection';

export const Route = createFileRoute('/platform')({
  head: () => ({ meta: [{ title: 'Platform | Genfleet' }] }),
  component: PlatformPage,
});

function PlatformPage() {
  return (
    <>
      <PageHeader
        title='The platform your AI team runs on.'
        lead='Genfleet runs, connects, and watches over every agent in your workspace, so you can hand work to agents without handing over control.'
      />
      <SecuritySection />
      <ConnectorsSection />
      <ActivitySection />
      <ModelRoutingSection />
      <CtaBand title='See the platform with your own work.' lead='We will walk you through security, connectors, and activity using the processes your team actually runs.' />
    </>
  );
}
