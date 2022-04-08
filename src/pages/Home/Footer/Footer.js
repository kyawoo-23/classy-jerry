import React from 'react'
import './Footer.css'
import wave from '../../../icons/wave-haikei.svg'
import logo from '../../../icons/logo.svg'

export default function Footer() {
  return (
    <>
      <img className='wave mt-5' src={wave} alt='wave'/>
      <footer>
        <p className='text-white text-center'>
          <img className='nav-logo me-3' src={logo} alt='logo' />
          Classy Jerry <i className='text-muted'>(mini-clothing shop)</i> . Website Project 
        </p>
        <p className='text-center' style={{color: '#e6e6e6'}}>
          Developed by 
          <a 
            className='text-white ms-1' 
            href='https://kyawoo-23.github.io/' 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <b>Kko</b>
          </a>
        </p>
      </footer>
    </>
  )
}
