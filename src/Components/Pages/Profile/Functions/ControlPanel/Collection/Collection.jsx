import React, { useEffect, useState } from 'react'

import card from '../../../../../UI/Card.module.css'
import cl from './Collection.module.css'

import Track from '../../../../../UI/Player/Track/Track'
import axios from 'axios'
import { useAuth } from '../../../../../../Contexts/UserContext'
// import { useMusic } from '../../../../../../Contexts/MusicContext'

const Collection = () => {
    const {serverURL} = useAuth()
    // const {getCollection} = useMusic()
    const User = window.location.pathname.slice(2);

    const [collection, setCollection] = useState([])

    function getCollection(){
        axios({
            method: 'GET',
            url: serverURL + `/music/getCollection/${User}`,
            withCredentials: false,
        }).then((res)=>{
            setCollection(res.data)
        })
    }

    useEffect(()=>{
        getCollection()
    },[])

    return (
        <div className={card.Wrapper}>
            <div className={cl.CardWrapper}>
                <div className={cl.Row}>
                    <div className={cl.Title}>Коллекция:</div>
                    <button className={cl.Link}>Полный список</button>
                </div>
                {collection.map((id, index)=>(
                    <Track id={id} key={index} mode='default'/>
                ))}
            </div>
        </div>
    )
}

export default Collection