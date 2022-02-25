import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import FavoriteItem from '../components/FavoriteItem'

export default function Favorite() {
  return (
    <Container>
      <h2 className='main-title'>Favorites</h2>
      <p className='sub-title'>Total [ 2 ] items</p>
      <Row className='cart'>
        <FavoriteItem />
      </Row>
    </Container>
  )
}
