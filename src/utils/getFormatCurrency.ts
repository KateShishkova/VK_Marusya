export const getFormatCurrency = (amount: string): string => {
  const num = Number(amount);

  if (isNaN(num)) {
    return "NaN руб.";
  }

  return `${Number(num).toLocaleString("ru-RU")} руб.`;
};
