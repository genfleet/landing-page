// Sample catalog for the agents page. Placeholder data until the marketplace API feeds it.

export const businessFunctions = [
  { slug: 'customer-service', label: 'Customer service' },
  { slug: 'sales', label: 'Sales' },
  { slug: 'finance', label: 'Finance' },
  { slug: 'human-resources', label: 'Human resources' },
  { slug: 'marketing', label: 'Marketing' },
  { slug: 'operations', label: 'Operations' },
  { slug: 'engineering', label: 'Engineering' },
  { slug: 'research', label: 'Research and analysis' },
] as const;

export type FunctionSlug = (typeof businessFunctions)[number]['slug'];

export const connectorKeys = ['slack', 'jira', 'linear', 'github', 'erp', 'crm', 'email', 'calendar'] as const;
export type ConnectorKey = (typeof connectorKeys)[number];

export const languages = ['English', 'Arabic', 'French'] as const;
export type Language = (typeof languages)[number];

export type CatalogAgent = {
  id: string;
  name: string;
  publisher: string;
  fn: FunctionSlug;
  description: string;
  connectors: ConnectorKey[];
  languages: Language[];
  runsPerMonth: number;
  avgResponseSeconds: number;
  price: number | null; // null: included in every plan
  added: string; // ISO date
};

