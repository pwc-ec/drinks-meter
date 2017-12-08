export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString()
}

export const formatNumber = (relative: boolean = false, axis: boolean = false) => (num: number) => {
  if (relative) {
    if (num > 0) {
      num = Math.round(Math.exp(num))
    } else if (num < 0) {
      num = -Math.round(Math.exp(Math.abs(num)))
    }
  }
  if (axis && relative) {
    if (Math.abs(num) > 1000000000) {
      return Math.round(num / 1000000000) + 'B'
    } else if (Math.abs(num) > 1000000) {
      return Math.round(num / 1000000) + 'M'
    } else if (Math.abs(num) > 1000) {
      return Math.round(num / 1000) + 'K'
    }
  } else {
    if (!(num % 100000000)) {
      return num / 1000000000 + 'B'
    } else if (!(num % 100000)) {
      return num / 1000000 + 'M'
    } else if (!(num % 100)) {
      return num / 1000 + 'K'
    }
  }
  return num
}

export const formatQuarter = (quarter: number) =>
  quarter
    .toString()
    .slice(-2)
    .replace('0', 'Q')

export const formatQuarterLabel = (fullQuarter: number | string) => {
  if (fullQuarter) {
    const qString = fullQuarter.toString()
    const quarter = qString.slice(-2).replace('0', 'Q')
    const year = Number.parseInt(fullQuarter.toString().slice(0, 4))
    if (quarter === 'Q4') {
      return year + quarter + '/' + (year + 1)
    }
    return year + quarter
  }
}
