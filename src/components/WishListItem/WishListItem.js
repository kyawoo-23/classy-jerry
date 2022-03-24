import React from 'react'
import './WishListItem.css'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import CloseButton from 'react-bootstrap/CloseButton'
import Stack from 'react-bootstrap/Stack'
import { useGetDoc } from '../../hooks/useGetDoc'
import { useFirestore } from '../../hooks/useFirestore'

export default function WishListItem({ itemId }) {
  const { document } = useGetDoc('itemsList', itemId)
  const { updateAndRemoveItem } = useFirestore()

  const handleRemove = () => {
    updateAndRemoveItem('users', itemId, 'wishList')
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
                  <CloseButton 
                    className='me-3' 
                    variant='white' 
                    onClick={handleRemove} 
                  />
                </div>
                <div className='card-item-detail-2'>
                  <span className='item-price'><span>$</span>{document.price}</span>
                </div>
                <div className='card-item-detail-3 pt-2'>
                  <button className='add-to-cart-btn'>ADD TO CART</button>
                </div>
              </Stack>
            </div>
          </Stack>
        </Col>
      )}
    </>
  )
}
