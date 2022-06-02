import React, {useState, useEffect} from 'react'

import UserCard from '../../../../../UI/UserCard/UserCard'

import cl from './FollowList.module.css'

import card from '../../../../../UI/Card.module.css'

const FollowList = ({userFollowers}) => {

    return (
        <div className={card.Wrapper}>
            <div className={cl.CardWrapper}>
                <div className={cl.Row}>
                    <div className={cl.Title}>Ваши подписки:</div>
                    <button className={cl.Link}>Полный список</button>
                </div>
                {userFollowers ? userFollowers.map((id, index)=>(
                    <UserCard id={id} key={index}/>
                ))
                : 
                    <div className={cl.Error}>Пользователь никого не отслеживает</div>
                }
            </div>
        </div>
    )
}

export default FollowList