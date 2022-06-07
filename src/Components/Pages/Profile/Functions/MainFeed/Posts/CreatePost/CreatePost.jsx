import React, {useState} from 'react'

import cl from './CreatePost.module.css'
import {Spinner} from 'react-bootstrap'

import {AiOutlineSend, AiOutlinePaperClip} from 'react-icons/ai'
import Card from '../../../../../../UI/Card'

const CreatePost = () => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e){
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
    },3000)

    setMessage('')
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter' & e.shiftKey){
        e.preventDefault()
        return e.target.value += '\n';
    }

    if(e.key === 'Enter'){
        e.preventDefault()
        return handleSubmit()
    }
  }

  const handleMessage = (e) => {
      setMessage(e.target.value)
  }
  return (
    <Card>
      <div className={cl.CardWrapper}>
        <div className={cl.InputWrapper}>
          <AiOutlinePaperClip className={cl.Buttton}/>
          <div className={cl.TextWrapper}>
              <textarea 
                  className={cl.MsgText} 
                  type='text' 
                  placeholder='Привет...' 
                  value={message} 
                  onKeyPress={handleKeyPress}
                  onChange={handleMessage}/>
          </div>
          {!isLoading ?
            <AiOutlineSend className={cl.SendButtton} onClick={handleSubmit}/>
          :
            <div className={cl.Spinner}> <Spinner animation="border" role="status"/></div>
          }
        </div>
      </div>
    </Card>
  )
}

export default CreatePost