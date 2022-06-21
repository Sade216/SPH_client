import { ToastSuccess, ToastWarn, ToastInfo } from "../../../Components/UI/Toasts"

import axios from "axios"

import { setAuthToken, serverURL } from '../../config/axios';

export const fetchNews = (page) => {
    return async (dispatch) => {
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/news/getAll?page=${page}`
        })
        return data
    }
}

export const isLikedNews = (id) => {
    return async (dispatch) => {
        const response = await axios({
            method: 'get',
            withCredentials: true,
            url: serverURL + `/news/isLikedNews/${id}`
        })
        return response
    }
}

export const setLikeOnNews = (id) => {
    return async (dispatch) => {
        const response = await axios({
            method: 'post',
            withCredentials: true,
            data: {
                id: id
            },
            url: serverURL + `/news/setLike`,
        })
        return response
    }
}

export const setUnlikeOnNews = (id) => {
    return async (dispatch) => {
        const response = await axios({
            method: 'post',
            withCredentials: true,
            data: {
                id: id
            },
            url: serverURL + `/news/setUnLike`,
        })
        return response
    }
}