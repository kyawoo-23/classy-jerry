import React from 'react'
import './Home.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import CategoryOption from '../../components/CategoryOption/CategoryOption'
import Item from '../../components/Item/Item'
import { useCollection } from '../../hooks/useCollection'
import { useCollection2 } from '../../hooks/useCollection2'
import { useViewport } from '../../hooks/useViewport'

export default function Home() {
  const { width } = useViewport()
  const breakpoint = 992
  let count = null
  width < breakpoint ? count = 2 : count = 3 
  const { documents, isPending, seeMore, showSeeMoreBtn } = useCollection2('itemsList', count)

  return (
    <Container>
      <h2 className='main-title'>Categories</h2>
      <Row>
        {['all', 'top', 'bottom', 'headwear', 'shoes', 'accessories'].map((option, idx) => <CategoryOption option={option} key={idx} /> )}
      </Row>
      <h2 className='main-title'>Items</h2>
      <Row>
        {isPending && <Spinner className='mx-auto' animation="grow" variant="warning" /> }
        {!isPending && documents && documents.map((doc, idx) => (
          <Item doc={doc} key={idx} />
        ))}
      </Row>

      {showSeeMoreBtn && !isPending && documents && (
        <div className='d-flex justify-content-center mb-5 mt-3'>
          <button className='see-more-btn' onClick={seeMore}>See More</button>       
        </div>
      )}
      {!showSeeMoreBtn && !isPending && documents && (
        <p className='text-white d-flex justify-content-center mb-5 mt-4'>
          You have reached the end!
        </p>
      )}
    </Container>
  )
}
