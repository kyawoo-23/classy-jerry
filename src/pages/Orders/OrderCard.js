import React from 'react'
import './OrderCard.css'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import truck from '../../icons/truck-solid.svg'
import { useNavigate } from 'react-router-dom'

export default function OrderCard({ doc }) {
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const navigate = useNavigate()
  
  const toOrderDetails = () => {
    navigate('/orders/details', {
      state: {
        address: doc.address, 
        phone: doc.phone, 
        items: doc.items,
        itemSysDetails: doc.itemDetails,
        note: doc.note,
        orderDate: doc.orderAt.toDate().getDate(),
        orderMonth: month[doc.orderAt.toDate().getMonth()],
        orderYear: doc.orderAt.toDate().getFullYear(),
        orderId: doc.orderId,
        totalAmount: doc.totalAmount,
      }
    })
  }

  return (
    <Col xs={12} md={10} lg={8} className='mb-1'>
      <div className='order-card'>
        <Stack direction='horizontal'>
          <div className='order-date'>
            <p style={{textAlign: 'center', marginBottom: '0'}}>
              {doc.orderAt.toDate().getDate()}
              <br />
              {month[doc.orderAt.toDate().getMonth()]}
            </p>
          </div>
          <div className='order-details'>
            <div className='order-details-left'>
              <p><b>Order ID : {doc.orderId}</b></p>
              <p><small>
                [ {doc.items.length} ] item{doc.items.length > 1 && 's'}
              </small></p>
              <div>
                <img src={truck} className='truck-icon' alt='truck-icon'/>
                <span className='ms-2' style={{overflow: 'hidden', color: '#f2f2f2'}}>
                  {doc.address}
                </span>
              </div>
            </div>
            <div className='order-details-right'>
              <h5>Total <span>$</span>{doc.totalAmount}</h5>
              <Button 
                variant='outline-warning' 
                style={{width: '82px'}}
                onClick={toOrderDetails}
              >
                View
              </Button>
            </div>
          </div>
        </Stack>
        <hr style={{margin: '5px', marginBottom: '0' ,background: '#f2f2f2'}} />
        <p className='order-status'>
          <small>
            Status: <span>Packaging</span>
          </small>
        </p>
      </div>
    </Col>
  )
}
