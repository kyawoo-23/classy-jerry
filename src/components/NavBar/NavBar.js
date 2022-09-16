import React, { useEffect, useState } from 'react'
import './NavBar.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { LinkContainer } from 'react-router-bootstrap'
import { useLogout } from '../../hooks/useLogout'
import { useDocOnSnapshot } from '../../hooks/useDocOnSnapshot'
import { useAuthContext } from '../../hooks/useAuthContext'

import cartIcon from '../../icons/353439_basket_purse_shopping_cart_ecommerce_icon.svg'
import favIcon from '../../icons/211673_heart_icon.svg'
import searchIcon from '../../icons/211817_search_strong_icon.svg'
import defaultUserIcon from '../../icons/1564535_customer_account_person_icon.svg'
import homeIcon from '../../icons/326656_home_icon.svg'
import ordersIcon from '../../icons/truck-solid.svg'
import loginIcon from '../../icons/login_icon.svg'
import logoutIcon from '../../icons/logout_icon.svg'
import logo from '../../icons/logo.svg'

export default function NavBar() {
  const [showCanvas, setShowCanvas] = useState(false)
  const { logout, isPending, error } = useLogout()
  const { user } = useAuthContext()
  const { document } = useDocOnSnapshot("users", user ? user.uid : 'no-user')

  useEffect(() => {
    
  }, [user, document])

  return (
    <Navbar variant='dark' expand={false} sticky="top">
      <Container>
        <Navbar.Toggle 
          aria-controls="offcanvasNavbar" 
          onClick={() => setShowCanvas(true)} 
        />
        <LinkContainer to="/">
          <Navbar.Brand className='me-auto ms-2'>
            <img className='nav-logo ms-md-3 me-2 me-md-3' src={logo} alt='logo'/>
            Classy Jerry
          </Navbar.Brand>
        </LinkContainer>
        <LinkContainer to="/cart">
          <Nav.Link className='nav-link-highlight d-flex align-items-start'>
            <img src={cartIcon} className='nav-icon' alt='cart-icon'/>
            {user && document && document.cart && document.cart.length !== 0 && (
              <span className='cart-quantity'>{document.cart.length}</span>
            )}
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/wishlist">
          <Nav.Link className='nav-link-highlight d-none d-md-block'>
            <img src={favIcon} className='nav-icon' alt='fav-icon'/>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/search">
          <Nav.Link className='nav-link-highlight d-none d-md-block'>
            <img src={searchIcon} className='nav-icon' alt='search-icon'/>
          </Nav.Link>
        </LinkContainer>
      
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          show={showCanvas}
          onHide={() => setShowCanvas(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img src={user ? user.photoURL : defaultUserIcon} className='user-img' alt='user-profile-img' referrerPolicy="no-referrer" />
              <h4 className='user-name'>{user ? user.displayName : 'User Name'}</h4>
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <LinkContainer 
                className='menu-link'
                to="/" 
                onClick={() => setShowCanvas(false)}
              >
                <Nav.Link>
                  <img src={homeIcon} className='menu-icon' alt='home-icon'/>
                  <span className='menu-title'>Home</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer 
                className='menu-link' 
                to="/cart" 
                onClick={() => setShowCanvas(false)}
              >
                <Nav.Link>
                  <img src={cartIcon} className='menu-icon' alt='cart-icon'/>
                  <span className='menu-title'>Shopping Cart</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer 
                className='menu-link'
                to="/wishlist" 
                onClick={() => setShowCanvas(false)}
              >
                <Nav.Link>
                  <img src={favIcon} className='menu-icon' alt='fav-icon'/>
                  <span className='menu-title'>Favorites</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer 
                className='menu-link'
                to="/search" 
                onClick={() => setShowCanvas(false)}
              >
                <Nav.Link>
                  <img src={searchIcon} className='menu-icon' alt='fav-icon'/>
                  <span className='menu-title'>Search</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer 
                className='menu-link'
                to="/orders" 
                onClick={() => setShowCanvas(false)}
              >
                <Nav.Link>
                  <img src={ordersIcon} className='menu-icon' alt='orders-icon'/>
                  <span className='menu-title'>My Orders</span>
                </Nav.Link>
              </LinkContainer>
              <hr />
              {['all', 'top', 'bottom', 'headwear', 'shoes', 'accessories'].map((option, idx) => (
                <LinkContainer 
                  className='menu-link'
                  to={`/categories/${option}`}
                  onClick={() => setShowCanvas(false)}
                  key={idx}
                >
                  <Nav.Link>
                    <img src={require(`../../icons/${option}.svg`)} className='menu-icon' alt={`${option}-icon`}/>
                    <span className='menu-title'>{option}</span>
                  </Nav.Link>
                </LinkContainer>
              ))}
              <hr />
              {!user && (
                <LinkContainer 
                  className='menu-link'
                  to="/login" 
                  onClick={() =>  setShowCanvas(false)}
                >
                  <Nav.Link>
                    <img src={loginIcon} className='menu-icon' alt={'login-icon'} />
                    <span className='menu-title'>Login</span>
                  </Nav.Link>
                </LinkContainer>
              )}
              {user && (
                <Nav.Link className='menu-link' onClick={logout} disabled={isPending}>
                  <img src={logoutIcon} className='menu-icon' alt={'logout-icon'} />
                  <span className='menu-title'>{isPending ? 'Logging out' : 'Logout'}</span>
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
