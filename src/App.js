import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import Cart from './pages/Cart/Cart'
import WishList from './pages/WishList/WishList'
import Orders from './pages/Orders/Orders'
import Login from './pages/Login/Login'
import Categories from './pages/Categories/Categories'
import ItemDetails from './pages/ItemDetails/ItemDetails'
import Admin from './pages/Admin'
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Navigate replace to='/categories/all' />} />
            <Route path='/categories/:option' element={<Categories />} />
            <Route path='/items' element={<Navigate replace to='/' />} />
            <Route path='/items/:id' element={<ItemDetails />} />
            <Route path='/cart' 
              element={user ? <Cart /> : <Navigate replace to='/login' />} 
            />
            <Route path='/wishlist' 
              element={user ? <WishList /> : <Navigate replace to='/login' />} 
            />
            <Route path='/search' element={<Search />} />
            <Route path='/orders' 
              element={user ? <Orders /> : <Navigate replace to='/login' />} 
            />
            <Route path='/login' 
              element={user ? <Navigate replace to='/' /> : <Login />} 
            />
            <Route path='/admin' element={<Admin />} />
            <Route path='/*' element={<Navigate replace to='/' />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
