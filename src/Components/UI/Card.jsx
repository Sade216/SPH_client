import React from 'react'

import cl from './Card.module.css'

const Card = ({children, className}) => {
  return (
    <div className={cl.Wrapper + ' ' + className}>
        {children}
    </div>
  )
}

export default Card