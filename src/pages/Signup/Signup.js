import React, { useState } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Spinner from 'react-bootstrap/Spinner'
import signupPic from '../../icons/undraw_nature_m5ll.svg'
import eye from '../../icons/eye.png'
import hidden from '../../icons/hidden.png'
import { useSignup } from '../../hooks/useSignup'
import { useViewport } from '../../hooks/useViewport'
import Error from '../../components/Error/Error'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [file, setFile] = useState(null)
  const { signup, isPending, error } = useSignup()
  const { width } = useViewport()
  const breakpoint = 992
  let isSmall = width < breakpoint ? true : false

  const handleFileChange = e => {
    setFile(null)
    let selected = e.target.files[0]
    if (!selected.type.includes('image')) {
      alert('Selected file must be an image')
      return
    }
    setFile(selected)
  }

  const handleSubmit = e => {
    e.preventDefault()
    signup(email, userName, file, password)
  }

  return (
    <Container>
      <Stack className='login-form'>
        <img className='mx-auto mb-3' style={{width: '110px', height: '110px'}} src={signupPic} alt='signup-pic' />
        <h4 className='text-white text-center'>Create your new Account Now!</h4>
        <Form className='w-75 pt-3 p-md-3 mx-auto' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='text-white'>Email address</Form.Label>
            <Form.Control 
              size={isSmall ? 'sm' : 'md'}
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label className='text-white'>User Name</Form.Label>
            <Form.Control 
              size={isSmall ? 'sm' : 'md'}
              type="text" 
              placeholder="Enter user name" 
              value={userName}
              onChange={e => setUserName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Label className='text-white'>Profile Image</Form.Label>
            <Form.Control 
              size={isSmall ? 'sm' : 'md'}
              type="file" 
              onChange={handleFileChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='text-white'>Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                size={isSmall ? 'sm' : 'md'}
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <InputGroup.Text style={{cursor: 'pointer'}} onClick={() => setShowPwd(!showPwd)}>
                <img 
                  className='eye-icon' 
                  src={showPwd ? eye : hidden} 
                  alt={showPwd ? 'show' : 'hidden'}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <div className='d-flex justify-content-between align-items-center'>
            <Form.Text className='text-white'>
              Have an account?
              <Link to='/login'>
                <span className='text-warning ms-1'>Log in</span>
              </Link>
            </Form.Text>
            {!isPending && 
              <Button className='px-md-4' variant="outline-warning" type="submit">
                <span style={{whiteSpace: 'nowrap'}}>Sign up</span>
              </Button>
            }
            {isPending && 
              <Button className='px-md-4' variant="outline-warning" disabled type="submit">
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className='me-1'
                />
                <span style={{whiteSpace: 'nowrap'}}>Loading</span>
              </Button>
            }
          </div>
          {error && <Error err={error} />}
        </Form>
      </Stack>
    </Container>
  )
}
