import React, {useState, useRef, useEffect} from 'react'

import cl from './CreatePost.module.css'
import {Spinner} from 'react-bootstrap'

import {AiOutlineSend, AiOutlinePaperClip} from 'react-icons/ai'
import {BsFileMusic, BsFileImage} from 'react-icons/bs'
import Card from '../../../../../../UI/Card'

import {useDispatch, useSelector} from 'react-redux'
import { AddPost } from '../../../../../../../Redux/reducers/asyncActions/fetchUser'

const CreatePost = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.user)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // Меню
  const MenuBarRef = useRef(null);
  useOutsideAlerter(MenuBarRef);
  function useOutsideAlerter(ref) {
      useEffect(() => {
          function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target)) {
                setIsPinMenuOpened(false)
              }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [ref]);
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

  // Пины
  const [pinnedObjects, setPinnedObjects] = useState([])
  const [isPinMenuOpened, setIsPinMenuOpened] = useState(false)

  const handleMusicSelect = () => {
    
  }
  const handleImageSelect = () => {
    
  }

  function handleSubmit(e){
    if(message.length >= 1){
      setIsLoading(true)
      let formData = new FormData()
      formData.append("text", message)

      console.log(formData.get('text'))

      dispatch(AddPost(formData)).then(()=>{
        setIsLoading(false)
      })

      setMessage('')
    }
  }

  return (
    <Card>
      <div className={cl.CardWrapper}>
        <div className={cl.InputWrapper}>
          <div className={cl.Pin} ref={MenuBarRef}>
            <AiOutlinePaperClip className={cl.Buttton} onClick={()=>setIsPinMenuOpened(!isPinMenuOpened)}/>
            <div  className={isPinMenuOpened ? cl.PinMenu + ' active' : cl.PinMenu}>
              <div className={cl.PinRow} onClick={handleMusicSelect}>
                <BsFileMusic className={cl.PinButton}/>
                <div className={cl.PinText}>Добавить Трек</div>
              </div>
              <div className={cl.PinRow} onClick={handleImageSelect}>
                <BsFileImage className={cl.PinButton}/>
                <div className={cl.PinText}>Добавить Изображение</div>
              </div>
            </div>
          </div>
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