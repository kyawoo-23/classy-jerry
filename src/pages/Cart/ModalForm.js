import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './ModalForm.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useGetDoc } from '../../hooks/useGetDoc'
import { db } from '../../firebase/config'
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import ShortUniqueId from 'short-unique-id'

export default function ModalForm(props) {
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const { user } = useAuthContext()
  const { document } = useGetDoc('users', user.uid)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [itemSysDetails, setItemSysDetails] = useState(null)
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const navigate = useNavigate()
  const oid = new ShortUniqueId()
  const [orderId, setOrderId] = useState(oid.stamp(25))
  const [orderAt, setOrderAt] = useState(new Date())

  useEffect(() => {
    let results = []
    props.document.cart.map(docu => {
      const docRef = doc(db, 'itemsList', docu.itemId)
      getDoc(docRef).then(docSnap => {
        results.push({ ...docSnap.data() })
      })
    })
    setItemSysDetails(results)
  }, [props.document])

  const handleOrder = async (e) => {
    e.preventDefault()
    setIsPending(true)
    setSuccess(false)
    try {
      const orderDetails = {
        orderId,
        totalAmount: props.totalamount,
        phone,
        address,
        items: props.document.cart,
        itemDetails: itemSysDetails,
        orderAt,
        note
      }
      await updateDoc(doc(db, 'users', user.uid), {
        phone,
        address,
        orders: arrayUnion(orderDetails)
      })
      setError(null)
      setIsPending(false)
      setSuccess(true)
    } catch (error) {
      setError(error.message)
      setIsPending(false)
      setSuccess(false)
    }
  }

  const clearCart = async () => {
    await updateDoc(doc(db, 'users', user.uid), {
      cart: null
    })
  }

  const toOrderDetails = () => {
    clearCart()
    navigate('/orders/details', {
      state: {
        address, 
        phone, 
        items: props.document.cart,
        itemSysDetails: itemSysDetails,
        note,
        orderDate: orderAt.getDate(),
        orderMonth: month[orderAt.getMonth()],
        orderYear: orderAt.getFullYear(),
        orderId,
        totalAmount: props.totalamount,
      }
    })
  }

  useEffect(() => {
    if (document && document.phone && document.address) {
      setPhone(document.phone)
      setAddress(document.address)
    }
  }, [document])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered 
      className='modal-form' 
    >
      <Modal.Header closeButton={!success}>
        <Modal.Title id="contained-modal-title-vcenter">
          <span className='text-white'>{success ? 'Your order is complete' : 'Order Confirm?'}</span>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleOrder}>
        <Modal.Body>
          {success ? (
            <>
              <p className='text-center text-white' style={{fontWeight: '500'}}>
                Your order has been received successfully!
              </p>
              <img 
                className='order-success-img' 
                src={ require(`../../icons/success.png`) } 
                alt='order-confirm-img' 
              />
              <br />
              <p className='text-center text-white'><small>Thank you so much for your order!</small></p>
            </>
          ) : (
            <>
              <p className='text-white' style={{fontWeight: '500'}}>
                Please verify your Phone number and Delivery Address
              </p>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className='text-white'>Phone number :</Form.Label>
                <Form.Control 
                  className='user-input' 
                  value={phone} 
                  onChange={e => !isNaN(e.target.value) && setPhone(e.target.value)} 
                  type="tel" 
                  placeholder='09123456789' 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className='text-white'>Delivery address :</Form.Label>
                <Form.Control 
                  className='user-input' 
                  value={address} 
                  onChange={e => setAddress(e.target.value)} 
                  as="textarea" 
                  placeholder='Your address details' 
                  rows={3} 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className='text-white'>Note for delivery or product :</Form.Label>
                <Form.Control 
                  className='user-input' 
                  value={note} 
                  onChange={e => setNote(e.target.value)} 
                  as="textarea" 
                  placeholder='(example: please call me before delivering)' 
                  rows={2} 
                />
              </Form.Group>
            </>
          )}
          
        </Modal.Body>
        <Modal.Footer>
          {success ? (
            <>
              <Link to='/'>
                <Button onClick={clearCart} variant="outline-warning" type="submit">Home</Button>
              </Link>
              
                <Button onClick={toOrderDetails} variant="warning" type="submit">Order Details</Button>
              
            </>
          ) : (
            <>
              <Button className='me-auto' variant='secondary' onClick={props.onHide}>Close</Button>
              <p className='text-white pe-1'>Total: <span>$</span>{props.totalamount}</p>
              {!isPending && <Button variant="warning" type="submit">Order Confirm</Button>}
              {isPending && (
                <Button variant="warning" type="submit" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className='me-1'
                  />
                  Loading...
              </Button>
              )}
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
