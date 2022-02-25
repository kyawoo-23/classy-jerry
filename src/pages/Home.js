import React from 'react'
import './Home.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CategoryOption from '../components/CategoryOption'
import Item from '../components/Item'

export default function Home() {
  return (
    <Container>
      <h2 className='main-title'>Categories</h2>
      <Row>
        {['all', 'top', 'bottom', 'headwear', 'shoes', 'accessories'].map((option, idx) => <CategoryOption option={option} key={idx} /> )}
      </Row>
      <h2 className='main-title'>Items</h2>
      <Row>
        <Item />
      </Row>
    </Container>
  )
}
