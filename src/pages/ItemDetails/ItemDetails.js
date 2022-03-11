import React, { useEffect, useState } from 'react'
import './ItemDetails.css'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { useGetDoc } from '../../hooks/useGetDoc'
import heartNull from '../../icons/heart-null.png'
import heart from '../../icons/heart.png'

export default function ItemDetails() {
  const { id } = useParams()
  const { document, isPending, error } = useGetDoc('itemsList', id)
  const [activeSize, setActiveSize] = useState(0)
  const [activeColor, setActiveColor] = useState(0)
  const [itemSize, setItemSize] = useState(null)
  const [itemColor, setItemColor] = useState(null)
  const [itemQty, setItemQty] = useState(1)

  const handleColor = (color, idx) => {
    setItemColor(color)
    setActiveColor(idx)
  }
  
  const handleSize = (size, idx) => {
    setItemSize(size)
    setActiveSize(idx)
  }

  const handleQty = e => {
    setItemQty(e.target.value)
  }

  const handleWishList = e => {
    e.preventDefault()
    console.log(id)
  }

  const handleAdd = e => {
    e.preventDefault()
    console.log(id, itemColor, itemSize, itemQty)
  }

  useEffect(() => {
    if (document) {
      {document.availableColors.sort().reverse().slice(0).map((color, idx) => (
        idx === 0 ? setItemColor(color) : null
      ))}
      {document.availableSizes.sort().reverse().slice(0).map((size, idx) => (
        idx === 0 ? setItemSize(size) : null
      ))}
    }
  }, [document])

  return (
    <Container>
      <Row>
        {isPending && <Spinner className='mx-auto mt-5' animation="grow" variant="warning"/>}
        {document && (
          <>
            <Col xs={12} md={6}>
              <Carousel 
                variant="dark" 
                fade 
                indicators={document.photoURL.length === 1 ? false : true} 
                controls={document.photoURL.length === 1 ? false : true}
              >
                <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={document.primaryImgURL.url}
                      alt='Slide 1'
                    />
                </Carousel.Item>
                {document.photoURL.map((url, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100"
                      src={url.url}
                      alt={`Slide ${idx+2}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col xs={12} md={6}>
              <h2 className='main-title'>{document.name}</h2>
              <div className='item-color-gp mb-4'>
                {document.availableColors.map((color, idx) => (
                  <div 
                    key={idx}
                    className={'item-color me-3 ' + (activeColor === idx ? 'active' : '')} 
                    style={{backgroundColor: color}}
                    onClick={() => handleColor(color, idx)}
                  ></div>
                ))}
              </div>
              <div className='item-size-gp mb-4'>
                {document.availableSizes.map((size, idx) => {
                  if (size === 'XS') {
                    return (
                      <Col 
                        key={idx}
                        className={'item-size me-3 ' + (activeSize === idx ? 'active' : '')}
                        onClick={() => handleSize(size, idx)}
                        xs={{ span: 1, order: 'first' }}
                      >
                        {size}
                      </Col>
                    )
                  } else if (size === 'XL') {
                    return (
                      <Col 
                        key={idx}
                        className={'item-size me-3 ' + (activeSize === idx ? 'active' : '')}
                        onClick={() => handleSize(size, idx)}
                        xs={{ span: 1, order: 'last' }}
                      >
                        {size}
                      </Col>
                    )
                  } else {
                    return (
                      <Col 
                        key={idx}
                        className={'item-size me-3 ' + (activeSize === idx ? 'active' : '')}
                        onClick={() => handleSize(size, idx)}
                        xs={1}
                      >
                        {size}
                      </Col>
                    )
                  }
                })}
              </div>
              <h3 className='text-white mb-4'><span>$</span>{document.price}</h3>
              <div className='item-qty-gp mb-4'>
                <h4 className='text-white me-3'>QTY :</h4>
                <Form.Control className='item-qty' type="number" min="1" max="99" value={itemQty} onChange={handleQty} />
              </div>
              <Row>
                <Col xs={6}>
                  <button onClick={handleWishList} className="fav-btn">Wishlist</button>
                </Col>
                <Col xs={6}>
                  <button onClick={handleAdd} className="submit-btn">Add to Cart</button>
                </Col>
              </Row>               
            </Col>
          </>
        )}
      </Row>
    </Container>
  )
}
