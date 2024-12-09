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
    - Comma-separated, preserve special characters
    - May be empty/undefined
  - Runtime: Time complexity 
    - Format as "O(X), where X is..." for complex expressions
    - Always show Big O notation first
    - Separate explanatory text from notation
  - Space: Space complexity
    - Follow same formatting as Runtime complexity
    - Examples: "O(1)", "O(N), where N is input size"
  - Notes: Additional context or observations about the solution

## CSV Requirements
- Filter out empty rows
- Validate each row has required fields
- Last line should not be empty to avoid phantom entries
- PapaParse transform limitations:
  - Transform functions run during parsing, cannot access full results
  - For cross-row transforms, process after parsing complete
  - Transform functions receive only current field value and header

## Data Organization
    - Examples: "O(N), where N is array length", "O(N²)"

## Development
- Run `npm run dev` to start development server
- Run `npm run build` to create production build

## Technology Stack
- React 18+
- TypeScript
- Vite
- PapaParse for CSV handling

## Layout Guidelines
- For full-width layouts, ensure all parent elements (html, body, #root) have width:100%
- Chrome and other browsers may require explicit width settings on parent containers
- Default body styles in index.css may affect child element layouts

## Design Principles
- Focus on core metrics (Problem ID, Thinking, Coding) in main view
- Use progressive disclosure - show additional details (Tags, Runtime, Space) on expansion
- Pass transformed data down to child components to maintain single source of truth
- Keep code organization simple and maintainable
  - Prefer single-file solutions until complexity demands otherwise
  - Avoid premature optimization and over-engineering
- Keep data transformations (filtering, sorting) in parent components
- Preserve chronological ordering by default, newest entries at bottom
