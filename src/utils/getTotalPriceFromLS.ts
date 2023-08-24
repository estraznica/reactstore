export const getTotalPriceFromLS = () => {
  const data = localStorage.getItem('totalPrice');
  const dataString: string = data ? JSON.parse(data) : [];
  const dataNumber = Number(dataString);
  console.log('get price ', dataNumber);
  return dataNumber;
};
