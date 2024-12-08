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
  - Runtime: Time complexity (e.g., N, N^2)
  - Space: Space complexity (e.g., 1, N)
- CSV structure is flexible, may include additional columns
- CSV data stored in public/problems.csv
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
