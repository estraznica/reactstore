import Cart from './pages/Cart';
import Home from './pages/Home';
import Item from './pages/Item';
import Notfound from './pages/NotFound';
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
