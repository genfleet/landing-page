import type { ComponentType } from 'react';
import { CalendarBlankIcon } from '@phosphor-icons/react/dist/csr/CalendarBlank';
import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/csr/EnvelopeSimple';
import { PlugsConnectedIcon } from '@phosphor-icons/react/dist/csr/PlugsConnected';
import { AddressBookIcon } from '@phosphor-icons/react/dist/csr/AddressBook';
import type { ConnectorKey } from '@/data/agents';
import { GithubLogo, JiraLogo, LinearLogo, SlackLogo } from './brand-logos';

export const connectors: Record<ConnectorKey, { label: string; icon: ComponentType<{ className?: string }> }> = {
  slack: { label: 'Slack', icon: SlackLogo },
  jira: { label: 'Jira', icon: JiraLogo },
  linear: { label: 'Linear', icon: LinearLogo },
  github: { label: 'GitHub', icon: GithubLogo },
  erp: { label: 'ERP', icon: PlugsConnectedIcon },
  crm: { label: 'CRM', icon: AddressBookIcon },
  email: { label: 'Email', icon: EnvelopeSimpleIcon },
  calendar: { label: 'Calendar', icon: CalendarBlankIcon },
};
