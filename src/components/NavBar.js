import React, { useState } from 'react'
import './NavBar.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {LinkContainer} from 'react-router-bootstrap'

import cartIcon from '../icons/353439_basket_purse_shopping_cart_ecommerce_icon.svg'
import favIcon from '../icons/211673_heart_icon.svg'
import searchIcon from '../icons/211817_search_strong_icon.svg'
import defaultUserIcon from '../icons/1564535_customer_account_person_icon.svg'
import homeIcon from '../icons/326656_home_icon.svg'
import ordersIcon from '../icons/truck-solid.svg'
import loginIcon from '../icons/right-to-bracket-solid.svg'

export default function NavBar() {
  const [showCanvas, setShowCanvas] = useState(false)
  return (
    <Navbar variant='dark' expand={false}>
      <Container>
        <Navbar.Toggle 
          aria-controls="offcanvasNavbar" 
          onClick={() => setShowCanvas(true)} 
        />
        <Navbar.Brand className='me-auto ms-2' href="/">ClassyJerry</Navbar.Brand>
        <LinkContainer to="/cart">
          <Nav.Link className='nav-link-highlight'>
            <img src={cartIcon} className='nav-icon' alt='cart-icon'/>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/favorite">
          <Nav.Link className='nav-link-highlight'>
            <img src={favIcon} className='nav-icon' alt='fav-icon'/>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/search">
          <Nav.Link className='nav-link-highlight'>
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
              <img src={defaultUserIcon} className='user-img' alt='user-icon' />
              <h4 className='user-name'>User Name</h4>
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
                to="/favorite" 
                onClick={() => setShowCanvas(false)}
              >
                <Nav.Link>
                  <img src={favIcon} className='menu-icon' alt='fav-icon'/>
                  <span className='menu-title'>Favorites</span>
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
                    <img src={require(`../icons/${option}.svg`)} className='menu-icon' alt={`${option}-icon`}/>
                    <span className='menu-title'>{option}</span>
                  </Nav.Link>
                </LinkContainer>
              ))}
              <hr />
              <LinkContainer 
                className='menu-link'
                to="/login" 
                onClick={() => setShowCanvas(false)}
              >
                <Nav.Link>
                  <img src={loginIcon} className='menu-icon' alt='login-icon'/>
                  <span className='menu-title'>Login</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
