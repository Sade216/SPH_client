import React from 'react'

import cl from './CreatePost.module.css'
import card from '../../../../../UI/Card.module.css'

import {AiOutlineSend, AiOutlinePaperClip} from 'react-icons/ai'

const CreatePost = () => {
  return (
    <div className={card.Wrapper}>
      <div className={cl.CardWrapper}>

        <div className={cl.InputWrapper}>
          <AiOutlinePaperClip className={cl.Buttton}/>
          <div className={cl.TextWrapper}>
            <textarea className={cl.PostText} type='text' placeholder='Написать пост можно тут...'/>
            {/* <div className={cl.PinnedObject}>
              12332123
            </div>*/}
          </div>
          <AiOutlineSend className={cl.SendButtton}/>
        </div>
        
    </div>
  </div>
  )
}

export default CreatePost