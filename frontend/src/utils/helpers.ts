export function formatDate(date:Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
export const dateEquals = (date1: Date, date2: Date) => {
  const dateYear1 = date1.getFullYear()
  const dateMonth1 = date1.getMonth()
  const dateDays1 = date1.getDate()

  const dateYear2 = date2.getFullYear()
  const dateMonth2 = date2.getMonth()
  const dateDays2 = date2.getDate()

  return dateYear1 === dateYear2 
  && dateMonth1 === dateMonth2 
  && dateDays1 === dateDays2
}

// Возвращаем объект даты с сохранением времени из первого аргумента
export const setDefaultTime = (date1: Date, itemDate: Date) => {
  const h = itemDate.getHours()
  const m = itemDate.getMinutes()
  const s = itemDate.getSeconds()

  const resultDate = new Date(date1)
  resultDate.setHours(h)
  resultDate.setMinutes(m)
  resultDate.setSeconds(s)
  return resultDate
}

export const isEmail = (email:string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
}