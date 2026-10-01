import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { NudgeArrow } from '@/components/nudge-arrow';
import { pricingPlans, type BillingInterval } from '@/data/pricing';
import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
import { Label } from '@/shadcn/components/ui/label';
import { Textarea } from '@/shadcn/components/ui/textarea';

const selectClassName =
  'h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 text-sm text-foreground outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

const perks = [
  'Build with the native Genfleet SDK',
  'Publish agents to the marketplace',
  'Join the developer community on Discord',
];

type WaitlistSectionProps = {
  selectedPlan: string;
  selectedBilling: BillingInterval;
};

export function WaitlistSection({ selectedPlan, selectedBilling }: WaitlistSectionProps) {
  const accessKey = import.meta.env.VITE_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const plans = pricingPlans.developer;
  const defaultPlan = plans.some((plan) => plan.id === selectedPlan) ? selectedPlan : plans[0].id;

  return (
    <section className='px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44'>
      <div className='mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24'>
        <div>
          <h1 className='text-[clamp(2.6rem,5.4vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em]'>Build agents for Genfleet.</h1>
          <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>
            Developer plans open in waves. Join the waitlist and we will email you when your spot is ready.
          </p>
          <ul className='mt-9 space-y-4 text-muted-foreground'>
            {perks.map((perk) => (
              <li key={perk} className='flex items-center gap-3'>
                <span className='flex size-5 items-center justify-center rounded-full bg-foreground text-background'>
                  <CheckIcon aria-hidden='true' className='size-3' weight='bold' />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className='rounded-[1.75rem] bg-card p-5 sm:p-8'>
          <h2 className='text-2xl font-semibold tracking-tight'>Join the developer waitlist</h2>
          <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>Tell us a little about what you want to build.</p>

          <form action='https://api.web3forms.com/submit' method='POST' className='mt-7 space-y-5'>
            <input type='hidden' name='access_key' value={accessKey} />
            <input type='hidden' name='subject' value='Genfleet developer waitlist' />
            <input type='hidden' name='from_name' value='Genfleet landing page' />
            <input type='hidden' name='billing' value={selectedBilling} />

            <div className='space-y-2'>
              <Label htmlFor='waitlist-email'>Email</Label>
              <Input id='waitlist-email' name='email' type='email' autoComplete='email' placeholder='you@example.com' required className='h-12 rounded-xl bg-background px-4' />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='waitlist-github'>GitHub username</Label>
              {/* The fixed prefix shows people to enter just the username, not a full URL. */}
              <div className='flex h-12 items-center rounded-xl border border-input bg-background text-sm transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/15'>
                <span aria-hidden='true' className='pl-4 text-muted-foreground'>github.com/</span>
                <input
                  id='waitlist-github'
                  name='github'
                  type='text'
                  autoComplete='username'
                  autoCapitalize='none'
                  spellCheck={false}
                  required
                  pattern='[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}'
                  title='Your GitHub username: letters, numbers, and single hyphens, up to 39 characters'
                  placeholder='your-username'
                  className='h-full min-w-0 flex-1 bg-transparent pr-4 outline-none placeholder:text-muted-foreground'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='waitlist-plan'>Plan</Label>
              <select id='waitlist-plan' name='plan' defaultValue={defaultPlan} className={selectClassName}>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='waitlist-building'>What do you want to build?</Label>
              <Textarea
                id='waitlist-building'
                name='building'
                placeholder='An agent that…'
                className='min-h-28 resize-none rounded-xl bg-background px-4 py-3'
              />
            </div>

            <Button type='submit' disabled={!accessKey} className='h-12 w-full rounded-full text-base hover:bg-signal hover:text-white'>
              Join waitlist
              <NudgeArrow />
            </Button>

            <p className='text-center text-xs leading-relaxed text-muted-foreground'>We will only use these details to review your request and tell you about your spot.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
