export const paramToInt = (param: string | string[] | undefined) => {
  if (typeof param == 'string') return parseInt(param)
  else return -1
}

export const dateToHourMinString = (time: Date) => {
  return (
    time.getHours().toString() +
    ':' +
    (time.getMinutes() < 10 ? '0' + time.getMinutes().toString() : time.getMinutes().toString())
  )
}
