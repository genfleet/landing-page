import { useState, type FormEvent, type ReactNode } from 'react';
import { NudgeArrow } from '@/components/nudge-arrow';
import { Button } from '@/shadcn/components/ui/button';
import { cn } from '@/shadcn/lib/utils';

// Every form on the site renders through Web3Form, so a new form is collected
// by Web3Forms (and lands in the same inbox) just by using this component.
// The production build refuses to run without the access key (see vite.config.ts).
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const accessKey = import.meta.env.VITE_PUBLIC_WEB3FORMS_ACCESS_KEY as string | undefined;

type Status = { state: 'idle' | 'sending' } | { state: 'sent' } | { state: 'failed'; message: string };

type Web3FormProps = {
  subject: string;
  submitLabel: string;
  successMessage: string;
  className?: string;
  submitClassName?: string;
  footnote?: string;
  children: ReactNode;
};

export function Web3Form({ subject, submitLabel, successMessage, className, submitClassName, footnote, children }: Web3FormProps) {
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ state: 'sending' });
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        setStatus({ state: 'failed', message: result.message || `The form service answered ${response.status}.` });
        return;
      }
      form.reset();
      setStatus({ state: 'sent' });
    } catch {
      setStatus({ state: 'failed', message: 'We could not reach the form service. Check your connection.' });
    }
  }

  if (status.state === 'sent') {
    return (
      <div role='status' className={cn('rounded-xl border border-input bg-background p-6 text-center', className)}>
        <p className='font-semibold'>Thank you, we have it.</p>
        <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{successMessage}</p>
      </div>
    );
  }

  const sending = status.state === 'sending';

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input type='hidden' name='access_key' value={accessKey ?? ''} />
      <input type='hidden' name='subject' value={subject} />
      <input type='hidden' name='from_name' value='Genfleet landing page' />
      {/* Honeypot: hidden from people, so a ticked box means a bot. Web3Forms drops those submissions. */}
      <input type='checkbox' name='botcheck' tabIndex={-1} autoComplete='off' aria-hidden='true' className='hidden' />

      {children}

      {!accessKey && (
        <p role='alert' className='rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive'>
          VITE_PUBLIC_WEB3FORMS_ACCESS_KEY is not set, so this form cannot be sent. Add it to your local .env.
        </p>
      )}

      <Button type='submit' disabled={!accessKey || sending} className={cn('h-12 w-full rounded-full text-base', submitClassName)}>
        {sending ? 'Sending…' : submitLabel}
        {!sending && <NudgeArrow />}
      </Button>

      {status.state === 'failed' && (
        <p role='alert' className='text-center text-sm text-destructive'>
          Your details were not sent: {status.message} Please try again.
        </p>
      )}

      {footnote && <p className='text-center text-xs leading-relaxed text-muted-foreground'>{footnote}</p>}
    </form>
  );
}
