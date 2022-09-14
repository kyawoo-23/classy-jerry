import React, { useState } from 'react'
import './Cart.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import CartItem from '../../components/CartItem/CartItem'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocOnSnapshot } from '../../hooks/useDocOnSnapshot'
import ModalForm from './ModalForm'

export default function Cart() {
  const [flag, setFlag] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const { user } = useAuthContext()
  const { document, isPending } = useDocOnSnapshot("users", user.uid)
  const [showModal, setShowModal] = useState(false)

  return (
    <Container>
      <h2 className='main-title'>Shopping Cart</h2>
      {isPending && <Row><Spinner className='mx-auto mt-5' animation="grow" variant="warning"/></Row>}
      {!isPending && document && (
        <>
          {document.cart === null || document.cart.length === 0 ? 
            <p className='sub-title'>No items in the Cart.</p> : 
            (<>
              <p className='sub-title'>Total [ {document.cart.length} ] items</p>
              <Row className='cart'>
                {document.cart.map((doc, idx) => (
                  <CartItem 
                    key={idx} 
                    setTotalAmount={setTotalAmount}
                    flag={flag}
                    setFlag={setFlag}
                    itemId={doc.itemId} 
                    itemColor={doc.itemColor}
                    itemSize={doc.itemSize}
                    itemQty={doc.itemQty}
                  />
                ))}
              </Row>
              <div className='settle-now-btn-group'>
                <span className='total-price'>
                  Total: <span>$</span>{totalAmount}
                </span>
                <button 
                  className='settle-now-btn' 
                  onClick={() => setShowModal(true)}
                >
                  SETTLE NOW
                </button>
              </div>
              <ModalForm
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop="static"
                keyboard={false}
                document={document}
                totalamount={totalAmount}
              />
            </>)
          }
        </>
      )}
    </Container>
  )
}
