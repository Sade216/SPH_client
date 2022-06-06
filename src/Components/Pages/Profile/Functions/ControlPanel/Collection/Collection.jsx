import React, {useEffect} from 'react'

import card from '../../../../../UI/Card.module.css'
import cl from './Collection.module.css'

import Track from '../../../../../UI/Player/Track/Track'
import { NavLink } from 'react-router-dom'

const Collection = ({trackList}) => {
    return (
        <div className={card.Wrapper}>
            <div className={cl.CardWrapper}>
                <div className={cl.Row}>
                    <div className={cl.Title}>Коллекция:</div>
                    <div className={cl.Link}>Полный список</div>
                </div>
                {trackList ?
                    trackList.slice(0,3).map((id, index)=>(
                        <Track id={id} key={index} mode='default'/>
                    ))
                :
                    <div className={cl.Error} >Пользователь не добавил ни одной композиции</div>
                }
            </div>
        </div>
    )
}

export default Collection