import React from 'react'
import { Problem } from '../types'
import { COLUMNS, LEETCODE_TAG_PREFIX } from '../constants'
import { LatexRenderer } from './LatexRenderer'

interface ProblemDetailsProps {
  problem: Problem;
}

const renderLatexExpression = (text: string) => {
  // Split on $ but keep the delimiters in the result
  const parts = text.split(/(\$[^$]+\$)/g)
  return (
    <>
      {parts.map((part, index) => {
        // Check if part is a LaTeX expression (starts and ends with $)
        if (part.startsWith('$') && part.endsWith('$')) {
          // Remove the dollar signs before passing to LatexRenderer
          return <LatexRenderer key={index} latex={part.slice(1, -1)} inline />
        }
        // Regular text - wrap in span to maintain consistent layout and preserve whitespace
        return <span key={index} style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}>{part}</span>
      })}
    </>
  )
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
    )}
    {problem[COLUMNS.RUNTIME] && (
      <div className="detail-chip">
        <strong>Runtime:</strong> O({renderLatexExpression(problem[COLUMNS.RUNTIME])})
      </div>
    )}
    {problem[COLUMNS.SPACE] && (
      <div className="detail-chip">
        <strong>Space:</strong> O({renderLatexExpression(problem[COLUMNS.SPACE])})
      </div>
    )}        {problem[COLUMNS.VARIABLES] && (
          <div className="detail-chip">
            <strong>Variables:</strong>
            {problem[COLUMNS.VARIABLES].split('|').map((variable, i) => (
              <div key={i} style={{ marginLeft: '1rem', marginTop: '0.25rem' }}>
                • {renderLatexExpression(variable)}
              </div>
            ))}
          </div>
        )}
    {problem[COLUMNS.NOTES] && (
      <div className="detail-chip">
        <strong>Notes:</strong> {renderLatexExpression(problem[COLUMNS.NOTES])}
      </div>
    )}
  </div>
)
