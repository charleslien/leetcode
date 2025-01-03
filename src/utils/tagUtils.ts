import { LEETCODE_TAG_PREFIX } from '../constants'

export const extractAndOrderTags = (problems: { Tags?: string }[]) => {
  const tags = new Set<string>()
  problems.forEach(problem => {
    if (problem.Tags) {
      problem.Tags.split('|').forEach(tag => {
        const trimmed = tag.trim()
        if (trimmed) tags.add(trimmed)
      })
    }
  })
  const unorderedTags = Array.from(tags)
  const orderedLeetcodeTags = unorderedTags.filter(tag => tag.startsWith(LEETCODE_TAG_PREFIX)).sort()
  const orderedNonleetcodeTags = unorderedTags.filter(tag => !tag.startsWith(LEETCODE_TAG_PREFIX)).sort()
  return [...orderedLeetcodeTags, ...orderedNonleetcodeTags]
}
