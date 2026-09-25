import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';

type Listing = { category: string; name: string; kind: 'Agent' | 'Tool' | 'Connector' };

const defaultListings: Listing[] = [
  { category: 'Customer service', name: 'Inbox and response assistant', kind: 'Agent' },
  { category: 'Finance', name: 'Reporting and reconciliation assistant', kind: 'Agent' },
  { category: 'Engineering', name: 'Documentation and review assistant', kind: 'Agent' },
];

export function CatalogPreview({ listings = defaultListings }: { listings?: Listing[] }) {
  return (
    <div className='overflow-hidden rounded-[1.75rem] border border-border bg-card'>
      <div className='flex items-center gap-3 border-b border-border px-5 py-4 text-sm text-muted-foreground'>
        <MagnifyingGlassIcon aria-hidden='true' className='size-4' />
        Search agents, tools, and connectors
      </div>
      <ul className='divide-y divide-border px-5 sm:px-7'>
        {listings.map(({ category, name, kind }) => (
          <li key={name} className='grid gap-1 py-5 sm:grid-cols-[0.75fr_1.25fr_6rem] sm:items-center sm:gap-5'>
            <span className='text-sm font-medium text-muted-foreground'>{category}</span>
            <span className='font-medium'>{name}</span>
            <span className='text-sm text-muted-foreground sm:text-right'>{kind}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
