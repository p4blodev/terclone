const LANGUAGE = 'us'

export default function useDateTimeFormat(timestamp) {
  const date = new Date(timestamp)

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  return new Intl.DateTimeFormat(LANGUAGE, options).format(date)
}
