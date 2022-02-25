import React from 'react'
import './Categories.css'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import OptionBar from '../components/OptionBar'
import Item from '../components/Item'

export default function Categories() {
  const { option } = useParams()
  return (
    <>
      <div className='option-bar mb-4'>
        <Container>
          <Stack direction='horizontal' className='justify-content-center pb-2' gap={4}>
            {['all', 'top', 'bottom', 'headwear', 'shoes', 'accessories'].map((option, idx) => <OptionBar option={option} key={idx} /> )}
          </Stack>
        </Container>
      </div>
      <Container>
        <Row>
          <Item />
        </Row>
      </Container>
    </>
  )
}
