import React from 'react'
import './FavoriteItem.css'
import Col from 'react-bootstrap/Col'
import CloseButton from 'react-bootstrap/CloseButton'
import Stack from 'react-bootstrap/Stack'
import dress2 from '../img/dress2.jpg'

export default function CartItem() {
  return (
    <>
      <Col xs={12} lg={6} className='mb-4'>
        <Stack className='cart-item' direction='horizontal'>
          <img className='cart-item-img' src={dress2} />
          <div className='card-item-detail ms-2'>
            <Stack>
              <div className='card-item-detail-1'>
                <h3 className='item-name'>Long Dress</h3>
                <CloseButton className='me-3' variant='white' />
              </div>
              <div className='card-item-detail-2'>
                <span className='item-price'>$45</span>
              </div>
              <div className='card-item-detail-3 pt-2'>
                <button className='add-to-cart-btn'>ADD TO CART</button>
              </div>
            </Stack>
          </div>
        </Stack>
      </Col>
    </>
  )
}
