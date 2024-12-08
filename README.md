```markdown
# LeetCode Practice Tracker

A simple web application to track and analyze your LeetCode problem-solving practice sessions.

## Features

- Track time spent thinking about and coding solutions
- Filter problems by tags and name
- Sort by thinking time, coding time, or chronological order
- View complexity analysis and tags for each problem
- Direct links to LeetCode problems

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Data Format

Problems are tracked in `public/problems.csv` with the following columns:

- Problem ID: LeetCode problem identifier
- Thinking: Time spent analyzing problem
- Coding: Time spent implementing solution
- Tags: Problem categories/techniques (comma-separated)
- Runtime: Time complexity
- Space: Space complexity
```
