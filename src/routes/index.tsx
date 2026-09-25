import { createFileRoute } from '@tanstack/react-router';
import { CtaBand } from '@/components/cta-band';
import { AgentTeamSection } from '@/components/landing/AgentTeamSection';
import { BusinessFunctionsSection } from '@/components/landing/BusinessFunctionsSection';
import { CustomizationSection } from '@/components/landing/CustomizationSection';
import { Hero } from '@/components/landing/Hero';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { MarketplaceSection } from '@/components/landing/MarketplaceSection';
import { PlatformTeaserSection } from '@/components/landing/PlatformTeaserSection';
import { WorkedExampleSection } from '@/components/landing/WorkedExampleSection';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Genfleet | Your AI team, built around your business.' }] }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <BusinessFunctionsSection />
      <HowItWorksSection />
      <WorkedExampleSection />
      <AgentTeamSection />
      <PlatformTeaserSection />
      <CustomizationSection />
      <MarketplaceSection />
      <CtaBand />
    </>
  );
}
