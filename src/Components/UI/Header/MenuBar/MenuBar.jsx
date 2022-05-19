import React, {useEffect, useState, useRef} from 'react'
import { useAuth } from '../../../../Contexts/UserContext';
import {NavLink} from 'react-router-dom'

import cl from './MenuBar.module.css'
import {IoIosArrowDown} from 'react-icons/io'

const MenuBar = () => {
    const { currentUser } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const MenuBarRef = useRef(null);
    useOutsideAlerter(MenuBarRef);

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
        <div className={cl.Wrapper} ref={MenuBarRef}>
            <div className={cl.Bar}>
                <button className={isMenuOpen ? 'active' : ''} onClick={()=> MenuToggler()}>
                    <IoIosArrowDown/>
                </button>
            </div>
            <div className={isMenuOpen ? cl.MenuWrapper + ' active' : cl.MenuWrapper}>
                <NavLink className={cl.Link} to='/' onClick={()=> setIsMenuOpen(false)}>Новости</NavLink>
                <NavLink className={cl.Link} to='/lib' onClick={()=> setIsMenuOpen(false)}>Библиотека</NavLink>
                {currentUser &&
                    <NavLink className={cl.Link} to='/msg' onClick={()=> setIsMenuOpen(false)}>Чаты</NavLink>
                }
            </div>
        </div>
    )
}

export default MenuBar