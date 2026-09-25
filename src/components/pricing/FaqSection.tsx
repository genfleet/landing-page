const faqs = [
  {
    question: 'Which AI models can our agents use?',
    answer:
      'Agents work with the major model providers. Every plan uses your own model API keys, or we can manage keys for you at an extra charge. Each agent can be pinned to a specific model today, and smart routing is on the way.',
  },
  {
    question: 'Can we bring agents we have already built?',
    answer:
      'Yes. Genfleet imports agents built with the OpenAI Agents SDK, LangChain, CrewAI, the Anthropic SDK, or your own code, and runs them alongside agents from the marketplace.',
  },
  {
    question: 'Where do our agents run, and who can see our data?',
    answer:
      'Every agent runs in its own isolated container, and each company works in a separate workspace. Connected accounts and API keys are stored as secrets scoped to your workspace, never shared with other companies.',
  },
  {
    question: 'What happens when an agent gets something wrong?',
    answer:
      'Every agent run is logged, so your team can see what an agent did and which tools it used. Approval steps for sensitive actions are coming soon.',
  },
  {
    question: 'How does billing work?',
    answer:
      'Plans are billed monthly or annually. Annual billing costs the same as ten months, so you get two months free. Enterprise plans are quoted around your teams and operating needs.',
  },
  {
    question: 'Can we use Genfleet today?',
    answer:
      'Genfleet is in private beta. Request a demo and we will walk you through the platform and help you choose your first agents.',
  },
];

export function FaqSection() {
  return (
    <section id='faq' className='px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24'>
        <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>Questions, answered.</h2>
        <div className='border-t border-border'>
          {faqs.map(({ question, answer }) => (
            <details key={question} className='group border-b border-border'>
              <summary className='flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden'>
                {question}
                <span aria-hidden='true' className='relative size-4 shrink-0'>
                  <span className='absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current' />
                  <span className='absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-current transition-transform group-open:rotate-90 group-open:opacity-0' />
                </span>
              </summary>
              <p className='max-w-2xl pb-6 leading-relaxed text-muted-foreground'>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
