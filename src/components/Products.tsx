import React from 'react';
import styles from './products.module.scss';
import ProductLoader from './ProductLoader';
import axios from 'axios';
import LoadMore from './LoadMore';
import { useSelector, useDispatch } from 'react-redux';
import { setItemId } from '../redux/slices/cartSlice';
import { setItemCount } from '../redux/slices/filterSlice';
import { Link } from 'react-router-dom';
//import qs from 'qs';

function Products({ searchValue }: { searchValue: any }) {
  const category = ['all', 'electronics', 'jewelery', `men's clothing`, `women's clothing`];
  const sortby = ['recommended', 'asc', 'desc'];
  const [products, setProducts] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const activeIndexCategory = useSelector((state: any) => state.filterReducer.activeIndexCategory);
  const activeIndexSort = useSelector((state: any) => state.filterReducer.activeIndexSort);
  const itemCount = useSelector((state: any) => state.filterReducer.itemCount);
  const dispatch = useDispatch();
  const onChangeCount = () => {
    dispatch(setItemCount());
  };

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://fakestoreapi.com/products${
          activeIndexCategory > 0 ? '/category/' + category[activeIndexCategory] : ''
        }${activeIndexSort > 0 ? '?sort=' + sortby[activeIndexSort] : ''}?&limit=${itemCount}`,
      )
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeIndexCategory, activeIndexSort, itemCount]);
  //fakestoreapi не умеет одновременно выдавать определенное количество товара и фильтровать по acs и desc?
  //оставила limit чтобы показать что могу загружать товары по кнопке
  const items = products.filter((products: any) => {
    if (products.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  }); //filter - статичный поиск по странице без бэкенда (fakestoreapi не поддерживает поиск?)

  //const itemId = useSelector((state: any) => state.cartReducer.itemId);
  const onClickItem = (id: any) => {
    dispatch(setItemId(id));
  }; //получаем id продукта

  return (
    <>
      <div className={styles.root}>
        {isLoading ? (
          [...new Array(8)].map((_, index) => (
            <ProductLoader className={styles.loader} key={index} />
          ))
        ) : items.length > 0 ? (
          items.map((products: any) => (
            <Link to="/item" key={products.id} className={styles.wrapp}>
              <div className={styles.product} onClick={() => onClickItem(products.id)}>
                <img className={styles.img} src={products.image} alt="Item" />
                <span className={styles.title}>{products.title}</span>
              </div>
              <span className={styles.price}> {products.price} $</span>
            </Link>
          ))
        ) : (
          <div className={styles.notfound} key="notfound">
            Nothing found..
          </div>
        )}
        {activeIndexCategory === 0 && itemCount <= 20 ? (
          <div onClick={() => onChangeCount()}>
            <LoadMore />
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default Products;
// const navigate = useNavigate();
// React.useEffect(() => {
//   const queryString = qs.stringify({
//     '/category/': category[activeIndexCategory],
//     'sort=': sortby[activeIndexSort],
//     '&limit=': itemCount,
//   });
//   navigate('?');
//   console.log(queryString);
// }, [activeIndexCategory, activeIndexSort, itemCount]);
