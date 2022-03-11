import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { fbTimestamp, db, storage } from '../firebase/config'
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export default function Admin() {
  const [name, setName] = useState('')
  const [itemImg, setItemImg] = useState(null)
  const [category, setCategory] = useState('')
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  const [price, setPrice] = useState('')
  const [progress, setProgress] = useState(0)
  const [isPending, setIsPending] = useState(false)

  const defaultCategories = [
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' },
    { value: 'headwear', label: 'Headwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' }
  ]

  const defaultColors = [
    { value: 'white', label: 'White' },
    { value: 'black', label: 'Black' },
    { value: 'brown', label: 'Brown' },
    { value: 'blue', label: 'Blue' },
  ]

  const defaultSizes = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' }
  ]

  const handleFileChange = e => {
    let selected = e.target.files[0]
    if (!selected.type.includes('image')) {
      alert('Selected file must be an image')
      setItemImg(null)
      return
    }
    setItemImg(selected)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsPending(true)
    const availableColors = colors.map(color => {
      return color.value
    })

    const availableSizes = sizes.map(size => {
      return size.value
    })

    const itemDetails = {
      name,
      photoURL: null,
      category: category.value,
      availableColors,
      availableSizes,
      price,
      timestamp: fbTimestamp
    }
    console.log(itemDetails)

    addDoc(collection(db, 'itemsList'), itemDetails).then(itemId => {
      console.log(itemId.id)

      const storageRef = ref(storage, `itemImages/${itemId.id}`)
      const uploadTask = uploadBytesResumable(storageRef, itemImg)
      uploadTask.on("state_changed", snapshot => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
        setProgress(prog)
      }, err => {
        console.log(err.message)
        setIsPending(false)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url => updateDoc(doc(db, "itemsList", itemId.id), {
          photoURL: url
        }).then(() => {
          console.log('updated')
          setIsPending(false)
          setName('')
          setPrice('')
        }))
      })
    }).catch(err => {
      console.log(err.message)
      setIsPending(false)
    })
  }

  return (
    <Container>
      <Form className='mt-3' onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Item Name:</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Image:</Form.Label>
          <Form.Control 
            type="file" 
            placeholder="Input image" 
            onChange={handleFileChange} 
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Category:</Form.Label>
          <CreatableSelect 
            placeholder="Select Category" 
            options={defaultCategories} 
            onChange={option => setCategory(option)} 
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Colors:</Form.Label>
          <CreatableSelect 
            placeholder="Select Colors" 
            options={defaultColors} 
            closeMenuOnSelect={false} 
            isMulti 
            onChange={option => setColors(option)} 
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Sizes:</Form.Label>
          <Select 
            placeholder="Select Sizes" 
            options={defaultSizes} 
            closeMenuOnSelect={false} 
            isMulti 
            onChange={option => setSizes(option)} 
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Price:</Form.Label>
          <Form.Control 
            type="tel" 
            placeholder="Input price" 
            value={price}
            onChange={e => setPrice(e.target.value)} 
            required
          />
        </Form.Group>
        {!isPending && <Button variant="primary" type="submit">Submit</Button>}
        {isPending && (
          <Button variant="primary" type="submit" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        )}
      </Form>
    </Container>
  )
}
