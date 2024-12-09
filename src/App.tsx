import React, { useState, useEffect } from 'react'
import { Problem, SortKey, SortDirection } from './types'
import { SearchFilters } from './components/SearchFilters'
import { ProblemsTable } from './components/ProblemsTable'
import { fetchAndParseCsv } from './services/csvService'
import { extractAndOrderTags } from './utils/tagUtils'
import './App.css'

function App() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('Problem ID')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [tagSearch, setTagSearch] = useState('')
  const [problemSearch, setProblemSearch] = useState('')

  useEffect(() => {
    fetchAndParseCsv().then(transformedData => {
      setProblems(transformedData)
      setAllTags(extractAndOrderTags(transformedData))
    })
  }, [])

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="problems">
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
        problems={problems}
        sortKey={sortKey}
        sortDirection={sortDirection}
        handleSort={handleSort}
        selectedTags={selectedTags}
        problemSearch={problemSearch}
      />
    </div>
  )
}

export default App
