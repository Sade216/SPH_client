import React from 'react'
import Track from '../../../../../UI/Player/Track/Track'

import cl from './Featured.module.css'

const Featured = ({featuredList}) => {
  return (
    <div>
        {featuredList.length > 0?
          featuredList.map((id, index)=>(
              <Track id={id} key={index}/>
          ))
        :
          <div className={cl.Error} >Пользователь не добавил ни одной композиции в избранное</div>
        }
    </div>
  )
}

export default Featured