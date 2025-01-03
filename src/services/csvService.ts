import Papa from 'papaparse'
import { Problem } from '../types'

export const fetchAndParseCsv = async (): Promise<Problem[]> => {
  const response = await fetch('/leetcode/problems.csv')
  const csv = await response.text()
  const results = Papa.parse<Problem>(csv, { 
    header: true,
    skipEmptyLines: true 
  })
  
  return results.data.map(problem => {
    const leetcodeTags = problem['LeetCode Tags']?.split('|')
      .map(tag => `LeetCode:${tag.trim()}`) || [];
    const customTags = problem['Tags']?.split('|')
      .map(tag => tag.trim())
      .filter(Boolean) || [];
    
    return {
      ...problem,
      Tags: [...leetcodeTags, ...customTags].join(' | ')
    };
  });
}
