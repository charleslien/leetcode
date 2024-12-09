import React from 'react'

const getScoreColor = (score: number): string => {
  const normalizedScore = Math.min(score, 60) / 60
  if (normalizedScore <= 0.3) {
    // Gradient from green to orange
    return `hsl(${120 - normalizedScore * 200}, 70%, 45%)`
  }
  // Gradient from orange to red
  return `hsl(${36 - (normalizedScore - 0.3) * 36}, 90%, 55%)`
}

import { Problem } from '../types'
import { ProblemDetails } from './ProblemDetails'
import { COLUMNS, LEETCODE_URL_PREFIX, ROMAN_NUMERALS } from '../constants'

interface TableRowProps {
  problem: Problem;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const TableRow: React.FC<TableRowProps> = ({
  problem,
  isExpanded,
  onToggleExpand
}) => (
  <React.Fragment>
    <tr 
      onClick={onToggleExpand}
      style={{ cursor: 'pointer' }}
    >
      <td>
        <a 
          href={`${LEETCODE_URL_PREFIX}/${problem[COLUMNS.PROBLEM_ID]}/`} 
          target="_blank"
          onClick={e => e.stopPropagation()}
        >
          {problem[COLUMNS.PROBLEM_ID].split('-').map(word => {
            return ROMAN_NUMERALS.includes(word.toLowerCase()) ? 
              word.toUpperCase() : 
              word.charAt(0).toUpperCase() + word.slice(1);
          }).join(' ')}
        </a>
      </td>
      <td style={{ color: getScoreColor(Number(problem[COLUMNS.THINKING])) }}>
        {problem[COLUMNS.THINKING]}
      </td>
      <td style={{ color: getScoreColor(Number(problem[COLUMNS.CODING])) }}>
        {problem[COLUMNS.CODING]}
      </td>
    </tr>
    {isExpanded && (
      <tr>
        <td colSpan={6}>
          <ProblemDetails problem={problem} />
        </td>
      </tr>
    )}
  </React.Fragment>
)
