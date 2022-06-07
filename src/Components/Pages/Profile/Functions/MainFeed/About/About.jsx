import React, {useEffect, useState} from 'react'

import cl from './About.module.css'
import { NavLink } from 'react-router-dom'
import Card from '../../../../../UI/Card'

const About = ({about = null, pref_genres = null}) => {

  return (
    <Card>
      <div className={cl.CardWrapper}>
        <div className={cl.Title}>Данные:</div>
        <div className={cl.Row}>
          <div className={cl.PrimaryText}>
            О себе: 
          </div>
          <div className={cl.SecondaryText}>
            {about === undefined | about === '' 
            ? 'Нет информации'
            : about}
          </div>
        </div>
        {pref_genres &&
          <div className={cl.Row}>
            <div className={cl.PrimaryText}>  
              Предпочитаемые жанры: 
            </div>
            <div className={cl.SecondaryText}>
              {pref_genres.length > 0 ? 
                pref_genres.map((tags, index)=>(
                  <NavLink className={cl.SecondaryText} to={'/search?tag=' + tags} key={index}>{tags},</NavLink>
                ))
              : 'Пользователь не отметил любимые жанры'
              }
            </div>
          </div>
        }
    </div>
  </Card>
  )
}

export default About