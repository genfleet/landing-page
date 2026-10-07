import LogoSvg from '../assets/logo_svg';
import { cn } from '@/shadcn/lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return <LogoSvg className={cn('h-auto shrink-0 text-signal', className)} />;
}

export function Wordmark({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 font-display text-xl font-bold tracking-[-0.04em]', className)}>
      <LogoMark className={cn('w-7', markClassName)} />
      genfleet
    </span>
  );
}
