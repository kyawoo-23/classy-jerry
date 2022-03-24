import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSignInWithGoogle } from '../../hooks/useSignInWithGoogle'
import loginPic from '../../icons/undraw_female_avatar_w3jk.svg'

export default function Login() {
  const { googleSignIn, error, isPending } = useSignInWithGoogle()

  return (
    <Container>
      <Stack className='login-form'>
        
        <img className='mx-auto mb-3' style={{width: '110px', height: '110px'}} src={loginPic} />
        <h4 className='text-white text-center'>Login to your Account</h4>
        <Form className='w-75 p-3 mx-auto'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='text-white'>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='text-white'>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div className='d-flex justify-content-between'>
            <Form.Text className='text-white'>
              New user? 
              <Link to='/signup'>
                <span className='text-warning'>  Sign up here!</span>
              </Link>
            </Form.Text>
            <Button className='w-25' variant="outline-warning" type="submit">
              Login
            </Button>
          </div>
        </Form>
        <hr className='login-form-hr'/>
        <button 
          className={`mx-auto mt-4 login-with-google-btn ${isPending ? "no-click" : ""}`} 
          onClick={googleSignIn}
          disabled={isPending}
        >
          {isPending ? 'Loading data...' : 'Sign in with Google'}
        </button> 
      </Stack>
    </Container>
  )
}
