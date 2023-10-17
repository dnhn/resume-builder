export const dateToMonthYear = (date: Date) =>
  date.toLocaleDateString(undefined, { month: '2-digit', year: 'numeric' })
