import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useCollection } from '../hooks/useCollection'
import { db } from '../firebase/config'
import { doc, updateDoc } from "firebase/firestore"

export default function AdminUpdate() {
  const { documents } = useCollection('itemsList')
  const [name, setName] = useState('')
  
  useEffect(() => {
    documents && setName(documents[4].name)
  }, [documents])

  const handleUpdate = async () => {
    const ref = doc(db, "itemsList", documents[4].id)
    await updateDoc(ref, {
      name
    })
  }

  return (
    <Container>
      {documents && (
        <>
          <div className='mb-5'>
            <input type='text' value={name} onChange={e => setName(e.target.value)} />
            <button onClick={handleUpdate}>Update</button>
          </div>
        </>
      )}
    </Container>
  )
}
