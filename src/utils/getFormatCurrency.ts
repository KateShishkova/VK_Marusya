export const getFormatCurrency = (amount: string): string => {
  return `${Number(amount).toLocaleString('ru-RU')} руб.`
}