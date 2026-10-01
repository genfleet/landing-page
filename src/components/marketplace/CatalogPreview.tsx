import { useState } from 'react';
import { AddressBookIcon } from '@phosphor-icons/react/dist/csr/AddressBook';
import { CalendarBlankIcon } from '@phosphor-icons/react/dist/csr/CalendarBlank';
import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/csr/EnvelopeSimple';
import { FilePdfIcon } from '@phosphor-icons/react/dist/csr/FilePdf';
import { GlobeIcon } from '@phosphor-icons/react/dist/csr/Globe';
import { PlugsConnectedIcon } from '@phosphor-icons/react/dist/csr/PlugsConnected';
import { SealCheckIcon } from '@phosphor-icons/react/dist/csr/SealCheck';
import { TableIcon } from '@phosphor-icons/react/dist/csr/Table';
import { TranslateIcon } from '@phosphor-icons/react/dist/csr/Translate';
import type { ComponentType } from 'react';
import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus';
import { LogoMark } from '@/components/logo';
import { GithubLogo, JiraLogo, LinearLogo, SlackLogo } from './brand-logos';

type Kind = 'Agent' | 'Tool' | 'Connector';

type Listing = {
  name: string;
  category: string;
  detail: string;
  kind: Kind;
  // Agents show the agent mark in their color; tools and connectors show an icon.
  color?: string;
  icon?: ComponentType<{ className?: string }>;
  // Brand marks keep their own colors.
  brand?: boolean;
};

const catalog: Listing[] = [
  { name: 'Inbox and response assistant', category: 'Customer service', detail: 'Answers routine questions and drafts replies for review.', kind: 'Agent', color: 'text-agent-1' },
  { name: 'Account research assistant', category: 'Sales', detail: 'Researches accounts and prepares follow-ups.', kind: 'Agent', color: 'text-agent-3' },
  { name: 'Reconciliation assistant', category: 'Finance', detail: 'Matches invoices to payments and flags gaps.', kind: 'Agent', color: 'text-agent-2' },
  { name: 'Onboarding assistant', category: 'Human resources', detail: 'Walks new hires through their first weeks.', kind: 'Agent', color: 'text-agent-1' },
  { name: 'Slack', category: 'Communication', detail: 'Read channels and post updates where your team works.', kind: 'Connector', icon: SlackLogo, brand: true },
  { name: 'Jira', category: 'Engineering', detail: 'Create, update, and triage issues and sprints.', kind: 'Connector', icon: JiraLogo, brand: true },
  { name: 'Linear', category: 'Engineering', detail: 'Track issues, projects, and cycles.', kind: 'Connector', icon: LinearLogo, brand: true },
  { name: 'GitHub', category: 'Engineering', detail: 'Read repositories, issues, and pull requests.', kind: 'Connector', icon: GithubLogo, brand: true },
  { name: 'ERP connector', category: 'Operations', detail: 'Orders, stock, and quotations from your ERP.', kind: 'Connector', icon: PlugsConnectedIcon },
  { name: 'Email inbox', category: 'Communication', detail: 'Read and send email from a shared address.', kind: 'Connector', icon: EnvelopeSimpleIcon },
  { name: 'CRM connector', category: 'Sales', detail: 'Accounts, contacts, and deals from your CRM.', kind: 'Connector', icon: AddressBookIcon },
  { name: 'Calendar', category: 'Operations', detail: 'Check availability and book meetings.', kind: 'Connector', icon: CalendarBlankIcon },
  { name: 'Web research', category: 'Research and analysis', detail: 'Search the web and summarize what it finds.', kind: 'Tool', icon: GlobeIcon },
  { name: 'Spreadsheet reader', category: 'Operations', detail: 'Read and analyze uploaded spreadsheets.', kind: 'Tool', icon: TableIcon },
  { name: 'Document reader', category: 'Finance', detail: 'Pull the key details out of invoices and contracts.', kind: 'Tool', icon: FilePdfIcon },
  { name: 'Translation', category: 'Customer service', detail: 'Translate messages and replies between languages.', kind: 'Tool', icon: TranslateIcon },
];

const filters = ['Agent', 'Tool', 'Connector'] as const;
type Filter = (typeof filters)[number];
const filterLabel: Record<Filter, string> = { Agent: 'Agents', Tool: 'Tools', Connector: 'Connectors' };

export function CatalogPreview({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<Filter>('Agent');
  const shownCount = Math.min(catalog.filter((item) => item.kind === filter).length, limit ?? Infinity);

  return (
    <div className='rounded-[1.75rem] bg-muted p-2.5 sm:p-3'>
      <div className='flex flex-wrap gap-1.5 p-1.5' role='group' aria-label='Filter the catalog'>
        {filters.map((value) => {
          const selected = value === filter;
          return (
            <button
              key={value}
              type='button'
              aria-pressed={selected}
              onClick={() => setFilter(value)}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${selected ? 'bg-signal text-white' : 'bg-card text-muted-foreground hover:text-foreground'}`}
            >
              {filterLabel[value]}
            </button>
          );
        })}
      </div>

      <p className='sr-only' aria-live='polite'>{`Showing ${shownCount} ${filterLabel[filter].toLowerCase()}`}</p>

      {/* Every filter's grid shares one cell, so the card keeps its height and switching crossfades. */}
      <div className='mt-1.5 grid'>
        {filters.map((value) => {
          const selected = value === filter;
          const items = catalog.filter((item) => item.kind === value);
          return (
            <ul
              key={value}
              aria-hidden={!selected}
              inert={!selected}
              className={`grid gap-2 [grid-area:1/1] transition-opacity sm:grid-cols-2 ${selected ? 'opacity-100 duration-500 ease-[var(--ease-glide)]' : 'pointer-events-none opacity-0 duration-200 ease-in'}`}
            >
              {(limit ? items.slice(0, limit) : items).map(({ name, category, detail, color, icon: ItemIcon, brand }) => (
                <li key={name} className='flex flex-col rounded-2xl bg-card p-4 sm:p-5'>
                  {ItemIcon ? (
                    <span className='flex size-8 items-center justify-center rounded-lg border border-border'>
                      <ItemIcon aria-hidden='true' className={brand ? 'size-[1.125rem]' : 'size-4'} />
                    </span>
                  ) : (
                    <LogoMark className={`w-8 ${color}`} />
                  )}
                  <p className='mt-5 font-semibold leading-snug'>{name}</p>
                  <p className='mt-0.5 text-sm text-muted-foreground'>{category}</p>
                  <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>{detail}</p>
                </li>
              ))}
              <li className='sm:col-span-2'>
                <p className='flex items-center gap-3 rounded-2xl bg-card px-4 py-4 font-semibold sm:px-5'>
                  <PlusIcon aria-hidden='true' className='size-5' />
                  And more
                </p>
              </li>
            </ul>
          );
        })}
      </div>

      <p className='flex items-center gap-2 px-2.5 pb-1 pt-3.5 text-sm text-muted-foreground'>
        <SealCheckIcon aria-hidden='true' className='size-4 text-foreground' />
        Every listing is reviewed by Genfleet before it is published
      </p>
    </div>
  );
}
