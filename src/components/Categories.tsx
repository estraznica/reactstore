import React from 'react';
import styles from '../scss/components/categories.module.scss';
import Sort from './Sort';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveIndexCategory } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const Categories: React.FC = () => {
  const category: string[] = [
    'all',
    'electronics',
    'jewelery',
    `men's clothing`,
    `women's clothing`,
  ];

  const dispatch = useDispatch();
  const activeIndexCategory = useSelector(
    (state: RootState) => state.filterReducer.activeIndexCategory,
  );
  const onChangeCategory = (index: number) => {
    dispatch(setActiveIndexCategory(index));
  };

  return (
    <>
      <div className={styles.root}>
        <ul>
          {category.map((value, index) => (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={activeIndexCategory === index ? styles.active : ''}>
              {value}
            </li>
          ))}
          <li className={styles.line}>|</li>
          <li className={styles.sort}>
            <Sort />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Categories;
