import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import './App.css'

interface Problem {
  'Problem ID': string;
  'Thinking': string;
  'Coding': string;
  'Tags': string;
  'Runtime': string;
  'Space': string;
}

type SortKey = keyof Problem
type SortDirection = 'asc' | 'desc'

function App() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('Problem ID')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [tagSearch, setTagSearch] = useState('')

  useEffect(() => {
    fetch('/leetcode/problems.csv')
      .then(response => response.text())
      .then(csv => {
        const results = Papa.parse<Problem>(csv, { header: true })
        setProblems(results.data)
        
        // Extract unique tags
        const tags = new Set<string>()
        results.data.forEach(problem => {
          if (problem.Tags) {
            problem.Tags.split(',').forEach(tag => {
              const trimmed = tag.trim()
              if (trimmed) tags.add(trimmed)
            })
          }
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
      selectedTags.every(tag => 
        problem.Tags?.split(',').map(t => t.trim()).includes(tag)
      )
    )
    .sort((a, b) => {
      const aVal = a[sortKey] || ''
      const bVal = b[sortKey] || ''
      const direction = sortDirection === 'asc' ? 1 : -1
      
      if (sortKey === 'Problem ID' || sortKey === 'Thinking' || sortKey === 'Coding') {
        return (Number(aVal || 0) - Number(bVal || 0)) * direction
      }
      return String(aVal).localeCompare(String(bVal)) * direction
    })

  return (
    <div className="problems">
      <div className="tag-filters">
        <input
          type="text"
          placeholder="Search tags..."
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
        />
        {allTags
          .filter(tag => tag.toLowerCase().includes(tagSearch.toLowerCase()))
          .map(tag => (
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
                {key === 'Problem ID' ? 'Problem' : key} {sortKey === key && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProblems.map(problem => (
            <tr key={problem['Problem ID']}>
              <td>
                <a href={`https://leetcode.com/problems/${problem['Problem ID']}/`} target="_blank">
                  {problem['Problem ID'].split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </a>
              </td>
              <td>{problem['Thinking']}</td>
              <td>{problem['Coding']}</td>
              <td>{problem['Tags']}</td>
              <td>{problem['Runtime']}</td>
              <td>{problem['Space']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
