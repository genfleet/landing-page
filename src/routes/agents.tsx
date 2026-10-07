import { createFileRoute, redirect } from '@tanstack/react-router';
import { showPreviewPages } from '@/config/features';
import { AgentDirectory } from '@/components/agents/AgentDirectory';
import { type AgentSort, parseList, sortOptions } from '@/components/agents/search';

export type AgentsSearch = {
  q?: string;
  sort?: AgentSort;
  fn?: string;
  works?: string;
  lang?: string;
};

export const Route = createFileRoute('/agents')({
  beforeLoad: () => {
    if (!showPreviewPages) throw redirect({ to: '/', replace: true });
  },
  // Filters live in the URL so a filtered view can be shared or linked to.
  validateSearch: (search: Record<string, unknown>): AgentsSearch => {
    const text = (value: unknown) => (typeof value === 'string' && value.trim() ? value : undefined);
    const sort = text(search.sort);
    return {
      q: text(search.q),
      sort: sortOptions.some((option) => option.value === sort) ? (sort as AgentSort) : undefined,
      fn: parseList(search.fn).join(',') || undefined,
      works: parseList(search.works).join(',') || undefined,
      lang: parseList(search.lang).join(',') || undefined,
    };
  },
  head: () => ({ meta: [{ title: 'Agents | Genfleet' }] }),
  component: AgentDirectory,
});
