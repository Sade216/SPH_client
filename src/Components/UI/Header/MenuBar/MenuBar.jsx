import React, {useEffect, useState, useRef} from 'react'
import { useAuth } from '../../../../Contexts/UserContext'
import {NavLink} from 'react-router-dom'

import {Offcanvas} from 'react-bootstrap'


import cl from './MenuBar.module.css'
import {AiOutlineMenu} from 'react-icons/ai'
import {IoIosArrowDown} from 'react-icons/io'
import {IoCloseSharp} from 'react-icons/io5'

const MenuBar = () => {
    const { currentUser, isAdmin, logout} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const MenuBarRef = useRef(null);
    // useOutsideAlerter(MenuBarRef);

    // function useOutsideAlerter(ref) {
    //     useEffect(() => {
    //         function handleClickOutside(event) {
    //             if (ref.current && !ref.current.contains(event.target)) {
    //             setIsMenuOpen(false)
    //             }
    //         }
    //         document.addEventListener("mousedown", handleClickOutside);
    //         return () => {
    //             document.removeEventListener("mousedown", handleClickOutside);
    //         };
    //     }, [ref]);
    // }

    function MenuToggler(){
        setIsMenuOpen(!isMenuOpen);
    }

    function LogOut(){
        logout()
        setIsMenuOpen(false)
    }
    return (
        <div className={cl.Wrapper} ref={MenuBarRef}>
            <div className={cl.Bar}>
                <button className={isMenuOpen ? 'active' : ''} onClick={()=> MenuToggler()}>
                    {/* <IoIosArrowDown/> */}
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
                    {currentUser &&
                        <NavLink className={cl.Link} to='/msg' onClick={()=> setIsMenuOpen(false)}>Чаты</NavLink>
                    }
                    {isAdmin && <NavLink className={cl.Link} to='/admin' onClick={()=> setIsMenuOpen(false)}>Админ</NavLink>}
                    {currentUser && 
                        <NavLink className={cl.Link} to={'/@' + currentUser.nickname} onClick={()=> setIsMenuOpen(false)}>Профиль</NavLink>
                    }
                    {/* {currentUser && 
                        <button className={cl.Link}>
                        <Settings mode='header'/>
                        </button>
                    } */}
                    <NavLink className={cl.Link} to='/about' onClick={()=> setIsMenuOpen(false)}>О нас</NavLink>
                    {!currentUser &&
                        <NavLink className={cl.Link} to='/login' onClick={()=> setIsMenuOpen(false)}>Логин/Регистрация</NavLink>
                    }
                    {currentUser &&
                        <button className={cl.Link} onClick={()=>LogOut()}>Выйти</button>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default MenuBar