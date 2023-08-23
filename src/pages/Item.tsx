import React from 'react';
import styles from '../scss/pages/item.module.scss';
import { useSelector } from 'react-redux';

import {
  addProduct,
  increment,
  decrement,
  resetQuantity,
  updateProduct,
  calculateTotalQuantity,
} from '../redux/slices/cartSlice';
import axios from 'axios';
import Loader from '../components/Loader';
import HeaderNoFind from '../components/HeaderNoFind';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  category?: string;
  description?: string;
};

const Item: React.FC = () => {
  const navigate = useNavigate();
  const getId = useParams();
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const itemId = useSelector((state: RootState) => state.cartReducer.itemId);
  const quantity = useSelector((state: RootState) => state.cartReducer.quantity);
  const totalPrice = useSelector((state: RootState) => state.cartReducer.totalPrice);
  const items = useSelector((state: RootState) => state.cartReducer.items);
  const [product, setProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${getId.id}`)
      .then((res) => {
        if (res.data.length === 0) {
          setLoading(false);
          navigate('*');
        }
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert('An error occurred, return to home page');
        navigate('/');
      });
  }, [itemId]);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(resetQuantity());
  }, [dispatch, itemId]);

  const onClickAdd = () => {
    if (product !== null) {
      const item = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        image: product.image,
      };
      const existingItem = items.find((item: Product) => item.id === itemId);
      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + item.quantity };
        dispatch(updateProduct(updatedItem));
      } else {
        dispatch(addProduct(item));
      }
      dispatch(calculateTotalQuantity());
    }
  };

  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const data = JSON.stringify(items);
      localStorage.setItem('cart', data);
      const price = JSON.stringify(totalPrice);
      localStorage.setItem('totalPrice', price);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className={styles.root}>
      <HeaderNoFind />
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div key={product?.id}>
            {product && (
              <div className={styles.product}>
                <div className={styles.item}>
                  <div className={styles.imagewrapp}>
                    <img src={product.image} alt="Item" className={styles.img} />
                  </div>
                  <div className={styles.tocart}>
                    <div className={styles.title}>{product.title}</div>
                    <div className={styles.price}> {product.price} $</div>
                    <div className={styles.quantity}>
                      <span>Quantity</span>
                      <div className={styles.quantitybutton}>
                        <button
                          disabled={quantity === 1}
                          onClick={() => dispatch(decrement())}
                          className={styles.minus}>
                          -
                        </button>
                        <div className={styles.number}>{quantity}</div>
                        <button onClick={() => dispatch(increment())} className={styles.plus}>
                          +
                        </button>
                      </div>
                    </div>
                    <button className={styles.add} onClick={() => onClickAdd()}>
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className={styles.description}>
                  <div>Description</div> <div>{product.description}</div>
                </div>
                <div className={styles.category}>
                  <span>Category:</span> {product.category}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Item;
