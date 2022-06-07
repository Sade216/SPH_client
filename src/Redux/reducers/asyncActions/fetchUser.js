import { ToastSuccess, ToastWarn, ToastInfo, ToastError } from "../../../Components/UI/Toasts"

import axios from "axios"

import { setAuthToken, serverURL } from '../../config/axios';
import { userSlice } from "../../reducers/UserReducer";

//Авторизация  
export const fetchUserData = (Notifications = true)=>{
    return (dispatch) => {
        setAuthToken(null)
        axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + '/user',
        }).then((res)=>{
            if(res?.status === 200){
                dispatch(userSlice.actions.userGetData(res.data))
                if(Notifications){
                    ToastSuccess('Вы успешно авторизовались')
                }
            }
        }).catch(()=>{
            if(Notifications){
                ToastWarn('Предыдущая сессия не найдена')
            }
        })
    }
}
export const UserRegistration = (nickname, email, password) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            data:{
              nickname: nickname.toLowerCase(),
              email: email.toLowerCase(),
              password: password,
            },
            withCredentials: true,
            url: serverURL + '/user/register',
          }).then((res)=>{
            ToastSuccess(res)
          })
    }
}
export const UserLogin = (nickname, password)=>{
    return (dispatch) => {
        axios({
            method: 'POST',
            data:{
              nickname: nickname.toLowerCase(),
              password: password,
            },
            withCredentials: true,
            url: serverURL + '/user/login',
          }).then((res)=>{
            const {token} = res.data
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            dispatch(fetchUserData())
          }).catch(()=>{
            ToastWarn('Логин или пароль неверны')
          })
    }
}
export const UserLogout = () =>{
    return (dispatch) => {
        let answer = window.confirm("Вы уверены?");
        if (answer) {
            axios({
                method: 'POST',
                withCredentials: true,
                url: serverURL + '/user/logout',
            }).then((res)=>{
                localStorage.setItem('jwtToken', '')
                dispatch(userSlice.actions.userLogout())
                ToastSuccess('Вы успешно вышли')
            })
        }
    }
}
//Профиль
export const ChangeAvatar = (formData) => {
    return async (dispatch) => {
        const response = await axios({
                method: "post",
                url: serverURL + "/user/change_avatar",
                data: formData,
                withCredentials: true,
                headers: {
                accept: 'application/json',
                'content-type': 'multipart/form-data',
                },
        }).then(()=>{
            dispatch(fetchUserData(false))
            ToastSuccess('Аватар успешно сменён')
        })
        
        return response
    }
}
export const ChangeProfileData = (formData) => {
    return async (dispatch) => {
        // const response = await

        // return response
    }
}

//Профиль(чужой) 
export const isFollowed = (id) => {
    return async (dispatch) => {
        let response = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/user/isFollowed/${id}`,
        })
        return response
    }
}
export const setFollow = (id) => {
    return async (dispatch) => {
        let response = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/user/setFollow/${id}`,
        })
        return response
    }
}
export const setUnFollow = (id) => {
    return async (dispatch) => {
        let response = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/user/setUnFollow/${id}`,
        })
        return response
    }
}