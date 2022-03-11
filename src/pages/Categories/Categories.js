import React from 'react'
import './Categories.css'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import OptionBar from '../../components/OptionBar/OptionBar'
import Item from '../../components/Item/Item'
import { useCollectionQuery } from '../../hooks/useCollectionQuery'

export default function Categories() {
  const { option } = useParams()
  const { documents, isPending, error } = useCollectionQuery('itemsList', option)

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
          {isPending && <Spinner className='mx-auto' animation="grow" variant="warning" /> }
          {!isPending && documents && documents.length === 0 && (
            <p className='text-white text-center mt-5'>Nothing was found here</p>
          )}
          {!isPending && documents && documents.map((doc, idx) => (
              <Item doc={doc} key={idx} />
          ))}
        </Row>
      </Container>
    </>
  )
}
