import { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
import { FunnelSimpleIcon } from '@phosphor-icons/react/dist/csr/FunnelSimple';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import { LogoMark } from '@/components/logo';
import { connectors } from '@/components/marketplace/connectors';
import {
  agents,
  businessFunctions,
  connectorKeys,
  languages,
  type CatalogAgent,
} from '@/data/agents';
import { type AgentSort, parseList, sortOptions } from './search';

const route = getRouteApi('/agents');

type ListKey = 'fn' | 'works' | 'lang';

const functionLabel = Object.fromEntries(businessFunctions.map((item) => [item.slug, item.label])) as Record<string, string>;
const agentColors = ['text-agent-1', 'text-agent-2', 'text-agent-3'];

const formatRuns = (runs: number) => (runs >= 1000 ? `${(runs / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(runs));
const formatPrice = (price: number | null) => (price === null ? 'Included' : `$${price} / mo`);

function useFilters() {
  const search = route.useSearch();
  const navigate = route.useNavigate();

  const selected = {
    fn: parseList(search.fn),
    works: parseList(search.works),
    lang: parseList(search.lang),
  };

  const update = (patch: Partial<Record<ListKey | 'q', string | undefined>> & { sort?: AgentSort }) =>
    // Filtering is not a page change: no history entry, no scroll jump, no page transition.
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true, resetScroll: false, viewTransition: false });

  const toggle = (key: ListKey, value: string) => {
    const current = selected[key];
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    update({ [key]: next.join(',') || undefined });
  };

  const clearAll = () => update({ fn: undefined, works: undefined, lang: undefined, q: undefined });

  return { search, selected, update, toggle, clearAll };
}

function applyFilters(list: CatalogAgent[], query: string, selected: Record<ListKey, string[]>, sort: AgentSort) {
  const needle = query.trim().toLowerCase();
  const matches = list.filter((agent) => {
    // Within a group, any checked option matches; across groups, all must.
    if (selected.fn.length && !selected.fn.includes(agent.fn)) return false;
    if (selected.works.length && !selected.works.some((key) => agent.connectors.includes(key as never))) return false;
    if (selected.lang.length && !selected.lang.some((language) => agent.languages.includes(language as never))) return false;
    if (!needle) return true;
    return [agent.name, agent.description, agent.publisher, functionLabel[agent.fn]].some((field) => field.toLowerCase().includes(needle));
  });

  return [...matches].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'newest') return b.added.localeCompare(a.added);
    return b.runsPerMonth - a.runsPerMonth;
  });
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  idPrefix,
}: {
  title: string;
  options: Array<{ value: string; label: string; count: number; icon?: ComponentType<{ className?: string }> }>;
  selected: string[];
  onToggle: (value: string) => void;
  idPrefix: string;
}) {
  return (
    <fieldset>
      <legend className='mb-2 text-sm font-semibold'>{title}</legend>
      <ul className='space-y-0.5'>
        {options.map(({ value, label, count, icon: Icon }) => {
          const id = `${idPrefix}-${value}`;
          return (
            <li key={value}>
              <label htmlFor={id} className='flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors duration-(--dur-quick) hover:bg-muted'>
                <input
                  id={id}
                  type='checkbox'
                  checked={selected.includes(value)}
                  onChange={() => onToggle(value)}
                  className='size-4 shrink-0 cursor-pointer rounded accent-signal'
                />
                {Icon && <Icon aria-hidden='true' className='size-4 shrink-0' />}
                <span className='min-w-0 flex-1 truncate'>{label}</span>
                <span className='text-xs tabular-nums text-muted-foreground'>{count}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

function FilterPanel({ idPrefix }: { idPrefix: string }) {
  const { selected, toggle } = useFilters();
  const count = (predicate: (agent: CatalogAgent) => boolean) => agents.filter(predicate).length;

  return (
    <div className='space-y-7'>
      <FilterGroup
        title='Business function'
        idPrefix={`${idPrefix}-fn`}
        selected={selected.fn}
        onToggle={(value) => toggle('fn', value)}
        options={businessFunctions.map(({ slug, label }) => ({ value: slug, label, count: count((agent) => agent.fn === slug) }))}
      />
      <FilterGroup
        title='Works with'
        idPrefix={`${idPrefix}-works`}
        selected={selected.works}
        onToggle={(value) => toggle('works', value)}
        options={connectorKeys.map((key) => ({
          value: key,
          label: connectors[key].label,
          icon: connectors[key].icon,
          count: count((agent) => agent.connectors.includes(key)),
        }))}
      />
      <FilterGroup
        title='Language'
        idPrefix={`${idPrefix}-lang`}
        selected={selected.lang}
        onToggle={(value) => toggle('lang', value)}
        options={languages.map((language) => ({ value: language, label: language, count: count((agent) => agent.languages.includes(language)) }))}
      />
    </div>
  );
}

function AgentRow({ agent, index }: { agent: CatalogAgent; index: number }) {
  return (
    <li className='grid gap-x-5 gap-y-4 px-5 py-5 sm:px-6 lg:grid-cols-[1fr_auto]'>
      <div className='grid grid-cols-[2.25rem_1fr] gap-4'>
        <LogoMark className={`mt-0.5 w-9 ${agentColors[index % agentColors.length]}`} />
        <div className='min-w-0'>
          <h2 className='font-sans text-base font-semibold leading-snug'>
            {agent.name}
          </h2>
          <p className='mt-0.5 text-sm text-muted-foreground'>by {agent.publisher}</p>
          <p className='mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground'>{agent.description}</p>
          <div className='mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm'>
            <span className='rounded-full border border-border px-2.5 py-0.5 text-xs font-medium'>{functionLabel[agent.fn]}</span>
            {agent.connectors.length > 0 && (
              <span className='flex items-center gap-2' aria-label={`Works with ${agent.connectors.map((key) => connectors[key].label).join(', ')}`}>
                {agent.connectors.map((key) => {
                  const Icon = connectors[key].icon;
                  return <Icon key={key} aria-hidden='true' className='size-4 text-muted-foreground' />;
                })}
              </span>
            )}
            <span className='text-xs text-muted-foreground'>{agent.languages.join(', ')}</span>
          </div>
        </div>
      </div>
      <dl className='grid grid-cols-3 gap-4 pl-[3.25rem] text-sm lg:w-80 lg:pl-0 lg:text-right'>
        <div>
          <dt className='text-xs text-muted-foreground'>Runs / month</dt>
          <dd className='mt-0.5 font-medium tabular-nums'>{formatRuns(agent.runsPerMonth)}</dd>
        </div>
        <div>
          <dt className='text-xs text-muted-foreground'>Avg. response</dt>
          <dd className='mt-0.5 font-medium tabular-nums'>{agent.avgResponseSeconds.toFixed(1)}s</dd>
        </div>
        <div>
          <dt className='text-xs text-muted-foreground'>Price</dt>
          <dd className='mt-0.5 font-medium tabular-nums'>{formatPrice(agent.price)}</dd>
        </div>
      </dl>
    </li>
  );
}

export function AgentDirectory() {
  const { search, selected, update, toggle, clearAll } = useFilters();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const sort = search.sort ?? 'popular';
  // The box answers every keystroke; the URL catches up once typing pauses.
  const [query, setQuery] = useState(search.q ?? '');
  const [syncedQuery, setSyncedQuery] = useState(search.q ?? '');
  if ((search.q ?? '') !== syncedQuery) {
    setSyncedQuery(search.q ?? '');
    setQuery(search.q ?? '');
  }
  useEffect(() => {
    if (query === (search.q ?? '')) return;
    const timer = window.setTimeout(() => {
      setSyncedQuery(query);
      update({ q: query || undefined });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query, search.q, update]);

  const clearEverything = () => {
    setQuery('');
    clearAll();
  };

  const results = useMemo(
    () => applyFilters(agents, query, { fn: parseList(search.fn), works: parseList(search.works), lang: parseList(search.lang) }, sort),
    [query, search.fn, search.works, search.lang, sort],
  );

  const activeChips = [
    ...selected.fn.map((value) => ({ key: 'fn' as const, value, label: functionLabel[value] ?? value })),
    ...selected.works.map((value) => ({ key: 'works' as const, value, label: connectors[value as keyof typeof connectors]?.label ?? value })),
    ...selected.lang.map((value) => ({ key: 'lang' as const, value, label: value })),
  ];
  const activeCount = activeChips.length;

  // "/" jumps to search, as on most catalog sites.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.closest('input, textarea, select, [contenteditable="true"]');
      if (event.key === '/' && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className='px-5 pb-24 pt-32 sm:px-8 sm:pt-40'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>Agents</h1>
        <p className='mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground'>
          Specialists for every part of your business. Filter by the work you need done and the systems you already use.
        </p>

        <div className='mt-12 grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-10'>
          <aside className='hidden lg:block' aria-label='Filters'>
            <div className='sticky top-28'>
              <FilterPanel idPrefix='side' />
            </div>
          </aside>

          <div className='min-w-0'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <label className='relative flex-1'>
                <span className='sr-only'>Search agents</span>
                <MagnifyingGlassIcon aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                <input
                  ref={inputRef}
                  type='search'
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder='Search agents'
                  className='h-11 w-full rounded-full border border-input bg-card pl-11 pr-12 text-sm outline-none transition-[border-color,box-shadow] duration-(--dur-quick) placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/15'
                />
                <kbd className='pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border border-border px-1.5 text-xs text-muted-foreground sm:block'>/</kbd>
              </label>
              <label className='relative'>
                <span className='sr-only'>Sort agents</span>
                <select
                  value={sort}
                  onChange={(event) => {
                    const value = event.target.value as AgentSort;
                    update({ sort: value === 'popular' ? undefined : value });
                  }}
                  className='h-11 w-full appearance-none rounded-full border border-input bg-card pl-4 pr-10 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/15 sm:w-44'
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <CaretDownIcon aria-hidden='true' className='pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
              </label>
            </div>

            <details className='group mt-3 rounded-2xl border border-border lg:hidden'>
              <summary className='flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden'>
                <FunnelSimpleIcon aria-hidden='true' className='size-4' />
                Filters{activeCount > 0 && ` (${activeCount})`}
                <CaretDownIcon aria-hidden='true' className='ml-auto size-4 transition-transform duration-(--dur-standard) group-open:rotate-180' />
              </summary>
              <div className='border-t border-border p-4'>
                <FilterPanel idPrefix='sheet' />
              </div>
            </details>

            <div className='mt-5 flex min-h-8 flex-wrap items-center gap-2'>
              <p className='mr-2 text-sm text-muted-foreground' aria-live='polite'>
                {results.length} {results.length === 1 ? 'agent' : 'agents'}
              </p>
              {activeChips.map(({ key, value, label }) => (
                <button
                  key={`${key}-${value}`}
                  type='button'
                  onClick={() => toggle(key, value)}
                  className='inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm transition-colors duration-(--dur-quick) hover:bg-signal hover:text-white'
                  aria-label={`Remove filter ${label}`}
                >
                  {label}
                  <XIcon aria-hidden='true' className='size-3.5' />
                </button>
              ))}
              {(activeCount > 0 || query) && (
                <button type='button' onClick={clearEverything} className='rounded-full px-2 py-1 text-sm font-medium transition-colors duration-(--dur-quick) hover:text-signal'>
                  Clear all
                </button>
              )}
            </div>

            {results.length > 0 ? (
              <ul className='mt-4 divide-y divide-border overflow-hidden rounded-[1.75rem] border border-border bg-card'>
                {results.map((agent) => (
                  <AgentRow key={agent.id} agent={agent} index={agents.indexOf(agent)} />
                ))}
              </ul>
            ) : (
              <div className='mt-4 rounded-[1.75rem] border border-dashed border-border px-6 py-16 text-center'>
                <p className='font-semibold'>No agents match these filters.</p>
                <p className='mt-1 text-sm text-muted-foreground'>Try removing a filter or searching for something broader.</p>
                <button type='button' onClick={clearEverything} className='mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-(--dur-quick) hover:bg-signal hover:text-white'>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
