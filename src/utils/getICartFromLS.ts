import { CartItem } from '../redux/slices/cartSlice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const dataItem: CartItem[] = data ? JSON.parse(data) : [];
  console.log('getItems', dataItem);
  return dataItem;
};
