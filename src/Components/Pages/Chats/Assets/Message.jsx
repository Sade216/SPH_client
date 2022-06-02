import React from 'react'
import { NavLink } from 'react-router-dom'

import cl from './Message.module.css'
import moment from 'moment'
import { useSelector } from 'react-redux'

const Message = (props) => {
    const currentUser = useSelector(state => state.user.user)

    const message = props.message
    const from = message.from
    return (
        <div className={from.nickname === currentUser.nickname ? cl.MessageWrapperRevert : cl.MessageWrapper}>
            <div className={cl.Main}>
                {from.nickname !== currentUser.nickname && 
                    <div className={cl.ImageWrapper}>
                        <div className={cl.Image} 
                            style={{backgroundImage: `url(${!from.avatarURL || from.avatarURL === 'none' ? './assets/questionmark.jpg' : from.avatarURL})`}}>
                        </div>
                    </div>
                }
                {from.nickname !== currentUser.nickname ?
                    <NavLink className={cl.From} to={`/@${message.from.nickname}`}>{message.from.nickname}:</NavLink>
                    :
                    <div className={cl.From}>Вы: </div>
                }
                <div className={cl.Content}>{message.content}</div>
            </div>
            <div className={cl.Time}>{moment(message.createdAt).format('HH:mm')}</div>
        </div>
    )
}

export default Message