import React from 'react'

import cl from './Card.module.css'

const Card = ({children}) => {
  return (
    <div className={cl.Wrapper}>
        {children}
    </div>
  )
}

export default Card