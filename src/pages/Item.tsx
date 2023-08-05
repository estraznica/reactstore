import React from 'react';
import styles from './item.module.scss';
import { useSelector, useDispatch } from 'react-redux';
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

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
  description: string;
}

function Item() {
  const [isLoading, setLoading] = React.useState(true);

  const itemId = useSelector((state: any) => state.cartReducer.itemId);
  const quantity = useSelector((state: any) => state.cartReducer.quantity);
  const items = useSelector((state: any) => state.cartReducer.items);

  const [product, setProduct] = React.useState<Product | null>(null);
  React.useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${itemId}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [itemId]);

  const dispatch = useDispatch();
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
                        <div onClick={() => dispatch(decrement())} className={styles.minus}>
                          -
                        </div>
                        <div className={styles.number}>{quantity}</div>
                        <div onClick={() => dispatch(increment())} className={styles.plus}>
                          +
                        </div>
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
}

export default Item;
