import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import WishListItem from '../../components/WishListItem/WishListItem'

export default function WishList() {
  return (
    <Container>
      <h2 className='main-title'>Favorites</h2>
      <p className='sub-title'>Total [ 2 ] items</p>
      <Row className='cart'>
        <WishListItem />
      </Row>
    </Container>
  )
}
