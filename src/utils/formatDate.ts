export const dateToMonthYear = (date: Date) =>
  new Date(date).toLocaleDateString(undefined, {
    month: '2-digit',
    year: 'numeric',
  })
