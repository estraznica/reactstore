import React from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Products from '../components/Products';
import styles from './home.module.scss';

function Home() {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <div className={styles.root}>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <Categories />
      <Products searchValue={searchValue} />
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
