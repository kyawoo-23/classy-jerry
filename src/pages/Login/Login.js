import React from 'react'
import './Login.css'
import Container from 'react-bootstrap/Container'
import { useSignInWithGoogle } from '../../hooks/useSignInWithGoogle'

export default function Login() {
  const { googleSignIn, error, isPending } = useSignInWithGoogle()

  return (
    <Container>
      <div className='d-flex justify-content-center'>
        <button 
          className={`login-with-google-btn ${isPending ? "no-click" : ""}`} 
          onClick={googleSignIn}
          disabled={isPending}
        >
          {isPending ? 'Loading data...' : 'Sign in with Google'}
        </button> 
      </div>
    </Container>
  )
}
