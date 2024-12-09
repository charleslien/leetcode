export const extractAndOrderTags = (problems: { Tags?: string }[]) => {
  const tags = new Set<string>()
  problems.forEach(problem => {
    if (problem.Tags) {
      problem.Tags.split(',').forEach(tag => {
        const trimmed = tag.trim()
        if (trimmed) tags.add(trimmed)
      })
    }
  })
  const unorderedTags = Array.from(tags)
  const leetCodePrefix = "LeetCode:"
  const orderedLeetcodeTags = unorderedTags.filter(tag => tag.startsWith(leetCodePrefix)).sort()
  const orderedNonleetcodeTags = unorderedTags.filter(tag => !tag.startsWith(leetCodePrefix)).sort()
  return [...orderedLeetcodeTags, ...orderedNonleetcodeTags]
}
