import React from 'react'

interface SearchFiltersProps {
  problemSearch: string;
  setProblemSearch: (value: string) => void;
  tagSearch: string;
  setTagSearch: (value: string) => void;
  allTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  problemSearch,
  setProblemSearch,
  tagSearch,
  setTagSearch,
  allTags,
  selectedTags,
  toggleTag
}) => (
  <div className="tag-filters">
    <input
      type="text"
      placeholder="Search problems..."
      value={problemSearch}
      onChange={(e) => setProblemSearch(e.target.value)}
    />
    <input
      type="text"
      placeholder="Search tags..."
      value={tagSearch}
      onChange={(e) => setTagSearch(e.target.value)}
    />
    {allTags
      .filter(tag => tag.toLowerCase().includes(tagSearch.toLowerCase()))
      .map(tag => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={selectedTags.includes(tag) ? 'selected' : ''}
        >
          {tag}
        </button>
      ))}
  </div>
)
