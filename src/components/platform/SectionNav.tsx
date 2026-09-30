import { useEffect, useState } from 'react';
import { platformSections } from './sections';

// Stays under the site header and highlights the section in view.
export function SectionNav() {
  const [current, setCurrent] = useState<string>(platformSections[0].id);

  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        const top = platformSections.find(({ id }) => (visible.get(id) ?? 0) > 0);
        if (top) setCurrent(top.id);
      },
      // A band across the upper third of the viewport decides which section is "current".
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.01] },
    );
    for (const { id } of platformSections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label='On this page' className='sticky top-[5.5rem] z-40 px-5 sm:top-24 sm:px-8'>
      <ul className='mx-auto flex max-w-7xl gap-1 overflow-x-auto rounded-full border border-border bg-background/90 p-1 backdrop-blur-md [scrollbar-width:none] sm:w-fit'>
        {platformSections.map(({ id, label }) => {
          const active = id === current;
          return (
            <li key={id} className='shrink-0'>
              <a
                href={`#${id}`}
                aria-current={active ? 'true' : undefined}
                className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-(--dur-standard) ${active ? 'bg-signal text-white' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
