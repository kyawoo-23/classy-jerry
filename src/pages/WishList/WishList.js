import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import WishListItem from '../../components/WishListItem/WishListItem'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocOnSnapshot } from '../../hooks/useDocOnSnapshot'

export default function WishList() {
  const { user } = useAuthContext()
  const { document, isPending } = useDocOnSnapshot("users", user.uid)
  return (
    <Container>
      <h2 className='main-title'>Favorites</h2>
      {isPending && <Row><Spinner className='mx-auto mt-5' animation="grow" variant="warning"/></Row>}
      {!isPending && document && (
        <>
          {document.wishList === null || document.wishList.length === 0 ? 
            <p className='sub-title'>No items in the WishList.</p> : 
            (<>
              <p className='sub-title'>Total [ {document.wishList.length} ] items</p>
              <Row className='cart'>
                {document.wishList.map((doc, idx) => (
                  <WishListItem key={idx} itemId={doc.itemId} />
                ))}
              </Row>
            </>)
          }
        </>
      )}
    </Container>
  )
}
