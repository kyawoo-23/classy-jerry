import React, { useState } from 'react'
import './Search.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Item from '../../components/Item/Item'
import { useCollection } from '../../hooks/useCollection'

export default function Search() {
  const [searchText, setSearchText] = useState('')
  const { documents, isPending } = useCollection('itemsList')
  const [searchResult, setSearchResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    var result = documents.filter(function(document) {
      return document.name.toLowerCase().includes(searchText.toLowerCase())
    })
    setSearchResult(result)
  }

  return (
    <Container>
      {isPending && <Row><Spinner className='mx-auto mt-4' animation="grow" variant="warning" /></Row> }
      {documents && (
        <>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-4 mt-3">
              <FormControl
                placeholder="Enter item's name to search..."
                className='search-bar'
                required
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              <Button type="submit" variant="outline-warning" id="button-addon2">
                Search
              </Button>
            </InputGroup>
          </Form>
          <Row>
            {searchResult && (
              searchResult.length === 0 ? (
                <p className='text-white text-center'>Oops, nothing found :&#40;</p>
              ) : (
                searchResult.map((doc, idx) => (
                  <Item doc={doc} key={idx} />
              ))
            ))}
          </Row>
        </>
      )}
    </Container>
  )
}
