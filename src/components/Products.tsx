import React from 'react';
import styles from '../scss/components/products.module.scss';
import ProductLoader from './ProductLoader';
import LoadMore from './LoadMore';
import { useSelector, useDispatch } from 'react-redux';
import { setItemId } from '../redux/slices/cartSlice';
import { setItemCount } from '../redux/slices/filterSlice';
import { fetchProducts } from '../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';

type SearchProps = {
  searchValue: string;
};
type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
  description: string;
};

const Products: React.FC<SearchProps> = ({ searchValue }) => {
  const { products, status } = useSelector((state: any) => state.productReducer);

  const category: string[] = [
    'all',
    'electronics',
    'jewelery',
    `men's clothing`,
    `women's clothing`,
  ];
  const sortby: string[] = ['recommended', 'asc', 'desc'];
  //const [isLoading, setLoading] = React.useState(true);

  const { activeIndexCategory, activeIndexSort, itemCount } = useSelector(
    (state: any) => state.filterReducer,
  );
  const dispatch = useDispatch();
  const onChangeCount = () => {
    dispatch(setItemCount());
  };

  const getProducts = async () => {
    //setLoading(true);
    //try {
    dispatch(
      fetchProducts({
        activeIndexCategory,
        activeIndexSort,
        itemCount,
        sortby,
        category,
      }) as unknown as AnyAction,
    );

    window.scrollTo({ top: 0, behavior: 'smooth' });
    // } catch (error) {
    //   console.log('ERROR:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  React.useEffect(() => {
    getProducts();
  }, [activeIndexCategory, activeIndexSort, itemCount]);
  //fakestoreapi не умеет одновременно выдавать определенное количество товара и фильтровать по acs и desc?
  //оставила limit чтобы показать что могу загружать товары по кнопке

  const items =
    products &&
    products.filter((products: Product) => {
      if (products.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    }); //filter - статичный поиск по странице без бэкенда (fakestoreapi не поддерживает поиск?)

  const onClickItem = (id: number) => {
    dispatch(setItemId(id));
  }; //получаем id продукта

  return (
    <>
      <div className={styles.root}>
        {status === 'loading' ? (
          [...new Array(8)].map((_, index) => (
            <div className={styles.loader} key={index}>
              {' '}
              <ProductLoader />
            </div>
          ))
        ) : items?.length > 0 ? (
          items.map((products: Product) => (
            <Link to={`/item/${products.id}`} key={products.id} className={styles.wrapp}>
              <div className={styles.product} onClick={() => onClickItem(products.id)}>
                <img className={styles.img} src={products.image} alt="Item" />
                <span className={styles.title}>{products.title}</span>
              </div>
              <span className={styles.price}> {products.price} $</span>
            </Link>
          ))
        ) : status === 'error' ? (
          ''
        ) : (
          <div className={styles.notfound} key="notfound">
            Nothing found..
          </div>
        )}
        {activeIndexCategory === 0 && itemCount <= 20 && items?.length! > 0 ? (
          <div onClick={() => onChangeCount()}>
            <LoadMore />
          </div>
        ) : (
          ''
        )}
        {status === 'error' ? <div className={styles.error}>Error has occurred :( </div> : ''}
      </div>
    </>
  );
};

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

// const [products, setProducts] = React.useState([]);

// const res = await axios.get(
//   `https://fakestoreapi.com/products${
//     activeIndexCategory > 0 ? '/category/' + category[activeIndexCategory] : ''
//   }${activeIndexSort > 0 ? '?sort=' + sortby[activeIndexSort] : ''}?&limit=${itemCount}`,
// );
// dispatch(setProducts(res.data));
