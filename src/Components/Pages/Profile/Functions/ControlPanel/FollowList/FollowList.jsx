import React, {useState, useEffect} from 'react'

import UserCard from '../../../../../UI/UserCard/UserCard'

import cl from './FollowList.module.css'

import Card from '../../../../../UI/Card'

const FollowList = ({userFollowers}) => {

    return (
        <Card>
            <div className={cl.CardWrapper}>
                <div className={cl.Row}>
                    <div className={cl.Title}>Ваши подписки:</div>
                    <button className={cl.Link}>Полный список</button>
                </div>
                {userFollowers ? userFollowers.slice(0,3).map((id, index)=>(
                    <UserCard id={id} key={index}/>
                ))
                : 
                    <div className={cl.Error}>Пользователь никого не отслеживает</div>
                }
            </div>
        </Card>
    )
}

export default FollowList