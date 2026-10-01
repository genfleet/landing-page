import { createFileRoute } from '@tanstack/react-router';
import { CtaBand } from '@/components/cta-band';
import { AgentTeamSection } from '@/components/landing/AgentTeamSection';
import { BusinessFunctionsSection } from '@/components/landing/BusinessFunctionsSection';
import { CustomizationSection } from '@/components/landing/CustomizationSection';
import { Hero } from '@/components/landing/Hero';
import { ConnectorsShowcaseSection } from '@/components/landing/ConnectorsShowcaseSection';
import { MarketplaceSection } from '@/components/landing/MarketplaceSection';
import { PlatformTeaserSection } from '@/components/landing/PlatformTeaserSection';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Genfleet | Your AI team, built around your business.' }] }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <BusinessFunctionsSection />
      <ConnectorsShowcaseSection />
      <AgentTeamSection />
      <PlatformTeaserSection />
      <CustomizationSection />
      <MarketplaceSection />
      <CtaBand />
    </>
  );
}
