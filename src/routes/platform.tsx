import { createFileRoute } from '@tanstack/react-router';
import { CtaBand } from '@/components/cta-band';
import { ConnectorsSection } from '@/components/platform/ConnectorsSection';
import { ModelsSection } from '@/components/platform/ModelsSection';
import { OversightSection } from '@/components/platform/OversightSection';
import { PlatformHeader } from '@/components/platform/PlatformHeader';
import { SectionNav } from '@/components/platform/SectionNav';
import { SecuritySection } from '@/components/platform/SecuritySection';
import { YourAgentsSection } from '@/components/platform/YourAgentsSection';

export const Route = createFileRoute('/platform')({
  head: () => ({ meta: [{ title: 'Platform | Genfleet' }] }),
  component: PlatformPage,
});

function PlatformPage() {
  return (
    <>
      <PlatformHeader />
      <SectionNav />
      <SecuritySection />
      <ConnectorsSection />
      <OversightSection />
      <ModelsSection />
      <YourAgentsSection />
      <CtaBand title='See the platform with your own work.' lead='We will walk you through isolation, connectors, and oversight using the processes your team actually runs.' />
    </>
  );
}
