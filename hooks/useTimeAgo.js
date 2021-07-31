import { useEffect, useState } from 'react'

const RECALCULATION_TIME = 15 * 1000
const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()

  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondInUnit || unit === 'second') {
      const value = Math.floor(elapsed / secondInUnit)
      return { value: value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const recalculatedTimeAgo = getDateDiffs(timestamp)
      setTimeAgo(recalculatedTimeAgo)
    }, RECALCULATION_TIME)
    return () => clearInterval(interval)
  }, [timestamp])

  const rtf = new Intl.RelativeTimeFormat(navigator.language, {
    style: 'short',
  })

  const { value, unit } = timeAgo

  return rtf.format(value, unit)
}
