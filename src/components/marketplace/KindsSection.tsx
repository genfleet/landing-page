const kinds = [
  { title: 'Agents', detail: 'Specialists that take on a role, like support, finance, or research, and work alongside your team.' },
  { title: 'Tools', detail: 'Single abilities an agent can use, like searching the web, reading a spreadsheet, or sending an email.' },
  { title: 'Connectors', detail: 'Bundles of tools for one system, like your ERP or CRM, connected once with your company’s own account.' },
];

export function KindsSection() {
  return (
    <section className='px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24'>
        <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>Three things you can add.</h2>
        <dl className='divide-y divide-border border-y border-border'>
          {kinds.map(({ title, detail }) => (
            <div key={title} className='grid gap-2 py-7 sm:grid-cols-[10rem_1fr] sm:gap-8'>
              <dt className='font-display text-2xl font-bold tracking-[-0.02em]'>{title}</dt>
              <dd className='leading-relaxed text-muted-foreground'>{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
