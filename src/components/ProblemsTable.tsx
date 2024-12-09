import React from 'react'
import { Problem, SortKey, SortDirection } from '../types'
import { ProblemDetails } from './ProblemDetails'

interface ProblemsTableProps {
  problems: Problem[];
  sortKey: SortKey;
  sortDirection: SortDirection;
  handleSort: (key: SortKey) => void;
  selectedTags: string[];
  problemSearch: string;
}

export const ProblemsTable: React.FC<ProblemsTableProps> = ({
  problems,
  sortKey,
  sortDirection,
  handleSort,
  selectedTags,
  problemSearch,
}) => {
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null)

  const filteredAndSortedProblems = problems
    .filter(problem => {
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => 
          problem.Tags?.split(',').map(t => t.trim()).includes(tag)
        );
      const matchesProblem = problem['Problem ID'].toLowerCase()
        .includes(problemSearch.toLowerCase());
      return matchesTags && matchesProblem;
    })
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1
      
      if (sortKey === 'Problem ID') {
        return (problems.indexOf(b) - problems.indexOf(a)) * direction
      }
      
      const aVal = Number(a[sortKey] || 0)
      const bVal = Number(b[sortKey] || 0)
      
      if (sortKey === 'Thinking') {
        if (aVal === bVal) {
          return (Number(a['Coding'] || 0) - Number(b['Coding'] || 0)) * direction
        }
      } else if (sortKey === 'Coding') {
        if (aVal === bVal) {
          return (Number(a['Thinking'] || 0) - Number(b['Thinking'] || 0)) * direction
        }
      }
      
      return (aVal - bVal) * direction
    })

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('Problem ID')}>
            Problem {sortKey === 'Problem ID' && (sortDirection === 'asc' ? '(Newest) ↑' : '(Oldest) ↓')}
          </th>
          {['Thinking', 'Coding'].map(key => (
            <th key={key} onClick={() => handleSort(key as SortKey)}>
              {key} {sortKey === key && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredAndSortedProblems.map(problem => (
          <React.Fragment key={problem['Problem ID']}>
            <tr 
              onClick={() => setExpandedRow(current => 
                current === problem['Problem ID'] ? null : problem['Problem ID']
              )}
              style={{ cursor: 'pointer' }}
            >
              <td>
                <a 
                  href={`https://leetcode.com/problems/${problem['Problem ID']}/`} 
                  target="_blank"
                  onClick={e => e.stopPropagation()}
                >
                  {problem['Problem ID'].split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </a>
              </td>
              <td>{problem['Thinking']}</td>
              <td>{problem['Coding']}</td>
            </tr>
            {expandedRow === problem['Problem ID'] && (
              <tr>
                <td colSpan={6}>
                  <ProblemDetails problem={problem} />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}
