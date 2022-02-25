import React from 'react'
import './CardItem.css'
import Col from 'react-bootstrap/Col'
import CloseButton from 'react-bootstrap/CloseButton'
import Stack from 'react-bootstrap/Stack'
import dress3 from '../img/dress3.jpg'

export default function CartItem() {
  return (
    <>
      <Col xs={12} lg={6} className='mb-4'>
        <Stack className='cart-item' direction='horizontal'>
          <img className='cart-item-img' src={dress3} />
          <div className='card-item-detail ms-2'>
            <Stack>
              <div className='card-item-detail-1'>
                <h3>Long Dress</h3>
                <CloseButton className='me-3' variant='white' />
              </div>
              <div className='card-item-detail-2'>
                <div className='item-color me-3'></div>
                <div className='item-size'>S</div>
              </div>
              <div className='card-item-detail-3 pt-2'>
                <span className='item-price'>$45</span>
                <div className='item-btn-group me-3'>
                  <button className='item-btn'>-</button>
                  <span className='item-quantity'>1</span>
                  <button className='item-btn'>+</button>
                </div>
              </div>
            </Stack>
          </div>
        </Stack>
      </Col>
      <Col xs={12} lg={6} className='mb-4'>
        <Stack className='cart-item' direction='horizontal'>
          <img className='cart-item-img' src={dress3} />
          <div className='card-item-detail ms-2'>
            <Stack>
              <div className='card-item-detail-1'>
                <h3>Long Dress</h3>
                <CloseButton className='me-3' variant='white' />
              </div>
              <div className='card-item-detail-2'>
                <div className='item-color me-3'></div>
                <div className='item-size'>S</div>
              </div>
              <div className='card-item-detail-3 pt-2'>
                <span className='item-price'>$45</span>
                <div className='item-btn-group me-3'>
                  <button className='item-btn'>-</button>
                  <span className='item-quantity'>1</span>
                  <button className='item-btn'>+</button>
                </div>
              </div>
            </Stack>
          </div>
        </Stack>
      </Col>
      <Col xs={12} lg={6} className='mb-4'>
        <Stack className='cart-item' direction='horizontal'>
          <img className='cart-item-img' src={dress3} />
          <div className='card-item-detail ms-2'>
            <Stack>
              <div className='card-item-detail-1'>
                <h3>Long Dress</h3>
                <CloseButton className='me-3' variant='white' />
              </div>
              <div className='card-item-detail-2'>
                <div className='item-color me-3'></div>
                <div className='item-size'>S</div>
              </div>
              <div className='card-item-detail-3 pt-2'>
                <span className='item-price'>$45</span>
                <div className='item-btn-group me-3'>
                  <button className='item-btn' disabled >-</button>
                  <span className='item-quantity'>1</span>
                  <button className='item-btn'>+</button>
                </div>
              </div>
            </Stack>
          </div>
        </Stack>
      </Col>
    </>
  )
}
