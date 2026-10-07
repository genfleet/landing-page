import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { cn } from '@/shadcn/lib/utils';

// Slides right when its `group` parent (a button or link) is hovered or focused.
export function NudgeArrow({ className }: { className?: string }) {
  return (
    <ArrowRightIcon
      aria-hidden='true'
      className={cn('transition-transform duration-(--dur-standard) ease-[var(--ease-glide)] group-hover:translate-x-1 group-focus-visible:translate-x-1', className)}
    />
  );
}
