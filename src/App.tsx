import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import './App.css'

interface Problem {
  'Problem ID': string;
  'Thinking Time': string;
  'Coding Time': string;
  'Tags': string;
}

type SortKey = keyof Problem
type SortDirection = 'asc' | 'desc'

function App() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('Problem ID')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    fetch('/leetcode/problems.csv')
      .then(response => response.text())
      .then(csv => {
        const results = Papa.parse<Problem>(csv, { header: true })
        setProblems(results.data)
        
        // Extract unique tags
        const tags = new Set<string>()
        results.data.forEach(problem => {
          problem.Tags.split(',').forEach(tag => tags.add(tag.trim()))
        })
        setAllTags(Array.from(tags))
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

  const filteredAndSortedProblems = problems
    .filter(problem => 
      selectedTags.length === 0 || 
      selectedTags.every(tag => problem.Tags.includes(tag))
    )
    .sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const direction = sortDirection === 'asc' ? 1 : -1
      
      if (sortKey === 'Problem ID' || sortKey === 'Thinking Time' || sortKey === 'Coding Time') {
        return (Number(aVal) - Number(bVal)) * direction
      }
      return aVal.localeCompare(bVal) * direction
    })

  return (
    <div className="problems">
      <div className="tag-filters">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={selectedTags.includes(tag) ? 'selected' : ''}
          >
            {tag}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            {Object.keys(problems[0] || {}).map(key => (
              <th key={key} onClick={() => handleSort(key as SortKey)}>
                {key} {sortKey === key && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProblems.map(problem => (
            <tr key={problem['Problem ID']}>
              <td>{problem['Problem ID']}</td>
              <td>{problem['Thinking Time']}</td>
              <td>{problem['Coding Time']}</td>
              <td>{problem['Tags']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
