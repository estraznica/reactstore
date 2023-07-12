import React from 'react';
import styles from './cart.module.scss';
import Loader from './Loader';
import HeaderNoFind from './HeaderNoFind';
import { useSelector } from 'react-redux';

function Cart() {
  const items = useSelector((state: any) => state.cartReducer.items);

  const [products, setProducts] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch(`https://fakestoreapi.com/products/1`)
      .then((res) => res.json())
      .then((arr) => {
        setProducts(arr);
        setLoading(false);
      });
  }, []); //для того чтобы отобразить loader

  return (
    <>
      <HeaderNoFind />
      <div className={styles.root}>
        {isLoading ? (
          <Loader />
        ) : (
          items.map((items: any) => (
            <div className={styles.wrapp} key={items.id}>
              <img src={items.image} alt="Item" />
              <span className={styles.title}>{items.title}</span>
              <span className={styles.price}> {items.price} $</span>
              <span className={styles.quantity}>Quantity: {items.quantity}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Cart;