export const agents: CatalogAgent[] = [
  { id: 'inbox-assistant', name: 'Inbox and response assistant', publisher: 'Genfleet', fn: 'customer-service', description: 'Answers routine customer questions and drafts replies for anything that needs a person.', connectors: ['email', 'slack'], languages: ['English', 'Arabic'], runsPerMonth: 18400, avgResponseSeconds: 1.8, price: null, added: '2026-08-02' },
  { id: 'order-status', name: 'Order status assistant', publisher: 'Genfleet', fn: 'customer-service', description: 'Looks up orders and shipments and tells customers exactly where things stand.', connectors: ['erp', 'email'], languages: ['English', 'Arabic'], runsPerMonth: 12100, avgResponseSeconds: 2.3, price: null, added: '2026-09-10' },
  { id: 'returns', name: 'Returns and refunds assistant', publisher: 'Harbor Labs', fn: 'customer-service', description: 'Checks return eligibility against your policy and prepares the refund for approval.', connectors: ['erp', 'email'], languages: ['English'], runsPerMonth: 6200, avgResponseSeconds: 2.6, price: 9, added: '2026-07-18' },
  { id: 'account-research', name: 'Account research assistant', publisher: 'Genfleet', fn: 'sales', description: 'Researches a company before a call and summarizes your history with them.', connectors: ['crm', 'email'], languages: ['English'], runsPerMonth: 9800, avgResponseSeconds: 3.4, price: null, added: '2026-06-30' },
  { id: 'follow-up-writer', name: 'Follow-up writer', publisher: 'Lumen Works', fn: 'sales', description: 'Turns meeting notes into tailored follow-up emails and next steps in your CRM.', connectors: ['crm', 'email', 'calendar'], languages: ['English', 'French'], runsPerMonth: 7400, avgResponseSeconds: 2.0, price: 12, added: '2026-09-01' },
  { id: 'meeting-scheduler', name: 'Meeting scheduler', publisher: 'Genfleet', fn: 'operations', description: 'Finds a time that works for everyone and sends the invites.', connectors: ['calendar', 'email', 'slack'], languages: ['English', 'Arabic', 'French'], runsPerMonth: 15300, avgResponseSeconds: 1.2, price: null, added: '2026-05-21' },
  { id: 'reconciliation', name: 'Reconciliation assistant', publisher: 'Genfleet', fn: 'finance', description: 'Matches invoices to payments and flags anything that does not add up.', connectors: ['erp'], languages: ['English'], runsPerMonth: 5600, avgResponseSeconds: 4.1, price: null, added: '2026-08-15' },
  { id: 'expense-reviewer', name: 'Expense reviewer', publisher: 'Ledgerline', fn: 'finance', description: 'Checks expense claims against your policy and routes exceptions to finance.', connectors: ['erp', 'email'], languages: ['English'], runsPerMonth: 3900, avgResponseSeconds: 2.9, price: 15, added: '2026-09-18' },
  { id: 'month-end', name: 'Month-end report builder', publisher: 'Genfleet', fn: 'finance', description: 'Pulls the month’s numbers together into a report your team can review.', connectors: ['erp', 'slack'], languages: ['English', 'Arabic'], runsPerMonth: 2800, avgResponseSeconds: 6.5, price: null, added: '2026-04-11' },
  { id: 'onboarding', name: 'Onboarding assistant', publisher: 'Genfleet', fn: 'human-resources', description: 'Walks new hires through their first weeks and answers their questions.', connectors: ['slack', 'calendar', 'email'], languages: ['English', 'Arabic'], runsPerMonth: 4700, avgResponseSeconds: 1.9, price: null, added: '2026-07-02' },
  { id: 'hr-policy', name: 'HR policy assistant', publisher: 'Harbor Labs', fn: 'human-resources', description: 'Answers questions about leave, benefits, and policies from your handbook.', connectors: ['slack'], languages: ['English'], runsPerMonth: 6900, avgResponseSeconds: 1.5, price: 6, added: '2026-06-09' },
  { id: 'campaign-drafter', name: 'Campaign drafter', publisher: 'Lumen Works', fn: 'marketing', description: 'Turns a brief into campaign drafts for email, social, and landing pages.', connectors: ['slack'], languages: ['English', 'French', 'Arabic'], runsPerMonth: 5200, avgResponseSeconds: 3.8, price: 12, added: '2026-08-27' },
  { id: 'content-repurposer', name: 'Content repurposer', publisher: 'Genfleet', fn: 'marketing', description: 'Turns one long piece into posts, summaries, and newsletter sections.', connectors: [], languages: ['English'], runsPerMonth: 3100, avgResponseSeconds: 3.0, price: null, added: '2026-09-20' },
  { id: 'issue-triage', name: 'Issue triage assistant', publisher: 'Genfleet', fn: 'engineering', description: 'Labels, deduplicates, and routes new issues to the right team.', connectors: ['jira', 'linear', 'github', 'slack'], languages: ['English'], runsPerMonth: 11200, avgResponseSeconds: 2.2, price: null, added: '2026-08-08' },
  { id: 'pr-reviewer', name: 'Pull request reviewer', publisher: 'Stackwise', fn: 'engineering', description: 'Reviews pull requests for bugs and style and leaves clear comments.', connectors: ['github'], languages: ['English'], runsPerMonth: 8700, avgResponseSeconds: 5.2, price: 19, added: '2026-07-25' },
  { id: 'release-notes', name: 'Release notes writer', publisher: 'Genfleet', fn: 'engineering', description: 'Writes release notes from merged work, in language customers understand.', connectors: ['github', 'linear', 'slack'], languages: ['English'], runsPerMonth: 2500, avgResponseSeconds: 3.3, price: null, added: '2026-09-05' },
  { id: 'supplier-comparison', name: 'Supplier comparison analyst', publisher: 'Genfleet', fn: 'research', description: 'Compares suppliers on price, terms, and delivery and recommends a shortlist.', connectors: [], languages: ['English', 'Arabic'], runsPerMonth: 3600, avgResponseSeconds: 7.8, price: null, added: '2026-06-17' },
  { id: 'market-brief', name: 'Market brief researcher', publisher: 'Stackwise', fn: 'research', description: 'Researches a market or competitor and writes a decision-ready brief.', connectors: ['slack'], languages: ['English'], runsPerMonth: 4400, avgResponseSeconds: 6.1, price: 9, added: '2026-09-14' },
];
