import React from 'react'
import CreatePost from './CreatePost/CreatePost'
import PostFetch from './PostFetch/PostFetch'

import cl from './Posts.module.css'

const Posts = () => {

    return (
        <>
            <CreatePost/>
            <hr />
            <PostFetch/>
        </>
    )
}

export default Posts