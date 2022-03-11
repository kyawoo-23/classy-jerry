import React, { useState } from 'react'
import './Cart.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CartItem from '../../components/CartItem/CartItem'

export default function Cart() {
  const [settleItem, setSettleItem] = useState('')

  const handleSettleNow = e => {
    e.preventDefault()
    console.log(settleItem)
  }

  return (
    <Container>
      <h2 className='main-title'>Shopping Cart</h2>
      <p className='sub-title'>Total [ 3 ] items</p>
      <Row className='cart'>
        <CartItem setSettleItem={setSettleItem} />
      </Row>
      <div className='settle-now-btn-group'>
        <span className='total-price'>Total: $120</span>
        <button className='settle-now-btn' onClick={handleSettleNow}>SETTLE NOW</button>
      </div>
    </Container>
  )
}
