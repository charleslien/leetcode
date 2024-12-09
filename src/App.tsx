import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'
import { Problem, SortKey, SortDirection } from './types'
import { ProblemDetails } from './components/ProblemDetails'
import { SearchFilters } from './components/SearchFilters'
import './App.css'

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
        
        const transformedData = results.data.map(problem => {
          const leetcodeTags = problem['LeetCode Tags']?.split(',')
            .map(tag => `LeetCode:${tag.trim()}`) || [];
          const customTags = problem['Tags']?.split(',')
            .map(tag => tag.trim())
            .filter(Boolean) || [];
          
          return {
            ...problem,
            Tags: [...leetcodeTags, ...customTags].join(', ')
          };
        });
        
        setProblems(transformedData)
        
        const tags = new Set<string>()
        transformedData.forEach(problem => {
          if (problem.Tags) {
            problem.Tags.split(',').forEach(tag => {
              const trimmed = tag.trim()
              if (trimmed) tags.add(trimmed)
            })
          }
        })
        const unorderedTags = Array.from(tags)
        const leetCodePrefix = "LeetCode:"
        const orderedLeetcodeTags = unorderedTags.filter(tag => tag.startsWith(leetCodePrefix)).sort()
        const orderedNonleetcodeTags = unorderedTags.filter(tag => !tag.startsWith(leetCodePrefix)).sort()
        setAllTags([...orderedLeetcodeTags, ...orderedNonleetcodeTags])
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
      <SearchFilters
        problemSearch={problemSearch}
        setProblemSearch={setProblemSearch}
        tagSearch={tagSearch}
        setTagSearch={setTagSearch}
        allTags={allTags}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
      />
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
    </div>
  )
}

export default App
