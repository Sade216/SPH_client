import React, {useEffect, useState} from 'react'
import { useAuth } from '../../../../../../Contexts/UserContext'

import card from '../../../../../UI/Card.module.css'
import cl from './About.module.css'
import { NavLink } from 'react-router-dom'

import axios from 'axios'

const About = () => {
  const {currentUser, serverURL} = useAuth();

  const User = window.location.pathname.slice(2);

  const [data, setData] = useState([])


  function getAbout(){
    console.log('Коллекция')
    axios({
        method: 'GET',
        url: serverURL + `/user/getAbout/${User}`,
        withCredentials: false,
    }).then((res)=>{
      setData(res.data)
    })
}

useEffect(()=>{
    // getAbout()
},[])
  return (
    <div className={card.Wrapper}>
    <div className={cl.CardWrapper}>
        <div className={cl.Title}>Данные:</div>
        <div className={cl.Row}>
          <div className={cl.PrimaryText}>
            О себе: 
          </div>
          <div className={cl.SecondaryText}>
            {data.about === undefined | data.about === '' 
            ? ' Мы ничего не знаем об этом пользователе(' 
            : ' ' + data.about}
          </div>
        </div>
        {data.pref_genres &&
          <div className={cl.Row}>
            <div className={cl.PrimaryText}>  
              Предпочитаемые жанры: 
            </div>
            <div className={cl.Row}>
              {/* {data.pref_genres.map((tags, index)=>(
                <NavLink className={cl.SecondaryText} to={'/search?tag=' + tags} key={index}>{tags},</NavLink>
              ))} */}
            </div>
          </div>
        }
    </div>
  </div>
  )
}

export default About