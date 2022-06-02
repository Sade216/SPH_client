import React, {useState, useRef, useEffect} from 'react'
import {NavLink} from 'react-router-dom'

import cl from './UserBar.module.css'

import Settings from '../../../Pages/Profile/Functions/ControlPanel/Settings/Settings'

import { useDispatch, useSelector } from 'react-redux'
import { UserLogout } from '../../../../Redux/reducers/asyncActions/fetchUser'

const UserBar = () => {

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.user.user)
  const {role, isAuthenticated} = currentUser

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const UserMenuRef = useRef(null);
  useOutsideAlerter(UserMenuRef);

  function useOutsideAlerter(ref) {
      useEffect(() => {
          function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target)) {
                setIsMenuOpen(false)
              }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [ref]);
  }

  function MenuToggler(){
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <div className={cl.Wrapper} ref={UserMenuRef}>
        <div className={cl.Bar} onClick={(e)=>MenuToggler()} >
          <div className={cl.User}>
              <div className={cl.Name}>{!isAuthenticated ? 'Anonymous' : currentUser.nickname}</div>
              {isAuthenticated && <div className={cl.Role}>{currentUser.role}</div>}
          </div>
          {isAuthenticated &&
            // <img src={currentUser.avatarURL === 'none' ? './assets/questionmark.jpg' : currentUser.avatarURL} alt={currentUser.nickname}/>
            <div className={cl.ProfileImage} style={{backgroundImage: `url(${currentUser.avatarURL === 'none' ? './assets/questionmark.jpg' : currentUser.avatarURL})`}}></div>
          }
        </div>
        <div className={isMenuOpen ? cl.UserMenu + ' active' : cl.UserMenu}>
          {role === 'admin' && <NavLink className={cl.Link} to='/admin'>Админ</NavLink>}
          {isAuthenticated && 
            <NavLink className={cl.Link} to={'/@' + currentUser.nickname} onClick={()=> setIsMenuOpen(false)}>Профиль</NavLink>
          }
          {isAuthenticated && 
            <button className={cl.Link}>
              <Settings mode='header'/>
            </button>
          }
          <NavLink className={cl.Link} to='/about' onClick={()=> setIsMenuOpen(false)}>О нас</NavLink>
          {!isAuthenticated &&
            <NavLink className={cl.Link} to='/login' onClick={()=> setIsMenuOpen(false)}>Логин/Регистрация</NavLink>
          }
          {isAuthenticated &&
            <button className={cl.Link} onClick={()=> dispatch(UserLogout())}>Выйти</button>
          }
        </div>
    </div>
  )
}

export default UserBar