import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home'
import Search from './pages/Search'
import Cart from './pages/Cart'
import Favorite from './pages/Favorite'
import Orders from './pages/Orders';
import Login from './pages/Login'
import Categories from './pages/Categories';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<Navigate replace to='/categories/all' />} />
          <Route path='/categories/:option' element={<Categories />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/search' element={<Search />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Navigate replace to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
