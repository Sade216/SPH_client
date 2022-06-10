import React from 'react'
import { Link } from 'react-router-dom'

import cl from './Album.module.css'
import {BsPlay} from 'react-icons/bs'

const Album = ({album}) => {
    return (album &&
        <div className={cl.CardWrapper}>
            <div className={cl.Wrapper} style={{backgroundImage: `url(${album.backgroundURL})`}}>
                <div className={cl.Background}></div>
                <div className={cl.Data} >
                    <div className={cl.PlayBtn}>
                        <BsPlay />
                    </div>
                    <div className={cl.Title}>{album.title}</div>
                    <Link to={`/@${album.author}`} className={cl.Author}>{album.author}</Link>
                </div>
            </div>
        </div>
    )
}

export default Album