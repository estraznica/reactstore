import React from 'react';
import styles from '../scss/components/quantity.module.scss';
import { useSelector } from 'react-redux';
import { increment, decrement, resetQuantity } from '../redux/slices/cartSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Quantity: React.FC = () => {
  const itemId = useSelector((state: RootState) => state.cartReducer.itemId);
  const quantity = useSelector((state: RootState) => state.cartReducer.quantity);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(resetQuantity());
  }, [dispatch, itemId]);

  return (
    <>
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
    </>
  );
};

export default Quantity;
