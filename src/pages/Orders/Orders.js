import React from 'react'
import './Orders.css'
import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import OrderCard from './OrderCard'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocOnSnapshot } from '../../hooks/useDocOnSnapshot'

export default function Orders() {
  const { user } = useAuthContext()
  const { document, isPending } = useDocOnSnapshot('users', user.uid)
  let noPending = true
  let noPast = true

  return (
    <Container>
      <Tabs defaultActiveKey="pending-orders" id="orders-tab" className="mb-3">
        <Tab eventKey="pending-orders" title="Pending Orders">
          <Row className='justify-content-center'>
            {isPending && <Spinner className='mx-auto mt-5' animation="grow" variant="warning" />}
            {!isPending && document && document.orders && document.orders.map((doc, idx) => {
              return (doc.orderStatus === 'review' || doc.orderStatus === 'deliver') && (
                <React.Fragment key={idx}>
                  {noPending = false}
                  <OrderCard doc={doc} />
                </React.Fragment>
              )
            })}
            {!isPending && document && (!document.orders || noPending) && (
              <p className='text-white text-center mt-5'>No pending orders yet.</p>
            )}
          </Row>
        </Tab>
        <Tab eventKey="past-orders" title="Past Orders">
          <Row className='justify-content-center'>
            {isPending && <Spinner className='mx-auto mt-5' animation="grow" variant="warning" />}
            {!isPending && document && document.orders && document.orders.map((doc, idx) => {
              return doc.orderStatus === 'complete' && (
                <React.Fragment key={idx}>
                  {noPast = false}
                  <OrderCard doc={doc} />
                </React.Fragment>
              )
            })}
            {!isPending && document && (!document.orders || noPast) && (
              <p className='text-white text-center mt-5'>No past orders yet.</p>
            )}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  )
}
