import React from 'react'
import './OptionBar.css'
import { LinkContainer } from 'react-router-bootstrap'

export default function OptionBar({option}) {
  return (
    <LinkContainer to={`/categories/${option}`}>
      <div className='nav-link-highlight'>
        <img 
          src={require(`../../icons/${option}.svg`)} 
          className='option-bar-icon' 
          alt={`${option}-icon`}
        />
      </div>
    </LinkContainer>
  )
}
