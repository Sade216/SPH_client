//React
import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
//Стили
import cl from './App.module.css'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Компоненты
import Header from './UI/Header/Header'
import Player from './UI/Player/Player'
//Страницы
import News from './Pages/News/News'
import Login from './Pages/Login/Login'
import Admin from './Pages/Admin/Admin'
import Profile from './Pages/Profile/Profile'
import ProfileDifferent from './Pages/Profile/ProfileDifferent'
import Lib from './Pages/Lib/Lib'
import About from './Pages/About/About'
import Chats from './Pages/Chats/Chats'

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../Redux/reducers/asyncActions/fetchUser'

const App = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.user.user)
  const {isLoading, error} = useSelector(state => state.user)
  const {role, isAuthenticated} = currentUser

  useEffect(()=>{
    dispatch(fetchUserData())
  },[])

  return (
    <> 
      <ToastContainer newestOnTop pauseOnFocusLoss draggable pauseOnHover />
      <Header/>
        <div className={cl.Wrapper}>
          <Routes>
            <Route exact path="/" element={<News />} />
            <Route exact path="/lib" element={<Lib />} />
            <Route exact path="/about" element={<About />} />
            {isAuthenticated && 
              <Route exact path="/msg" element={<Chats />} />
            }
            {isAuthenticated &&
                <Route exact path={`/@${currentUser.nickname}`} element={<Profile/>} />
            }
            <Route exact path="/@:id" element={<ProfileDifferent />} />

            <Route exact path="/login" element={!isAuthenticated ? <Login /> : <Navigate to='/'/>} />

            {role === 'admin' && 
              <Route exact path="/admin" element={<Admin />} />
            }
            <Route path="*" element={
              <Container className={cl.ErrorPage}>
                <div>Ссылка не действительна</div>
                <div>Или что-то пошло не так :(</div>
              </Container>
            }
            />
          </Routes>
        </div>
        
      <Player/>
    </>
  )
}
export default App