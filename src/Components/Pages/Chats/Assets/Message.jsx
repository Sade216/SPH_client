import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../../Contexts/UserContext'

import cl from './Message.module.css'
import moment from 'moment'

const Message = (props) => {
    const {currentUser} = useAuth()
    const message = props.message
    const from = message.from
    return (
        <div className={cl.MessageWrapper}>
            <div className={cl.Main}>
                <div className={cl.ImageWrapper}>
                    <div className={cl.Image} style={{backgroundImage: `url(${from.avatarURL ? from.avatarURL : './assets/questionmark.jpg'})`}}></div>
                </div>
                <NavLink className={cl.From} to={`/@${message.from.nickname}`}>{message.from.nickname}:</NavLink>
                <div className={cl.Content}>{message.content}</div>
            </div>
            <div className={cl.Content}>{moment(message.createdAt).format('HH:mm')}</div>
        </div>
    )
}

export default Message