import React, { useState, useEffect } from 'react'
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

type SortKey = 'Problem ID' | 'Thinking' | 'Coding'
type SortDirection = 'asc' | 'desc'

function App() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('Problem ID')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [tagSearch, setTagSearch] = useState('')
  const [problemSearch, setProblemSearch] = useState('')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  useEffect(() => {
    fetch('/leetcode/problems.csv')
      .then(response => response.text())
      .then(csv => {
        const results = Papa.parse<Problem>(csv, { 
          header: true,
          skipEmptyLines: true 
        })
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
    <div className="problems">
      <div className="tag-filters">
        <input
          type="text"
          placeholder="Search problems..."
          value={problemSearch}
          onChange={(e) => setProblemSearch(e.target.value)}
        />
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
                    <div className="expanded-details">
                      {problem['Tags'] && <div><strong>Tags:</strong> {problem['Tags']}</div>}
                      {problem['Runtime'] && (
                        <div>
                          <strong>Runtime:</strong> O(
                          {problem['Runtime'].split('^').map((part, i) => 
                            i > 0 ? <sup key={i}>{part}</sup> : part.replace(/\*/g, '·')
                          )}
                          )
                        </div>
                      )}
                      {problem['Space'] && (
                        <div>
                          <strong>Space:</strong> O(
                          {problem['Space'].split('^').map((part, i) => 
                            i > 0 ? <sup key={i}>{part}</sup> : part.replace(/\*/g, '·')
                          )}
                          )
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
