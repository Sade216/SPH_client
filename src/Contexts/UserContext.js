import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { setAuthToken } from './config/axios';

import { useNavigate } from "react-router-dom";

import { ToastSuccses } from '../Components/UI/Toasts'

const serverURL = 'http://localhost:5000/api';
const serverURLWS = 'http://localhost:5000';
// const serverURL = 'https://samplepackshouse-server.herokuapp.com/api';
// const serverURLWS = 'https://samplepackshouse-server.herokuapp.com/';

const AuthContext = createContext({
  registerForm: ()=> Promise, 
  loginForm: ()=> Promise,
  logout: ()=> Promise,
  getUser: ()=> Promise,
  currentUser: null,
  isAdmin: null,
  serverURL,
  serverURLWS,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    getUser()
  },[]);

  function getUser(){
    axios({
        method: 'GET',
        withCredentials: true,
        url: serverURL + '/user',
      }).then((res)=>{
        if(res?.status === 200){
          setCurrentUser(res.data)
          if(res.data.role === 'admin' ) {
            setIsAdmin(true)
          }
          else{
            setIsAdmin(false)
          }
        }
      })
  }

  function registerForm(nickname, email, password) {
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
          ToastSuccses(res)
          navigate('/')
        })
  }
  function loginForm(nickname, password) {
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
          ToastSuccses(res)
          getUser()
          navigate('/')
        })
  }
  function logout(){
    var answer = window.confirm("Вы уверены?");
    if (answer) {
      axios({
        method: 'POST',
        withCredentials: true,
        url: serverURL + '/user/logout',
      }).then((res)=>{
        localStorage.setItem('jwtToken', '')
        setCurrentUser(null)
        navigate('/')
      })
    }
  }

  const value = {
    registerForm,
    loginForm,
    logout,
    getUser,
    currentUser,
    isAdmin,
    serverURL,
    serverURLWS,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}