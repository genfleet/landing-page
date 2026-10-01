import { useId } from 'react';
import { InfoIcon } from '@phosphor-icons/react/dist/csr/Info';

// A small info button whose note shows on hover and on keyboard focus.
export function InfoTip({ label, children }: { label: string; children: string }) {
  const tooltipId = useId();
  return (
    <span className='group/tip relative inline-flex align-middle'>
      <button
        type='button'
        aria-label={label}
        aria-describedby={tooltipId}
        className='flex size-5 items-center justify-center rounded-full text-muted-foreground transition-colors duration-(--dur-quick) hover:text-foreground'
      >
        <InfoIcon aria-hidden='true' className='size-3.5' />
      </button>
      <span
        id={tooltipId}
        role='tooltip'
        className='pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg bg-primary px-3 py-2 text-left text-xs font-normal leading-relaxed text-primary-foreground opacity-0 transition-opacity duration-(--dur-quick) group-focus-within/tip:visible group-focus-within/tip:opacity-100 group-hover/tip:visible group-hover/tip:opacity-100'
      >
        {children}
      </span>
    </span>
  );
}
