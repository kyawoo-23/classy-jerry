import React from 'react'
import './Item.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import heartNull from '../../icons/heart-null.png'
import heart from '../../icons/heart.png'
import { Link } from 'react-router-dom'

export default function Item({ doc }) {
  return (
    <Col xs={6} lg={4} key={doc.id}>
      <Link to={`/items/${doc.id}`}>
        <Card className="bg-white text-dark mb-4">
          <Card.Img 
            variant='top' 
            src={doc.primaryImgURL.url} 
            alt={`${doc.name} img`} 
          />
          {/* <div className='card-overlay'>
            <Card.Title>
              {false ? (
                <img className='card-icon heart-null' src={heartNull} />
              ) : (
                <button onClick={() => console.log('hi')}>
                <img className='card-icon heart' src={heart} />
                </button>
              )}
            </Card.Title>
          </div> */}
          <Card.Body>
            <Row>
              <Col xs={9} md={10}>
                <Card.Text>
                  {doc.name}
                </Card.Text>
              </Col>
              <Col xs={3} md={2}>
                <Card.Text className='card-price'>
                  <span>$</span>{doc.price}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}
