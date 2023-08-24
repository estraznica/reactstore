export const getTotalPriceFromLS = () => {
  const data = localStorage.getItem('totalPrice');
  const dataString: string = data ? JSON.parse(data) : [];
  const dataNumber = Number(dataString);
  return dataNumber;
};
