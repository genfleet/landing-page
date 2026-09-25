const stages = [
  { title: 'Submitted', detail: 'A developer or company sends an agent, tool, or connector for review.' },
  { title: 'Technical review', detail: 'A Genfleet developer runs its tests, evaluations, and validation checks.' },
  { title: 'Final approval', detail: 'A Genfleet reviewer checks the listing, its description, and its fit for the marketplace.' },
  { title: 'Published', detail: 'The listing goes live as a fixed version. Updates go through review again.' },
];

export function ReviewSection() {
  return (
    <section className='bg-muted px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto max-w-7xl'>
        <div className='max-w-3xl'>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>Reviewed twice before you ever see it.</h2>
          <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>
            Nothing reaches the marketplace on its author’s word alone. Every listing passes a technical review and a final approval, and anything that fails goes back to its author.
          </p>
        </div>
        <ol className='mt-16 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4'>
          {stages.map(({ title, detail }, index) => (
            <li key={title} className='flex min-h-56 flex-col rounded-2xl bg-card p-6'>
              <span className='font-display text-5xl font-bold leading-none tracking-[-0.04em] text-brand' aria-hidden='true'>
                {index + 1}
              </span>
              <h3 className='mt-auto pt-10 text-lg font-semibold leading-snug'>{title}</h3>
              <p className='mt-2 leading-relaxed text-muted-foreground'>{detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
