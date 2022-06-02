import { ToastSuccess, ToastWarn, ToastInfo } from "../../../Components/UI/Toasts"

import axios from "axios"

import { setAuthToken, serverURL } from '../../config/axios';
import { userSlice } from "../../reducers/UserReducer";
import { chatSlice } from "../../reducers/ChatReducer";

export const fetchRooms = ()=>{
    return (dispatch)=>{
        axios({
            method: 'get',
            url: serverURL + '/chat/'
        }).then((res)=>{
            dispatch(chatSlice.actions.chatGetRooms(res.data))
        })
    }
}