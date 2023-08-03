import Cart from './components/Cart';
import Home from './components/Home';
import Item from './components/Item';
import Notfound from './components/NotFound';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/item" element={<Item />} />
      </Routes>
    </>
  );
}

export default App;
