import React from 'react'
import './CategoryOption.css'
import Col from 'react-bootstrap/Col'

import { Link } from 'react-router-dom'

export default function CategoryOption({option}) {
  return (
    <Col xs={6} lg={4} className="mb-3">
      <Link to={`/categories/${option}`}>
        <div className='category-option'>
          <img src={require(`../../icons/${option}.svg`)} className="ms-2" alt={`${option}-icon`} />
          <span className='category-title'>{option}</span>
        </div>
      </Link>
    </Col>
  )
}
