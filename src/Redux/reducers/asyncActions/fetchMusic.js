import { ToastSuccess, ToastWarn, ToastInfo, ToastError } from "../../../Components/UI/Toasts"

import axios from "axios"

import { setAuthToken, serverURL } from '../../config/axios';
import { userSlice } from "../../reducers/UserReducer";

export const addNewTrack = (formDataFiles) => {
    return async (dispatch)=>{
        const response = await axios({
            method: "post",
            url: serverURL + "/music/addTrack",
            data: formDataFiles,
            withCredentials: true,
            headers: {
                accept: 'application/json',
                'content-type': 'multipart/form-data',
            },
        }).then((res)=>{
            ToastSuccess(res.data)
            dispatch(getCollection())
        })
        return response
    }
}

export const getCollection = () => {
    return async (dispatch)=>{
        const {status, data} = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/music/getCollection`,
        })
        dispatch(userSlice.actions.getUserTrackList(data))
    }
} 
export const deleteTrack = (track) => {
    return async (dispatch)=>{
        const response = await axios({
            method: 'POST',
            withCredentials: true,
            url: serverURL + `/music/deleteTrack`,
            data: track,
        }).then((res)=>{
            ToastSuccess(res.data)
            dispatch(getCollection())
        })

        return response
    }
}