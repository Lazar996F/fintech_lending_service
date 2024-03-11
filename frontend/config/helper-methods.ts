export const getCurrencyFormat = (amount: number) => {
  return amount
    ? amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    : '0';
};
