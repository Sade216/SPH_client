import React from 'react'
import Card from '../../../../../../UI/Card'
import cl from './PostCard.module.css'
import moment from 'moment'

const PostCard = ({post}) => {
  return (
    <Card className={cl.Wrapper}>
        <div className={cl.Text}>{post.text}</div>
        <div className={cl.Time}>{moment(post.createdAt).format("HH:mm")}</div>
    </Card>
  )
}

export default PostCard