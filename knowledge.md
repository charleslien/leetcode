# LeetCode Timing Estimates

## Project Overview
- Track LeetCode problem-solving difficulty more granularly than LeetCode itself
- React-based web application using TypeScript
- Built with Vite for fast development

## Data Persistence
- User preferences should be stored in localStorage
  - The data is small (just preferences)
  - We want it to persist across browser sessions
  - It's synchronous and simple
  - It's widely supported
    - sessionStorage would lose data when browser closes
    - IndexedDB is too complex for simple preferences
    - Cookies add unnecessary overhead and are sent with every request
    - URL parameters would clutter the URL
  - The alternatives have drawbacks:
  - Examples of state to store in localStorage:
    - Selected tags
    - Items per page
    - Current page number
    - Sort settings

## Data Structure
- Problems tracked in CSV format with columns:
  - Problem ID: LeetCode problem identifier
  - Thinking: Time in minutes spent analyzing and determining solution approach
  - Coding: Time in minutes spent implementing the solution
  - Note: Times are aggressive estimates - treat them as aspirational targets rather than strict requirements
  - Scores range from 1 to any number of minutes, with higher scores indicating higher difficulty
  - Times over 60 minutes are considered very difficult
  - Tags: Problem categories/techniques
    - Can include compound tags (e.g., "Math:Parity")
    - Pipe-delimited (|), preserve special characters
    - May be empty/undefined
  - Runtime: Time complexity expression without O() prefix
    - Just the expression: "N", "N*M", "N^2", "min(N|M)"
    - Component adds "O()" wrapper when displaying
    - For expressions with commas, use pipes: "min(N|M)"
  - Space: Space complexity expression
    - Same format as Runtime
  - Variables: Variable definitions
    - Pipe-delimited list of variable definitions
    - Use equals sign format: "N = length of array"
    - Keep descriptions concise
    - Example: "N = array length|M = target size"
  - Notes: Additional context or observations about the solution

## CSV Requirements
- Filter out empty rows
- Validate each row has required fields
- Last line should not be empty to avoid phantom entries
- Fields containing pipes (|) or commas must be quoted
- Notes field should always be quoted if non-empty
- PapaParse transform limitations:
  - Transform functions run during parsing, cannot access full results
  - For cross-row transforms, process after parsing complete
  - Transform functions receive only current field value and header

## Data Organization
    - Examples: "O(N), where N is array length", "O(N²)"
  - Use dollar signs for LaTeX math mode: "$N \cdot \log N$", "$N^2$"
  - Use \cdot for multiplication instead of * in LaTeX expressions

## Development
- Run `npm run dev` to start development server
- Run `npm run build` to create production build

## Version Control
- Do not commit changes unless explicitly requested
- Stage changes with `git add` as needed

## Technology Stack
- React 18+
- TypeScript
- Vite
- PapaParse for CSV handling

## Layout Guidelines
- For full-width layouts, ensure all parent elements (html, body, #root) have width:100%
- Chrome and other browsers may require explicit width settings on parent containers
- Default body styles in index.css may affect child element layouts

## LaTeX Support
- Use LatexRenderer component to render mathematical expressions
- Supports both inline and display math modes
- Uses KaTeX for fast rendering
- Configured to render MathML output for better accessibility and compatibility
- Example: `<LatexRenderer latex="E = mc^2" inline />`
- When mixing LaTeX and regular text, use React Fragments and inline-block spans to prevent layout issues
- When processing LaTeX expressions, preserve all whitespace in text segments
- Only remove $ delimiters from LaTeX expressions, not surrounding whitespace

## Design Principles
- Focus on core metrics (Problem ID, Thinking, Coding) in main view
- Use progressive disclosure - show additional details (Tags, Runtime, Space) on expansion
- Pass transformed data down to child components to maintain single source of truth
- Keep code organization simple and maintainable
  - Prefer single-file solutions until complexity demands otherwise
  - Avoid premature optimization and over-engineering
- Keep data transformations (filtering, sorting) in parent components
- Preserve chronological ordering by default, newest entries at bottom
