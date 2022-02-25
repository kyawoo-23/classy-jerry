import React from 'react'
import './Cart.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CartItem from '../components/CartItem'

export default function Cart() {
  return (
    <Container>
      <h2 className='main-title'>Shopping Cart</h2>
      <p className='sub-title'>Total [ 3 ] items</p>
      <Row className='cart'>
        <CartItem />
      </Row>
      <div className='settle-now-btn-group'>
        <span className='total-price'>Total: $120</span>
        <button className='settle-now-btn'>SETTLE NOW</button>
      </div>
    </Container>
  )
}
