export interface Problem {
  'Problem ID': string;
  'Thinking': string;
  'Coding': string;
  'LeetCode Tags'?: string;
  'Tags'?: string;
  'Runtime': string;
  'Space': string;
  'Notes'?: string;
}

export type SortKey = 'Problem ID' | 'Thinking' | 'Coding'
export type SortDirection = 'asc' | 'desc'
