import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { PauseIcon } from '@phosphor-icons/react/dist/csr/Pause';
import { PlayIcon } from '@phosphor-icons/react/dist/csr/Play';
import { BookOpenTextIcon } from '@phosphor-icons/react/dist/csr/BookOpenText';
import { FileTextIcon } from '@phosphor-icons/react/dist/csr/FileText';
import { IdentificationBadgeIcon } from '@phosphor-icons/react/dist/csr/IdentificationBadge';
import { PlugsConnectedIcon } from '@phosphor-icons/react/dist/csr/PlugsConnected';
import { ScrollIcon } from '@phosphor-icons/react/dist/csr/Scroll';
import { LogoMark } from '@/components/logo';

const layers = [
  { id: 'role', label: 'Role', summary: 'Its responsibilities', icon: IdentificationBadgeIcon },
  { id: 'knowledge', label: 'Knowledge', summary: 'Your company knowledge', icon: BookOpenTextIcon },
  { id: 'tools', label: 'Tools', summary: 'Systems it can use', icon: PlugsConnectedIcon },
  { id: 'rules', label: 'Rules', summary: 'How it must behave', icon: ScrollIcon },
] as const;

type LayerId = (typeof layers)[number]['id'];

function LayerPanel({ id, active }: { id: LayerId; active: boolean }) {
  const rows = { className: 'layer-rows divide-y divide-border', 'data-active': active };
  if (id === 'role') {
    return (
      <dl {...rows}>
        {[
          ['Responsible for', 'Order, delivery, and return questions'],
          ['Goal', 'Resolve each request in a single reply'],
          ['Tone', 'Friendly and concise'],
          ['Languages', 'English and Arabic'],
        ].map(([term, value]) => (
          <div key={term} className='grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4'>
            <dt className='text-sm text-muted-foreground'>{term}</dt>
            <dd className='text-sm font-medium'>{value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  if (id === 'knowledge') {
    return (
      <ul {...rows}>
        {[
          ['Return and refund policy', 'PDF, 12 pages'],
          ['Product catalog 2026', 'Spreadsheet, 840 rows'],
          ['Shipping and delivery FAQ', 'Document, 3 pages'],
        ].map(([name, meta]) => (
          <li key={name} className='flex items-center gap-3 py-3.5'>
            <FileTextIcon aria-hidden='true' className='size-5 shrink-0 text-muted-foreground' />
            <span className='min-w-0 flex-1 text-sm font-medium'>{name}</span>
            <span className='text-sm text-muted-foreground'>{meta}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (id === 'tools') {
    return (
      <ul {...rows}>
        {[
          ['ERP connector', 'Look up orders, check stock'],
          ['Email', 'Send replies from your support address'],
          ['Web search', 'Check carrier tracking pages'],
        ].map(([name, detail]) => (
          <li key={name} className='grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4'>
            <span className='text-sm font-medium'>{name}</span>
            <span className='text-sm text-muted-foreground'>{detail}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul {...rows}>
      {[
        'Only answer questions about orders and products',
        'Hand complaints to a person on your team',
        'Never share one customer’s details with another',
      ].map((rule) => (
        <li key={rule} className='flex gap-3 py-3.5 text-sm font-medium'>
          <span aria-hidden='true' className='mt-2 size-1.5 shrink-0 rounded-full bg-foreground' />
          {rule}
        </li>
      ))}
    </ul>
  );
}

const STEP_MS = 4500;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function AgentBuilder() {
  const [active, setActive] = useState<LayerId>('role');
  // Plays by default; starts paused for people who ask for reduced motion.
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  // Pointer or keyboard focus inside the card holds the current layer so it can be read.
  const [held, setHeld] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const tablistRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const progress = useRef(0);
  const baseId = useId();
  const activeIndex = layers.findIndex((layer) => layer.id === active);

  const select = (id: LayerId) => {
    progress.current = 0;
    setActive(id);
  };

  useEffect(() => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress.current})`;
    if (!playing || held) return;

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      progress.current = Math.min(progress.current + (now - last) / STEP_MS, 1);
      last = now;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.current})`;
      if (progress.current >= 1) {
        progress.current = 0;
        setActive((current) => layers[(layers.findIndex((layer) => layer.id === current) + 1) % layers.length].id);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, held, active]);

  // One highlight glides between tabs, so the eye follows the selection instead of
  // watching one tab switch off and another switch on.
  useLayoutEffect(() => {
    const place = () => {
      const tab = tabRefs.current[activeIndex];
      const indicator = indicatorRef.current;
      if (!tab || !indicator) return;
      indicator.style.transform = `translate(${tab.offsetLeft}px, ${tab.offsetTop}px)`;
      indicator.style.width = `${tab.offsetWidth}px`;
      indicator.style.height = `${tab.offsetHeight}px`;
      // Enable the glide only after the first placement, so it never slides in from the corner.
      requestAnimationFrame(() => { indicator.dataset.ready = 'true'; });
    };
    place();
    const observer = new ResizeObserver(place);
    if (tablistRef.current) observer.observe(tablistRef.current);
    return () => observer.disconnect();
  }, [activeIndex]);

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = activeIndex;
    if (event.key in keys) next = (activeIndex + keys[event.key] + layers.length) % layers.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = layers.length - 1;
    else return;
    event.preventDefault();
    select(layers[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      className='grid gap-2.5 rounded-[1.75rem] bg-card p-2.5 sm:p-3 md:grid-cols-[13rem_1fr]'
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={onBlur}
    >
      <div className='flex flex-col gap-2.5'>
        <div ref={tablistRef} role='tablist' aria-label='Agent layers' aria-orientation='vertical' className='relative grid grid-cols-2 gap-1.5 md:grid-cols-1'>
          <span
            ref={indicatorRef}
            aria-hidden='true'
            className='absolute left-0 top-0 overflow-hidden rounded-2xl bg-signal data-[ready=true]:transition-[transform,width,height] data-[ready=true]:duration-500 data-[ready=true]:ease-[var(--ease-glide)]'
          >
            <span ref={barRef} className='absolute inset-x-0 bottom-0 h-0.5 origin-left bg-white/80' style={{ transform: 'scaleX(0)' }} />
          </span>
          {layers.map(({ id, label, summary, icon: Icon }, index) => {
            const selected = id === active;
            return (
              <button
                key={id}
                ref={(el) => { tabRefs.current[index] = el; }}
                id={`${baseId}-tab-${id}`}
                type='button'
                role='tab'
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(id)}
                onKeyDown={onKeyDown}
                className={`group relative z-10 flex items-start gap-3 rounded-2xl p-3.5 text-left transition-colors duration-300 ${selected ? 'text-white' : 'hover:bg-muted'}`}
              >
                <Icon aria-hidden='true' className='mt-0.5 size-5 shrink-0' />
                <span>
                  <span className='block text-sm font-semibold'>{label}</span>
                  <span className={`mt-0.5 hidden text-xs leading-snug transition-colors duration-300 md:block ${selected ? 'text-white/85' : 'text-muted-foreground'}`}>{summary}</span>
                </span>
              </button>
            );
          })}
        </div>
        <button
          type='button'
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? 'Pause the tour of agent layers' : 'Play the tour of agent layers'}
          className='mt-auto inline-flex size-10 items-center justify-center self-start rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
        >
          {/* Both glyphs stay mounted and trade places, like a symbol replace. */}
          <span className='grid'>
            <PauseIcon aria-hidden='true' weight='fill' className={`size-4 [grid-area:1/1] transition-[opacity,scale] duration-200 ease-[var(--ease-glide)] ${playing ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
            <PlayIcon aria-hidden='true' weight='fill' className={`size-4 [grid-area:1/1] transition-[opacity,scale] duration-200 ease-[var(--ease-glide)] ${playing ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`} />
          </span>
        </button>
      </div>

      <div
        id={`${baseId}-panel`}
        role='tabpanel'
        aria-labelledby={`${baseId}-tab-${active}`}
        className='flex flex-col rounded-2xl border border-border p-5 sm:p-6'
      >
        <div className='flex items-center gap-3'>
          <LogoMark className='w-8' />
          <p className='font-semibold'>Support agent</p>
        </div>
        {/* All layers share one grid cell, so the card is always as tall as the
            tallest layer and switching crossfades instead of resizing. */}
        <div className='mt-4 grid'>
          {layers.map(({ id, summary }, index) => {
            const selected = id === active;
            // Panels sit in list order: earlier layers above, later ones below.
            const offset = index < activeIndex ? '-translate-y-3' : 'translate-y-3';
            return (
              <div
                key={id}
                aria-hidden={!selected}
                inert={!selected}
                className={`[grid-area:1/1] transition-[opacity,translate] ${selected ? 'translate-y-0 opacity-100 delay-75 duration-500 ease-[var(--ease-glide)]' : `pointer-events-none opacity-0 duration-200 ease-in ${offset}`}`}
              >
                <p className='text-sm text-muted-foreground'>{summary}</p>
                <LayerPanel id={id} active={selected} />
              </div>
            );
          })}
        </div>
        <p className='mt-auto pt-6 text-sm text-muted-foreground'>Set up with help from the Genfleet team, or on your own.</p>
      </div>
    </div>
  );
}

export function CustomizationSection() {
  return (
    <section className='bg-muted px-5 py-24 sm:px-8 sm:py-32'>
      <div className='mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20'>
        <div>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>Built around the way your company works.</h2>
          <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>
            Every agent is four layers you control: the role it plays, the knowledge it draws on, the tools it can use, and the rules it follows. Start from a ready-made agent and tailor each one.
          </p>
        </div>
        <AgentBuilder />
      </div>
    </section>
  );
}
