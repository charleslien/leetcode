export const COLUMNS = {
  PROBLEM_ID: 'Problem ID',
  THINKING: 'Thinking',
  CODING: 'Coding',
  LEETCODE_TAGS: 'LeetCode Tags',
  TAGS: 'Tags',
  RUNTIME: 'Runtime',
  SPACE: 'Space',
  NOTES: 'Notes',
} as const

export const LEETCODE_TAG_PREFIX = 'LeetCode:'

export const LEETCODE_URL_PREFIX = 'https://leetcode.com/problems'

export const SORT = {
  ASC: 'asc',
  DESC: 'desc',
} as const

export const ROMAN_NUMERALS: string[] = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x']

export const PAGE_SIZES = [10, 25, 50, 100] as const
