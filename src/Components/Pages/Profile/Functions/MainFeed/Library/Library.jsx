import React from 'react'
import { useSelector } from 'react-redux'
import cl from './Library.module.css'
import Track from '../../../../../UI/Player/Track/Track'

const Library = ({trackList}) => {
    return (
        <div>
            {trackList.length > 0?
                trackList.map((id, index)=>(
                    <Track id={id} key={index}/>
                ))
            :
                <div className={cl.Error} >У пользователя нет загруженного контента :(</div>
            }
        </div>
    )
}

export default Library