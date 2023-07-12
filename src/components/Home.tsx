import React from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Products from '../components/Products';

function Home() {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <Categories />
      <Products searchValue={searchValue} />
      <Footer />
    </>
  );
}

export default Home;
