import React from 'react'
import { Problem } from '../types'

interface ProblemDetailsProps {
  problem: Problem;
}

export const ProblemDetails: React.FC<ProblemDetailsProps> = ({ problem }) => (
  <div className="expanded-details">
    {problem['Tags'] && <div><strong>Tags:</strong> {problem['Tags']}</div>}
    {problem['Runtime'] && (
      <div>
        <strong>Runtime:</strong> O(
        {problem['Runtime'].split(',')[0].split('^').map((part, i) => 
          i > 0 ? <sup key={i}>{part}</sup> : part.replace(/\*/g, '·')
        )}
        )
        {problem['Runtime'].includes(',') && 
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
            , where {problem['Runtime'].split(',')[1]}
          </span>
        }
      </div>
    )}
    {problem['Space'] && (
      <div>
        <strong>Space:</strong> O(
        {problem['Space'].split(',')[0].split('^').map((part, i) => 
          i > 0 ? <sup key={i}>{part}</sup> : part.replace(/\*/g, '·')
        )}
        )
        {problem['Space'].includes(',') && 
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
            , where {problem['Space'].split(',')[1]}
          </span>
        }
      </div>
    )}
    {problem['Notes'] && <div><strong>Notes:</strong> {problem['Notes']}</div>}
  </div>
)
