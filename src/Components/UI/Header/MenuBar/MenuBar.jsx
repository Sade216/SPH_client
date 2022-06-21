import React, {useEffect, useState, useRef} from 'react'
import {NavLink} from 'react-router-dom'

import {Offcanvas} from 'react-bootstrap'

import { useSelector, useDispatch} from 'react-redux'
import { UserLogout } from '../../../../Redux/reducers/asyncActions/fetchUser'

import cl from './MenuBar.module.css'
import {AiOutlineMenu} from 'react-icons/ai'
import {IoCloseSharp} from 'react-icons/io5'
import Settings from '../../../Pages/Profile/Functions/ControlPanel/Settings/Settings'

const MenuBar = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.user)
    const {role, isAuthenticated} = currentUser
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function MenuToggler(){
        setIsMenuOpen(!isMenuOpen);
    }

    function LogOut(){
        dispatch(UserLogout())
        setIsMenuOpen(false)
    }
    return (
        <div className={cl.Wrapper}>
            <div className={cl.Bar}>
                <button className={isMenuOpen ? 'active' : ''} onClick={()=> MenuToggler()}>
                    <AiOutlineMenu/>
                </button>
            </div>
            <Offcanvas show={isMenuOpen} onHide={MenuToggler} placement='end' className={cl.MenuWrapper}>
                <Offcanvas.Header className={cl.MenuHeader}>
                    <Offcanvas.Title className={cl.MenuTitle}>SamplePacksHouse</Offcanvas.Title>
                    <IoCloseSharp className={cl.CloseBtn} onClick={()=>setIsMenuOpen(false)}/>
                </Offcanvas.Header>
                <Offcanvas.Body className={cl.MenuBody}>
                    <NavLink className={cl.Link} to='/' onClick={()=> setIsMenuOpen(false)}>Новости</NavLink>
                    <NavLink className={cl.Link} to='/lib' onClick={()=> setIsMenuOpen(false)}>Библиотека</NavLink>
                    {isAuthenticated &&
                        <NavLink className={cl.Link} to='/msg' onClick={()=> setIsMenuOpen(false)}>Чаты</NavLink>
                    }
                    {role === 'admin' && <NavLink className={cl.Link} to='/admin' onClick={()=> setIsMenuOpen(false)}>Админ</NavLink>}
                    {isAuthenticated && 
                        <NavLink className={cl.Link} to={'/@' + currentUser.nickname} onClick={()=> setIsMenuOpen(false)}>Профиль</NavLink>
                    }
                    <button className={cl.Link}>
                        <Settings mode='header'/>
                    </button>
                    <NavLink className={cl.Link} to='/about' onClick={()=> setIsMenuOpen(false)}>О нас</NavLink>
                    {!isAuthenticated &&
                        <NavLink className={cl.Link} to='/login' onClick={()=> setIsMenuOpen(false)}>Логин/Регистрация</NavLink>
                    }
                    {isAuthenticated &&
                        <button className={cl.Link} onClick={()=>LogOut()}>Выйти</button>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default MenuBar