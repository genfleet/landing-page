
const adoptionSteps = [
  { title: 'Find the right agents', description: 'Browse by business function, task, or goal to find specialists suited to the work.' },
  { title: 'Connect your business', description: 'Choose the tools and information each agent needs to work with your team.' },
  { title: 'Make them yours', description: 'Genfleet helps tailor responsibilities, knowledge, access, and approval rules.' },
  { title: 'Assemble your team', description: 'Bring specialists together in one workspace and start putting them to work.' },
];

export function HowItWorksSection() {
  return (
    <section id='how-it-works' className='bg-muted px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto max-w-7xl'>
        <div className='max-w-3xl'>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>From a business need to a working agent team.</h2>
        </div>
        <ol className='mt-16 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4'>
          {adoptionSteps.map(({ title, description }, index) => (
            <li key={title} className='flex min-h-64 flex-col rounded-2xl bg-card p-6'>
              <span className='font-display text-5xl font-bold leading-none tracking-[-0.04em] text-brand' aria-hidden='true'>
                {index + 1}
              </span>
              <h3 className='mt-auto pt-10 text-lg font-semibold leading-snug'>{title}</h3>
              <p className='mt-2 leading-relaxed text-muted-foreground'>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
