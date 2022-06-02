import React, {useEffect, useRef, useState} from 'react'

import cl from './Chats.module.css'

import {Container, Row, Col, Spinner} from 'react-bootstrap'
import {AiOutlineSend, AiOutlinePaperClip} from 'react-icons/ai'

import Message from './Assets/Message'

import { useDispatch, useSelector } from 'react-redux'
import { chatSlice } from '../../../Redux/reducers/ChatReducer'

import {socket} from '../../../Redux/reducers/ChatReducer'

const Chats = () => {
    document.title = 'Чаты'

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.user)
    const {members, rooms, currentRoom, messages} = useSelector(state => state.chat)

    useEffect(()=>{
        dispatch(chatSlice.actions.chatChangeRoom('general'))

        socket.emit('join-room', 'general')
        socket.emit('new-user')
        socket.off('room-messages').on('room-messages', (roomMessages)=>{
            dispatch(chatSlice.actions.chatSetMessages(roomMessages))
        })
    },[])

    //scroll
    var messagesEnd = useRef();
    useEffect(()=>{
        scrollToBottom()
    },[messages])
    function scrollToBottom() {
        messagesEnd.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'end'});
    }

    //current
    const [message, setMessage] = useState('')

    function handleSubmit(e){
        const roomID = currentRoom
        if(!message) return
        socket.emit('message-room', roomID, message, currentUser)
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
        <div className={cl.Wrapper} >
            <Container style={{height: '100%'}}>
                <Row style={{height: '100%'}}>
                    {/* <Col  md={4} >
                        <div className={cl.CardWrapper}>
                            <div className={cl.RoomsWrapper}>
                                {
                                    rooms.map((room, index)=>(
                                        <div className={cl.RoomWrapper} key={index}>
                                            {room}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Col> */}
                    <Col style={{height: '100%'}}> 
                        <div className={cl.CardWrapper}>
                            <div className={cl.ChatWrapper}>
                                <div className={cl.ChatWindow} >
                                    {messages?.map((message, index)=>(
                                        <Message key={index} message={message} />
                                    ))}
                                    <div ref={(el) => { messagesEnd = el }}/>
                                </div>
                                <div className={cl.Footer}>
                                    {/* <div className={cl.PinnedObject}>
                                        12332123
                                    </div> */}
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
                                        <AiOutlineSend className={cl.SendButtton} onClick={handleSubmit}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Chats