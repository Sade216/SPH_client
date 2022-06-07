import React, {useEffect} from 'react'

import Card from '../../../../../UI/Card'

import cl from './Collection.module.css'

import Track from '../../../../../UI/Player/Track/Track'
import { NavLink } from 'react-router-dom'

const Collection = ({trackList}) => {
    return (
        <Card>
            <div className={cl.CardWrapper}>
                <div className={cl.Row}>
                    <div className={cl.Title}>Коллекция:</div>
                    <div className={cl.Link}>Полный список</div>
                </div>
                {trackList ?
                    trackList.slice(0,3).map((id, index)=>(
                        <Track id={id} key={index}/>
                    ))
                :
                    <div className={cl.Error} >Пользователь не добавил ни одной композиции</div>
                }
            </div>
        </Card>
    )
}

export default Collection