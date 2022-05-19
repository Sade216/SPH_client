import React, {useState, useEffect} from 'react'

import UserCard from '../../../../../UI/UserCard/UserCard'

import cl from './FollowList.module.css'

import card from '../../../../../UI/Card.module.css'

const FollowList = (props) => {

    const [users, setUsers] = useState([])


    useEffect(()=>{
        setUsers(props.userFollowers)
    },[])
    return (
        <div className={card.Wrapper}>
            <div className={cl.CardWrapper}>
                <div className={cl.Row}>
                    <div className={cl.Title}>Ваши подписки:</div>
                    <button className={cl.Link}>Полный список</button>
                </div>
                {users.map((id, index)=>(
                    <UserCard id={id} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default FollowList