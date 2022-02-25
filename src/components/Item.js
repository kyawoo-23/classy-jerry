import React from 'react'
import './Item.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import favIcon from '../icons/211673_heart_icon.svg'
import cloth1 from '../img/dress1.jpg'
import pants1 from '../img/pants1.jpg'
import shoe1 from '../img/shoe1.jpg'

export default function Item() {
  return (
    <>
    <Col xs={6} lg={4}>
      <Card className="bg-white text-dark mb-4">
        <Card.Img variant='top' src={cloth1} alt="Card image" />
        <div className='card-overlay'>
          <Card.Title>
            <img className='card-icon' src={favIcon} />
          </Card.Title>
        </div>
        <Card.Body>
          <Row>
            <Col xs={9} md={10}>
              <Card.Text>
                Cotton Short Sleeve Long Dress
              </Card.Text>
            </Col>
            <Col xs={3} md={2}>
              <Card.Text className='card-price'>
                $45
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>

    <Col xs={6} lg={4}>
      <Card className="bg-white text-dark mb-4">
        <Card.Img variant='top' src={pants1} alt="Card image" />
        <div className='card-overlay'>
          <Card.Title>
            <img className='card-icon' src={favIcon} />
          </Card.Title>
        </div>
        <Card.Body>
          <Row>
            <Col xs={9} md={10}>
              <Card.Text>
                Hyper Pants
              </Card.Text>
            </Col>
            <Col xs={3} md={2}>
              <Card.Text className='card-price'>
                $45
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>

    <Col xs={6} lg={4}>
      <Card className="bg-white text-dark mb-4">
        <Card.Img variant='top' src={shoe1} alt="Card image" />
        <div className='card-overlay'>
          <Card.Title>
            <img className='card-icon' src={favIcon} />
          </Card.Title>
        </div>
        <Card.Body>
          <Row>
            <Col xs={9} md={10}>
              <Card.Text>
                Cotton Canvas Shoes
              </Card.Text>
            </Col>
            <Col xs={3} md={2}>
              <Card.Text className='card-price'>
                $45
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
    </>
  )
}
