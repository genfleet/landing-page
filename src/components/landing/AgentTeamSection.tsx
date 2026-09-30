import type { ReactNode } from 'react';
import { FlagIcon } from '@phosphor-icons/react/dist/csr/Flag';
import { UserIcon } from '@phosphor-icons/react/dist/csr/User';
import { LogoMark } from '@/components/logo';

type NodeId = 'goal' | 'orchestrator' | 'research' | 'operations' | 'communication' | 'review';
type Orientation = 'horizontal' | 'vertical';

type GraphNode = {
  id: NodeId;
  title: string;
  // Used where nodes are narrow, in the stacked phone layout.
  shortTitle?: string;
  detail: string;
  icon: ReactNode;
};

const nodes: GraphNode[] = [
  { id: 'goal', title: 'Goal', detail: 'Plan next quarter', icon: <FlagIcon aria-hidden='true' className='size-4' weight='fill' /> },
  { id: 'orchestrator', title: 'Orchestrator', detail: 'Splits the goal and hands out the work', icon: <LogoMark className='w-5' /> },
  { id: 'research', title: 'Research agent', shortTitle: 'Research', detail: 'Collects the information', icon: <LogoMark className='w-5 text-agent-1' /> },
  { id: 'operations', title: 'Operations agent', shortTitle: 'Operations', detail: 'Turns findings into a plan', icon: <LogoMark className='w-5 text-agent-2' /> },
  { id: 'communication', title: 'Communication agent', shortTitle: 'Communication', detail: 'Prepares the team-ready output', icon: <LogoMark className='w-5 text-agent-3' /> },
  {
    id: 'review',
    title: 'Your team',
    detail: 'Reviews and approves the plan',
    icon: (
      <span className='flex size-5 items-center justify-center rounded-full bg-human-fill text-white'>
        <UserIcon aria-hidden='true' className='size-3' weight='bold' />
      </span>
    ),
  },
];

const edges: Array<[NodeId, NodeId]> = [
  ['goal', 'orchestrator'],
  ['orchestrator', 'research'],
  ['orchestrator', 'operations'],
  ['orchestrator', 'communication'],
  ['research', 'review'],
  ['operations', 'review'],
  ['communication', 'review'],
];

// Node centers and widths in canvas units. The canvas keeps its aspect ratio,
// so the SVG edges and the HTML nodes share one coordinate system.
const layouts: Record<Orientation, { width: number; height: number; nodes: Record<NodeId, { x: number; y: number; w: number }> }> = {
  horizontal: {
    width: 720,
    height: 400,
    nodes: {
      goal: { x: 70, y: 200, w: 120 },
      orchestrator: { x: 240, y: 200, w: 150 },
      research: { x: 450, y: 75, w: 160 },
      operations: { x: 450, y: 200, w: 160 },
      communication: { x: 450, y: 325, w: 160 },
      review: { x: 640, y: 200, w: 130 },
    },
  },
  vertical: {
    width: 360,
    height: 620,
    nodes: {
      goal: { x: 180, y: 45, w: 170 },
      orchestrator: { x: 180, y: 175, w: 230 },
      research: { x: 62, y: 340, w: 110 },
      operations: { x: 180, y: 340, w: 110 },
      communication: { x: 298, y: 340, w: 110 },
      review: { x: 180, y: 555, w: 200 },
    },
  },
};

// Approximate half-heights, used only to place handles and edge ends.
const HALF_HEIGHT = 30;

function edgePath(orientation: Orientation, from: NodeId, to: NodeId) {
  const { nodes: at } = layouts[orientation];
  const a = at[from];
  const b = at[to];
  if (orientation === 'horizontal') {
    const x1 = a.x + a.w / 2;
    const x2 = b.x - b.w / 2;
    const bend = (x2 - x1) / 2;
    return `M ${x1} ${a.y} C ${x1 + bend} ${a.y}, ${x2 - bend} ${b.y}, ${x2} ${b.y}`;
  }
  const y1 = a.y + HALF_HEIGHT;
  const y2 = b.y - HALF_HEIGHT;
  const bend = (y2 - y1) / 2;
  return `M ${a.x} ${y1} C ${a.x} ${y1 + bend}, ${b.x} ${y2 - bend}, ${b.x} ${y2}`;
}

function Handle({ side }: { side: 'left' | 'right' | 'top' | 'bottom' }) {
  const position = {
    left: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
    right: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
    top: 'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
    bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  }[side];
  return <span aria-hidden='true' className={`absolute size-2 rounded-full border border-foreground/40 bg-background ${position}`} />;
}

function FlowGraph({ orientation, className }: { orientation: Orientation; className?: string }) {
  const layout = layouts[orientation];
  const incoming = new Set(edges.map(([, to]) => to));
  const outgoing = new Set(edges.map(([from]) => from));
  const [inSide, outSide] = orientation === 'horizontal' ? (['left', 'right'] as const) : (['top', 'bottom'] as const);

  return (
    <div className={`relative w-full ${className ?? ''}`} style={{ aspectRatio: `${layout.width} / ${layout.height}` }}>
      <svg viewBox={`0 0 ${layout.width} ${layout.height}`} className='absolute inset-0 size-full' aria-hidden='true'>
        {edges.map(([from, to]) => (
          <path key={`${from}-${to}`} d={edgePath(orientation, from, to)} className='flow-edge' fill='none' />
        ))}
      </svg>
      <ol className='absolute inset-0'>
        {nodes.map(({ id, title, shortTitle, detail, icon }) => {
          const { x, y, w } = layout.nodes[id];
          const narrow = orientation === 'vertical' && shortTitle !== undefined;
          return (
            <li
              key={id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card py-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.06)] ${narrow ? 'px-2' : 'px-3'}`}
              style={{ left: `${(x / layout.width) * 100}%`, top: `${(y / layout.height) * 100}%`, width: `${(w / layout.width) * 100}%` }}
            >
              {incoming.has(id) && <Handle side={inSide} />}
              {outgoing.has(id) && <Handle side={outSide} />}
              <p className={`flex gap-2 font-semibold ${narrow ? 'flex-col items-start gap-1.5 text-[0.65rem]' : 'items-center text-xs'} ${id === 'review' ? 'text-human' : ''}`}>
                <span className='flex shrink-0 items-center'>{icon}</span>
                {/* Hyphenates on the narrowest phones instead of spilling out of the node. */}
                <span className={narrow ? 'max-w-full hyphens-auto' : undefined}>{narrow ? shortTitle : title}</span>
              </p>
              <p className='mt-1 text-[0.7rem] leading-snug text-muted-foreground'>{detail}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function AgentTeamSection() {
  return (
    <section className='bg-muted px-5 py-24 text-foreground sm:px-8 sm:py-32'>
      <div className='mx-auto grid max-w-7xl items-center gap-16 xl:grid-cols-[0.75fr_1.25fr] xl:gap-20'>
        <div>
          <h2 className='text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]'>One goal. Specialized agents, working together.</h2>
          <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>
            An orchestrator splits the goal and hands each part to the right specialist. The results come back together, and your team has the final say.
          </p>
        </div>
        <figure
          aria-label='An orchestrator takes the goal "Plan next quarter", hands work to research, operations, and communication agents, and their results go to your team for review'
          className='flow-canvas overflow-hidden rounded-[1.75rem] border border-border bg-background p-4 sm:p-6'
        >
          <FlowGraph orientation='horizontal' className='hidden md:block' />
          <FlowGraph orientation='vertical' className='mx-auto max-w-sm md:hidden' />
        </figure>
      </div>
    </section>
  );
}
