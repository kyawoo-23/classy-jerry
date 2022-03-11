import React, { useState } from 'react'
import './CartItem.css'
import Col from 'react-bootstrap/Col'
import CloseButton from 'react-bootstrap/CloseButton'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'

export default function CartItem({ setSettleItem }) {
  const [itemQty, setItemQty] = useState({})

  const handleQty = ({ target: { name, value } }) => {
    setItemQty({
      ...itemQty,
      [name]: value
    })
  }

  const handleRemove = (item) => {
    console.log(item)
    setSettleItem(item)
  }

  return (
    <>
    {['dress1', 'dress2', 'dress3'].map((item, idx) => (
      <Col xs={12} lg={6} className='mb-4' key={idx}>
        <Stack className='cart-item' direction='horizontal'>
          <img className='cart-item-img' src={require(`../../img/${item}.jpg`)} />
          <div className='card-item-detail ms-2'>
            <Stack>
              <div className='card-item-detail-1'>
                <h3 className='item-name'>{item}</h3>
                <CloseButton className='me-3' variant='white' onClick={() => handleRemove(item)} />
              </div>
              <div className='card-item-detail-2'>
                <div className='item-color active me-3' style={{backgroundColor: 'red'}}></div>
                <div className='item-size active'>S</div>
              </div>
              <div className='card-item-detail-3 pt-2'>
                <span className='item-price'>$45</span>
                <div className='item-btn-group me-3'>
                <Form.Control disabled className='item-qty' type="number" min="1" max="99" onChange={handleQty} placeholder="1" name={item} />
                </div>
              </div>
            </Stack>
          </div>
        </Stack>
      </Col>
    ))}
    </>
  )
}
