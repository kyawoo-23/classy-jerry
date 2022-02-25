import React from 'react'
import './OptionBar.css'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'

export default function OptionBar({option}) {
  return (
    <LinkContainer to={`/categories/${option}`}>
      <Nav.Link className='nav-link-highlight'>
        <img 
          src={require(`../icons/${option}.svg`)} 
          className='option-bar-icon' 
          alt={`${option}-icon`}
        />
      </Nav.Link>
    </LinkContainer>
  )
}
