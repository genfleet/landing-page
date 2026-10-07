export type BillingInterval = 'monthly' | 'annual';
export type PricingFamily = 'developer' | 'standard' | 'enterprise';
export type DeveloperSupport = 'limited' | 'priority';
export type CustomerSupport =
  | 'none'
  | 'limited'
  | 'standard'
  | 'priority'
  | 'dedicated';
export type Connectors = '3' | 'unlimited';
export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  agents: number;
  family: PricingFamily;
  support: DeveloperSupport | CustomerSupport;
}

export interface StandardPricingPlan extends PricingPlan {
  startingCredits: number;
  connectors: Connectors;
}
export type PlanFeature = {
  text: string;
  // Extra detail behind an info button, and that button's accessible name.
  info?: string;
  infoLabel?: string;
};

export interface DeveloperPricingPlan extends PricingPlan {
  family: 'developer';
  // Local price for developers in Egypt, per month. Planned: per-region currencies
  // with exchange rates set from the admin dashboard, replacing this fixed field.
  monthlyPriceEGP: number;
  features: PlanFeature[];
  // Shown only with annual billing.
  annualFeatures?: PlanFeature[];
  // "Everything in <plan>, plus:" when this plan builds on another.
  includesPlan?: string;
  support: DeveloperSupport;
}

const developerPlans: DeveloperPricingPlan[] = [
  {
    id: 'developer-free',
    name: 'Free',
    monthlyPrice: 0,
    monthlyPriceEGP: 0,
    agents: 0,
    family: 'developer',
    support: 'limited',
    features: [
      {
        text: 'Create and publish agents to the marketplace',
        info: 'Every agent is reviewed by our internal developers before it is published, usually within 10 business days.',
        infoLabel: 'How publishing works',
      },
      { text: 'Limited developer Studio access' },
      { text: 'Build with the native Genfleet SDK' },
      { text: 'Developer community on Discord' },
    ],
  },
  {
    id: 'developer-pro',
    name: 'Pro',
    monthlyPrice: 10,
    monthlyPriceEGP: 550,
    agents: 0,
    family: 'developer',
    support: 'priority',
    includesPlan: 'Free',
    features: [
      { text: 'Priority review for your agents' },
      { text: 'Invitations to developer meetups' },
      { text: 'Membership in the developer program' },
    ],
    annualFeatures: [{ text: 'Genfleet swag, shipped within Egypt' }],
  },
];

const standardPlans: StandardPricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 25,
    agents: 5,
    startingCredits: 25,
    family: 'standard',
    support: 'limited',
    connectors: 'unlimited',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 50,
    agents: 10,
    startingCredits: 50,
    family: 'standard',
    support: 'standard',
    connectors: 'unlimited',
  },
  {
    id: 'max',
    name: 'Max',
    monthlyPrice: 80,
    agents: 20,
    startingCredits: 100,
    family: 'standard',
    support: 'priority',
    connectors: 'unlimited',
  },
];

export const pricingPlans: {
  developer: DeveloperPricingPlan[];
  standard: StandardPricingPlan[];
  enterprise: PricingPlan[];
} = {
  developer: developerPlans,
  standard: standardPlans,
  enterprise: [], // Enterprise plans are not defined in this snippet, but can be added here as needed.
  // enterprise: [
  //   {
  //     id: 'enterprise',
  //     name: 'Enterprise',
  //     monthlyPrice: 200,
  //     agents: 50,
  //     durationDays: 30,
  //     marketplace: true,
  //     startingCredits: 250,
  //     family: 'enterprise',
  //   },
  //   {
  //     id: 'enterprise-plus',
  //     name: 'Enterprise Plus',
  //     monthlyPrice: 300,
  //     agents: 100,
  //     durationDays: 30,
  //     marketplace: true,
  //     startingCredits: 500,
  //     family: 'enterprise',
  //   },
  //   {
  //     id: 'enterprise-elite',
  //     name: 'Enterprise Elite',
  //     monthlyPrice: 500,
  //     agents: 200,
  //     durationDays: 30,
  //     marketplace: true,
  //     startingCredits: 1000,
  //     family: 'enterprise',
  //   },
  // ],
};
