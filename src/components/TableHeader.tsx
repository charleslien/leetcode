import React from 'react'
import { SortKey, SortDirection } from '../types'
import { COLUMNS, SORT } from '../constants'

interface TableHeaderProps {
  sortKey: SortKey;
  sortDirection: SortDirection;
  handleSort: (key: SortKey) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  sortKey,
  sortDirection,
  handleSort
}) => (
  <tr>
    <th onClick={() => handleSort(COLUMNS.PROBLEM_ID)}>
      Problem {sortKey === COLUMNS.PROBLEM_ID && (sortDirection === SORT.ASC ? '(Newest) ↑' : '(Oldest) ↓')}
    </th>
    {[COLUMNS.THINKING, COLUMNS.CODING].map(key => (
      <th key={key} onClick={() => handleSort(key as SortKey)}>
        {key} {sortKey === key && (sortDirection === SORT.ASC ? '↑' : '↓')}
      </th>
    ))}
  </tr>
)
