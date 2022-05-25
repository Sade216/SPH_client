import React, {useEffect, useRef, useState} from 'react'

import cl from './Chats.module.css'

import {Container, Row, Col, Spinner} from 'react-bootstrap'
import {AiOutlineSend, AiOutlinePaperClip} from 'react-icons/ai'

import Message from './Assets/Message'

import {useChat} from '../../../Contexts/ChatContext'
import { useAuth } from '../../../Contexts/UserContext'

import axios from 'axios'

const Chats = () => {
    const {currentUser, serverURL} = useAuth()
    //socket
    const {socket, members, rooms, currentRoom, messages, setCurrentRoom, setRooms, setMessages} = useChat()

    function getRooms(){
        axios({
            method: 'get',
            url: serverURL + '/chat/'
        }).then((res)=>{
            setRooms(res.data)
        })
    }

    useEffect(()=>{
        setCurrentRoom('general')
        getRooms()
        socket.emit('join-room', 'general')
        socket.emit('new-user')
        socket.off('room-messages').on('room-messages', (roomMessages)=>{
            setMessages(roomMessages)
        })
    },[])
    
    useEffect(()=>{
        scrollToBottom()
    },[messages])

    //current
    const [message, setMessage] = useState('')

    function handleSubmit(e){
        const roomID = currentRoom
        if(!message) return
        socket.emit('message-room', roomID, message, currentUser)
        setMessage('')
    }

    //scroll

    var messagesEnd = useRef();

    function scrollToBottom() {
        messagesEnd.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start'});
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
                                    {messages.map((message, index)=>(
                                        <>
                                            <Message key={index} message={message} />
                                        </>
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
                                            <textarea className={cl.MsgText} type='text' placeholder='Привет...' value={message} onChange={(e)=>setMessage(e.target.value)}/>
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