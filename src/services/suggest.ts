export const suggest = (items, pattern, key = 'name') => {
  if (!pattern || !items || !items.length) {
    // Do not suggest until user starts typing.
    return []
  } else {
    // Do case-insensitive filter with trimmed pattern.
    pattern = pattern.toLowerCase().trim()
    const filtered = pattern ? items.filter(item => item[key].toLowerCase().includes(pattern)) : items

    // Do not suggest anything, if pattern already matches a single available suggestion, typically after select.
    return filtered.length === 1 && filtered[0][key].toLowerCase() === pattern ? [] : filtered
  }
}
