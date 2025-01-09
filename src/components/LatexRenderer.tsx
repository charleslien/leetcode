import katex from 'katex'
import { useEffect, useRef } from 'react'

interface LatexRendererProps {
  latex: string;
  inline?: boolean;
}

export const LatexRenderer: React.FC<LatexRendererProps> = ({ latex, inline = false }) => {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      katex.render(latex, containerRef.current, {
        throwOnError: false,
        displayMode: !inline,
        output: 'mathml' // Render MathML output
      })
    }
  }, [latex, inline])

  return <span ref={containerRef} />
}
