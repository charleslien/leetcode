import React from 'react'
import { PAGE_SIZES } from '../constants'

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  totalItems: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  totalItems
}) => (
  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
    <select 
      value={itemsPerPage} 
      onChange={(e) => {
        setItemsPerPage(Number(e.target.value))
        setCurrentPage(0)
      }}
    >
      {PAGE_SIZES.map(size => (
        <option key={size} value={size}>{size} per page</option>
      ))}
    </select>
    <button 
      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
      disabled={currentPage === 0}
      className="page-button"
    >
      Previous
    </button>
    <span>Page {currentPage + 1}</span>
    <button 
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={(currentPage + 1) * itemsPerPage >= totalItems}
      className="page-button"
    >
      Next
    </button>
  </div>
)
