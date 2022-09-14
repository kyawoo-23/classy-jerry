import React, { useEffect, useState } from 'react'
import './CartItem.css'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import CloseButton from 'react-bootstrap/CloseButton'
import Stack from 'react-bootstrap/Stack'
import { useGetDoc } from '../../hooks/useGetDoc'
import { useFirestore } from '../../hooks/useFirestore'
import allIcon from '../../icons/all.svg'

export default function CartItem({ setTotalAmount, flag, setFlag, itemId, itemColor, itemSize, itemQty }) {
  const { document } = useGetDoc('itemsList', itemId, itemColor, itemSize, itemQty, 'cart')
  const { updateAndRemoveItem } = useFirestore()

  useEffect(() => {
    if (document && flag === false) {
      let amount = itemQty * document.price
      // console.log('To add ', amount)
      setTotalAmount(prevAmount => prevAmount + amount)
      setFlag(false)
    } 
    if (flag === true) {
      setFlag(false)
    }
  }, [document])

  const handleRemove = () => {
    updateAndRemoveItem('users', itemId, 'cart', itemColor, itemSize, itemQty)
    let amount = itemQty * document.price
    // console.log('To remove ', amount)
    setTotalAmount(prevAmount => prevAmount - amount)
    setFlag(true)
  }

  return (
    <>
      {document && (
        <Col xs={12} lg={6} className='mb-4' key={itemId}>
          <Stack className='cart-item' direction='horizontal'>
            <Link to={`/items/${itemId}`}>
              <img className='cart-item-img' src={document.primaryImgURL.url} alt="item img" />
            </Link>
            <div className='card-item-detail ms-2'>
              <Stack>
                <div className='card-item-detail-1'>
                  <h3 className='item-name'>{document.name}</h3>
                  <CloseButton className='me-3' variant='white' onClick={handleRemove} />
                </div>
                <div className='card-item-detail-2'>
                  <div className='item-color active me-3' style={{backgroundColor: itemColor}}></div>
                  <div className='item-size active'>{itemSize}</div>
                </div>
                <div className='card-item-detail-3 pt-2'>
                  <span className='item-price'><span>$</span>{document.price}</span>
                  <span className='item-quantity'>
                    <img className='qty-icon' src={allIcon} alt='qty-icon'/>
                    {itemQty}
                  </span>
                </div>
              </Stack>
            </div>
          </Stack>
        </Col>
      )}
    </>
  )
}
