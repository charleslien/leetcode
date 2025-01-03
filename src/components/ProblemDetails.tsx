import React from 'react'
import { Problem } from '../types'
import { COLUMNS, LEETCODE_TAG_PREFIX } from '../constants'

interface ProblemDetailsProps {
  problem: Problem;
}

export const ProblemDetails: React.FC<ProblemDetailsProps> = ({ problem }) => (
  <div className="expanded-details">
    {problem[COLUMNS.TAGS] && (
      <div className="detail-chip">
        <strong>Tags:</strong>{' '}
        {problem[COLUMNS.TAGS].split('|').map((tag, index, array) => {
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
    )}        {problem[COLUMNS.RUNTIME] && (
          <div className="detail-chip">
            <strong>Runtime:</strong> O(
            {problem[COLUMNS.RUNTIME].split('^').map((part, i) => 
              i > 0 ? <sup key={i}>{part}</sup> : part.replace(/\*/g, '·')
            )}
            )
          </div>
        )}
        {problem[COLUMNS.SPACE] && (
          <div className="detail-chip">
            <strong>Space:</strong> O(
            {problem[COLUMNS.SPACE].split('^').map((part, i) => 
              i > 0 ? <sup key={i}>{part}</sup> : part.replace(/\*/g, '·')
            )}
            )
          </div>
        )}
    {problem[COLUMNS.VARIABLES] && (
      <div className="detail-chip">
        <strong>Variables:</strong>
        {problem[COLUMNS.VARIABLES].split('|').map((variable, i) => (
          <div key={i} style={{ marginLeft: '1rem', marginTop: '0.25rem' }}>
            • {variable.trim()}
          </div>
        ))}
      </div>
    )}
    {problem[COLUMNS.NOTES] && <div className="detail-chip"><strong>Notes:</strong> {problem[COLUMNS.NOTES]}</div>}
  </div>
)
