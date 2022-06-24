import { ToastSuccess, ToastWarn, ToastInfo, ToastError } from "../../../Components/UI/Toasts"

import axios from "axios"

import { setAuthToken, serverURL } from '../../config/axios';
import { userSlice } from "../../reducers/UserReducer";

export const addNewTrack = (formDataFiles) => {
    return async (dispatch)=>{
        let response = await axios({
            method: "post",
            url: serverURL + "/music/addTrack",
            data: formDataFiles,
            withCredentials: true,
            headers: {
                accept: 'application/json',
                'content-type': 'multipart/form-data',
            },
        }).then((res)=>{
            //Обработать
            ToastSuccess(`Трек - ${formDataFiles.get('title')} был успешно добавлен`)
            dispatch(getCollection())
        }).catch((err)=>{
            console.log(err)
        })
        return response
    }
}
export const getTrackData = (id) => {
    return async (dispatch) => {
        let response = await axios({
            method: 'GET',
            url: serverURL + `/music/getTrackData/${id}`
          })

        return response
    }
}
export const deleteTrack = (track) => {
    return async (dispatch)=>{
        let response = await axios({
            method: 'POST',
            withCredentials: true,
            url: serverURL + `/music/deleteTrack`,
            data: track,
        }).then((res)=>{
            //Обработать
            ToastSuccess(res.data)
            dispatch(getCollection())
        }).catch((err)=>{
            console.log(err)
        })

        return response
    }
}
export const updateTrackData = (id) => {
    return async (dispatch) => {
        let response

        // on success
        // ToastSuccess(res.data)
        // dispatch(getCollection())
        return response
    }
}

export const getCollection = () => {
    return async (dispatch)=>{
        let {status, data} = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/music/getCollection`,
        })
        dispatch(userSlice.actions.getUserTrackList(data))
    }
}

export const getFeaturedList = () => {
    return async (dispatch)=>{
        let {data} = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/music/getFeaturedList`,
        })
        console.log(data)
        dispatch(userSlice.actions.getFeaturedList(data))
    }
}

export const trackIsFeatured = (id) => {
    return async (dispatch)=>{
        let response = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/music/isFeatured/${id}`,
        })
        return response
    }
}

export const addToFeatured = (id) => {
    return async (dispatch)=>{
        let response = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/music/addToFeatured/${id}`,
        })
        return response
    }
}

export const deleteFromFeatured = (id) => {
    return async (dispatch)=>{
        let response = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/music/deleteFromFeatured/${id}`,
        })
        return response
    }
}

export const addTimesListened = (id) => {
    return async (dispatch) =>{
        const response = await axios({
            method: 'post',
            withCredentials: true,
            data: {id: id},
            url: serverURL + '/music/setTimesListened'
        })
        return response
    }
}