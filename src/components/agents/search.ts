export type AgentSort = 'popular' | 'newest' | 'name';

export const sortOptions: Array<{ value: AgentSort; label: string }> = [
  { value: 'popular', label: 'Most used' },
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name' },
];

// Lists travel as comma-separated values: ?fn=finance,sales
export function parseList(value: unknown): string[] {
  return typeof value === 'string' ? value.split(',').map((item) => item.trim()).filter(Boolean) : [];
}
