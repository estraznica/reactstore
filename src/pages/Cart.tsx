import React from 'react';
import styles from '../scss/pages/cart.module.scss';
import Loader from '../components/Loader';
import HeaderNoFind from '../components/HeaderNoFind';
import { useSelector, useDispatch } from 'react-redux';
import { setItemId, updateCart, calculateTotalQuantity } from '../redux/slices/cartSlice';
import Footer from '../components/Footer';

function Cart() {
  type Product = {
    id: number;
    image: string;
    title: string;
    price: number;
    category: string;
    description: string;
  };

  const items = useSelector((state: any) => state.cartReducer.items);

  const [products, setProducts] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch(`https://fakestoreapi.com/products/1`)
      .then((res) => res.json())
      .then((arr) => {
        setProducts(arr);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []); //для того чтобы отобразить loader
  const dispatch = useDispatch();

  const onClickDelete = (id: any) => {
    dispatch(setItemId(id));
    const index = items.findIndex((item: Product) => item.id === id);
    dispatch(updateCart(index));
    dispatch(calculateTotalQuantity());
  };

  const totalPrice = Number(useSelector((state: any) => state.cartReducer.totalPrice).toFixed(2));
  const totalQuantity = useSelector((state: any) => state.cartReducer.totalQuantity);

  const item = items.map((items: any) => (
    <div className={styles.wrapp} key={items.id}>
      <div className={styles.wrappimg}>
        <img src={items.image} alt="Item" />
      </div>
      <div className={styles.wrapptext}>
        <div className={styles.title}>{items.title}</div>
        <div className={styles.price}> {items.price} $</div>
        <div className={styles.quantity}>Quantity: {items.quantity}</div>
        <button className={styles.delete} onClick={() => onClickDelete(items.id)} title="Delete">
          <svg
            width="28px"
            height="28px"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#656565">
            <polyline points="52 16 48 56 16 56 12 16" strokeWidth="3" strokeLinecap="round" />
            <path
              strokeWidth="3"
              d="M20 16v-3.94A4.06 4.06 0 0 1 24.06 8h15.88A4.06 4.06 0 0 1 44 12.06V16"
              strokeLinecap="round"
            />
            <line x1="8" y1="16" x2="56" y2="16" strokeWidth="3" strokeLinecap="round" />
            <line x1="24" y1="28" x2="40" y2="44" strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="28" x2="24" y2="44" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  ));

  return (
    <div className={styles.root}>
      <HeaderNoFind />
      <div className={styles.box}>
        {isLoading ? (
          <Loader />
        ) : items.length === 0 ? (
          <>
            <div className={styles.empty}>
              <div>
                <svg
                  fill="#000"
                  width="100px"
                  height="100px"
                  viewBox="0 0 56 56"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M 20.0079 39.6485 L 47.3596 39.6485 C 48.2735 39.6485 49.0703 38.8985 49.0703 37.8907 C 49.0703 36.8829 48.2735 36.1328 47.3596 36.1328 L 20.4063 36.1328 C 19.0704 36.1328 18.2501 35.1953 18.0391 33.7656 L 17.6641 31.3047 L 47.4062 31.3047 C 50.8281 31.3047 52.5859 29.1953 53.0783 25.8438 L 54.9532 13.4453 C 55.0003 13.1407 55.0468 12.7656 55.0468 12.5547 C 55.0468 11.4297 54.2030 10.6563 52.9142 10.6563 L 14.6407 10.6563 L 14.1954 7.6797 C 13.9610 5.8750 13.3048 4.9609 10.9141 4.9609 L 2.6876 4.9609 C 1.7501 4.9609 .9532 5.7813 .9532 6.7188 C .9532 7.6797 1.7501 8.5000 2.6876 8.5000 L 10.6094 8.5000 L 14.3594 34.2344 C 14.8516 37.5625 16.6094 39.6485 20.0079 39.6485 Z M 51.0623 14.1953 L 49.3987 25.4219 C 49.2110 26.8750 48.4377 27.7656 47.0548 27.7656 L 17.1485 27.7891 L 15.1563 14.1953 Z M 21.8594 51.0391 C 23.9688 51.0391 25.6563 49.375 25.6563 47.2422 C 25.6563 45.1328 23.9688 43.4453 21.8594 43.4453 C 19.7266 43.4453 18.0391 45.1328 18.0391 47.2422 C 18.0391 49.375 19.7266 51.0391 21.8594 51.0391 Z M 43.7735 51.0391 C 45.9062 51.0391 47.5939 49.375 47.5939 47.2422 C 47.5939 45.1328 45.9062 43.4453 43.7735 43.4453 C 41.6641 43.4453 39.9532 45.1328 39.9532 47.2422 C 39.9532 49.375 41.6641 51.0391 43.7735 51.0391 Z" />
                </svg>
              </div>
              <div>Cart is empty..</div>
            </div>
          </>
        ) : (
          <div className={styles.wrapper}>
            <div>{item}</div>
            <div className={styles.total}>
              <div>
                <b>Order price:</b>
              </div>
              <div className={styles.itemsworth}>
                <div className={styles.itemsworthtext}>{totalQuantity} items worth </div>
                <div className={styles.itemsworthtext}> {totalPrice} $</div>
              </div>
              <hr />
              <div className={styles.login}>Log in to get 10% off your first three orders</div>
              <hr />
              <div className={styles.totalprice}>
                <div>Total: </div> <div>{totalPrice} $</div>
              </div>
              <button className={styles.continue}>Continue to checkout</button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Cart;
