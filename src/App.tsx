import { useState, useEffect } from 'react'
import { InfoHeader } from './components/InfoHeader'
import { Problem, SortKey, SortDirection } from './types'
import { SearchFilters } from './components/SearchFilters'
import { ProblemsTable } from './components/ProblemsTable'
import { Pagination } from './components/Pagination'
import { fetchAndParseCsv } from './services/csvService'
import { extractAndOrderTags } from './utils/tagUtils'
import { COLUMNS, SORT, PAGE_SIZES } from './constants'
import './App.css'

function App() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [sortKey, setSortKey] = useState<SortKey>(() => {
    const saved = localStorage.getItem('sortKey')
    return (saved as SortKey) || 'Problem ID'
  })
  const [sortDirection, setSortDirection] = useState<SortDirection>(() => {
    const saved = localStorage.getItem('sortDirection')
    return (saved as SortDirection) || SORT.ASC
  })
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedTags')
    return saved ? JSON.parse(saved) : []
  })
  const [allTags, setAllTags] = useState<string[]>([])
  const [tagSearch, setTagSearch] = useState('')
  const [problemSearch, setProblemSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = localStorage.getItem('itemsPerPage')
    return saved ? Number(saved) : PAGE_SIZES[0]
  })
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('currentPage')
    return saved ? Number(saved) : 0
  })

  useEffect(() => {
    fetchAndParseCsv().then(transformedData => {
      setProblems(transformedData)
      setAllTags(extractAndOrderTags(transformedData))
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('sortKey', sortKey)
    localStorage.setItem('sortDirection', sortDirection)
    localStorage.setItem('currentPage', String(currentPage))
  }, [sortKey, sortDirection, currentPage])

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === SORT.ASC ? SORT.DESC : SORT.ASC)
    } else {
      setSortKey(key)
      setSortDirection(SORT.ASC)
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const next = prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      localStorage.setItem('selectedTags', JSON.stringify(next));
      return next;
    })
  }

  useEffect(() => {
    localStorage.setItem('itemsPerPage', String(itemsPerPage))
  }, [itemsPerPage])

  const filteredAndSortedProblems = problems
    .filter(problem => {
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => 
          problem.Tags?.split('|').map(t => t.trim()).includes(tag)
        );
      const matchesProblem = problem[COLUMNS.PROBLEM_ID].toLowerCase()
        .includes(problemSearch.toLowerCase());
      return matchesTags && matchesProblem;
    })
    .sort((a, b) => {
      const direction = sortDirection === SORT.ASC ? 1 : -1
      
      if (sortKey === COLUMNS.PROBLEM_ID) {
        return (problems.indexOf(b) - problems.indexOf(a)) * direction
      }
      
      const aVal = Number(a[sortKey] || 0)
      const bVal = Number(b[sortKey] || 0)
      
      if (sortKey === COLUMNS.THINKING) {
        if (aVal === bVal) {
          return (Number(a[COLUMNS.CODING] || 0) - Number(b[COLUMNS.CODING] || 0)) * direction
        }
      } else if (sortKey === COLUMNS.CODING) {
        if (aVal === bVal) {
          return (Number(a[COLUMNS.THINKING] || 0) - Number(b[COLUMNS.THINKING] || 0)) * direction
        }
      }
      
      return (aVal - bVal) * direction
    })

  return (
    <div className="problems">
      <InfoHeader />
      <SearchFilters
        problemSearch={problemSearch}
        setProblemSearch={setProblemSearch}
        tagSearch={tagSearch}
        setTagSearch={setTagSearch}
        allTags={allTags}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
      />
      <ProblemsTable
        problems={filteredAndSortedProblems.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage
        )}
        sortKey={sortKey}
        sortDirection={sortDirection}
        handleSort={handleSort}

      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={filteredAndSortedProblems.length}
      />
    </div>
  )
}

export default App
