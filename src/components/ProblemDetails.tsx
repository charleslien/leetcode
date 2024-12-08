```typescript
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
)
```
