# LeetCode Practice Tracker

## Project Overview
- Track and analyze LeetCode problem-solving practice sessions
- React-based web application using TypeScript
- Built with Vite for fast development

## Data Structure
- Problems tracked in CSV format with columns:
  - Problem ID: LeetCode problem identifier
  - Thinking: Time spent analyzing problem
  - Coding: Time spent implementing solution
  - Tags: Problem categories/techniques
    - Can include compound tags (e.g., "Math:Parity")
    - Comma-separated, preserve special characters
    - May be empty/undefined
  - Runtime: Time complexity (e.g., O(N), O(N²))
  - Space: Space complexity (e.g., O(1), O(N))
- CSV structure is flexible, may include additional columns
- CSV data stored in public/problems.csv
- CSV parsing requirements:
  - Filter out empty rows
  - Validate each row has required fields
  - Last line should not be empty to avoid phantom entries
- Core metrics (Problem ID, Thinking, Coding) displayed prominently
- CSV entries ordered chronologically with newest at bottom
- Default view preserves chronological order
- Sorting behavior:
  - Numeric fields (Thinking, Coding) should sort lexicographically
  - Newest sort uses CSV order (bottom entries are newest)
  - Place chronological sorting on Problem column for intuitive UX
  - Secondary sorting: Click Thinking then Coding (or vice versa) to sort by both
- Sorting behavior:
  - Numeric fields (Thinking, Coding) should sort lexicographically
  - Newest sort uses CSV order (bottom entries are newest)
  - Place chronological sorting on Problem column for intuitive UX
- Additional metadata (Tags, Runtime, Space) treated as supplementary info
- All data processing must handle undefined/empty values
  - Use null coalescing for numeric operations
  - Check existence before string operations
  - Provide sensible defaults for sorting/filtering

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
- Keep code organization simple and maintainable
  - Prefer single-file solutions until complexity demands otherwise
  - Avoid premature optimization and over-engineering
- Preserve chronological ordering by default, newest entries at bottom
- Keep UI clean and minimal to emphasize problem-solving data
- Use visual hierarchy to distinguish between primary actions and supplementary information
- Match LeetCode's design patterns and aesthetics for familiarity
- Provide multiple filtering mechanisms (tags, problem names) for flexible problem discovery
- Match LeetCode's design patterns and aesthetics for familiarity
- Match LeetCode's design patterns and aesthetics for familiarity
