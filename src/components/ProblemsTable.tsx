import React from 'react'
import { Problem, SortKey, SortDirection } from '../types'
import { COLUMNS } from '../constants'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'

interface ProblemsTableProps {
  problems: Problem[];
  sortKey: SortKey;
  sortDirection: SortDirection;
  handleSort: (key: SortKey) => void;
}

export const ProblemsTable: React.FC<ProblemsTableProps> = ({
  problems,
  sortKey,
  sortDirection,
  handleSort,
}) => {
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null)

  return (
    <table>
      <thead>
        <TableHeader 
          sortKey={sortKey}
          sortDirection={sortDirection}
          handleSort={handleSort}
        />
      </thead>
      <tbody>
        {problems.map(problem => (
          <TableRow
            key={problem[COLUMNS.PROBLEM_ID]}
            problem={problem}
            isExpanded={expandedRow === problem[COLUMNS.PROBLEM_ID]}
            onToggleExpand={() => setExpandedRow(current => 
              current === problem[COLUMNS.PROBLEM_ID] ? null : problem[COLUMNS.PROBLEM_ID]
            )}
          />
        ))}
      </tbody>
    </table>
  )
}
