import { cn } from '@/shadcn/lib/utils';

type Status = 'available' | 'rolling-out' | 'coming-soon';

const labels: Record<Status, string> = {
  available: 'Available',
  'rolling-out': 'Rolling out',
  'coming-soon': 'Coming soon',
};

// State is always written out; the dot only reinforces it.
export function StatusTag({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground', className)}>
      <span
        aria-hidden='true'
        className={cn('size-1.5 rounded-full', status === 'available' ? 'bg-foreground' : status === 'rolling-out' ? 'bg-signal' : 'border border-current')}
      />
      {labels[status]}
    </span>
  );
}
