import React from 'react'
import { Problem } from '../types'
import { COLUMNS, LEETCODE_TAG_PREFIX } from '../constants'

interface ProblemDetailsProps {
  problem: Problem;
}

export const ProblemDetails: React.FC<ProblemDetailsProps> = ({ problem }) => (
  <div className="expanded-details">
    {problem[COLUMNS.TAGS] && (
      <div>
        <strong>Tags:</strong>{' '}
        {problem[COLUMNS.TAGS].split(',').map((tag, index, array) => {
          const trimmedTag = tag.trim();
          const isLast = index === array.length - 1;
          return trimmedTag.startsWith(LEETCODE_TAG_PREFIX) ? (
            <span key={trimmedTag}>
              <span style={{ opacity: 0.6 }}>{LEETCODE_TAG_PREFIX}</span>
              {trimmedTag.slice(LEETCODE_TAG_PREFIX.length)}
              {!isLast && ', '}
            </span>
          ) : trimmedTag + (!isLast ? ', ' : '')
        })}
      </div>
    )}
    {problem[COLUMNS.RUNTIME] && (
      <div>
        <strong>Runtime:</strong> O(
        {problem[COLUMNS.RUNTIME].split(',')[0].split('^').map((part, i) => 
          i > 0 ? <sup key={i}>{part}</sup> : part.replace(/\*/g, '·')
        )}
        )
        {problem[COLUMNS.RUNTIME].includes(',') && 
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
            , where {problem[COLUMNS.RUNTIME].split(',')[1]}
          </span>
        }
      </div>
    )}
    {problem[COLUMNS.SPACE] && (
      <div>
        <strong>Space:</strong> O(
        {problem[COLUMNS.SPACE].split(',')[0].split('^').map((part, i) => 
          i > 0 ? <sup key={i}>{part}</sup> : part.replace(/\*/g, '·')
        )}
        )
        {problem[COLUMNS.SPACE].includes(',') && 
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
            , where {problem[COLUMNS.SPACE].split(',')[1]}
          </span>
        }
      </div>
    )}
    {problem[COLUMNS.NOTES] && <div><strong>Notes:</strong> {problem[COLUMNS.NOTES]}</div>}
  </div>
)
