import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CreatePost from './CreatePost/CreatePost'
import PostFetch from './PostFetch/PostFetch'

import cl from './Posts.module.css'

const Posts = ({user = null}) => {
    const currentUser = useSelector(state => state.user.user)

    return (
        <>
            {currentUser.nickname === user.nickname &&
                <CreatePost/>
            }
            <div className={cl.Divide}></div>
            {user &&
                <PostFetch user={user}/>
            }
        </>
    )
}

export default Posts