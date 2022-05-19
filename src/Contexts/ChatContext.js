import React, {createContext, useContext, useEffect, useState} from 'react'

import axios from 'axios'
import { useAuth } from './UserContext';

import {io} from 'socket.io-client'

const ChatContext = createContext({
    setRooms: ()=> Promise,
    setCurrentRoom: ()=> Promise,
    setMembers: ()=> Promise,
    setMessages: ()=> Promise,
    setPrivateMemberMgs: ()=> Promise,
    setNewMessages: ()=> Promise,
    socket: null,
    rooms: null,
    currentRoom: null,
    members: null,
    messages: null,
    privateMemberMsg: null,
    newMessages: null,
})

export const useChat = () => useContext(ChatContext)

export default function ChatContextProvider({children}) {
    const { currentUser, serverURLWS } = useAuth()
    const socket = io(serverURLWS, {
        headers:{
            authorization: localStorage.getItem('jwtToken')
        },
        withCredentials: true,
        // transports: ['websocket'],
    })
    
    const [rooms, setRooms] = useState([])
    const [currentRoom, setCurrentRoom] = useState([])
    const [members,setMembers] = useState([])
    const [messages, setMessages] = useState([])
    const [privateMemberMsg, setPrivateMemberMgs] = useState({})
    const [newMessages, setNewMessages] = useState({})


    useEffect(()=>{
        socket.off('new-user').on('new-user', (payload)=>{
            setMembers(payload)
        })
    },[]);

    const value = {
        setRooms,
        setCurrentRoom,
        setMembers,
        setMessages,
        setPrivateMemberMgs,
        setNewMessages,
        socket,
        rooms,
        currentRoom,
        members,
        messages,
        privateMemberMsg,
        newMessages,
    }
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}