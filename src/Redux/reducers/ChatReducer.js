import { createSlice } from "@reduxjs/toolkit"

import {io} from 'socket.io-client'

import { serverURLWS } from "../config/axios"

export const socket = io(serverURLWS, {
    headers:{
        authorization: localStorage.getItem('jwtToken')
    },
    withCredentials: true,
    // transports: ['websocket'],
})

const initState = {
    rooms: null,
    currentRoom: null,
    members: null,
    messages: null,
    privateMemberMsg: null,
    newMessages: null,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState: initState,
    reducers:{
        chatGetRooms(state, action){
            state.rooms = action.payload
        },
        chatChangeRoom(state, action){
            state.currentRoom = action.payload
        },
        chatSetMessages(state, action){
            state.messages = action.payload
        }
    },
    extraReducers: {
    }
})

export default chatSlice.reducer