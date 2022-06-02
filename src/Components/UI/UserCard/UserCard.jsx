import React, {useState, useEffect, useRef} from 'react'
import { NavLink } from 'react-router-dom';

import cl from './UserCard.module.css'
import {HiOutlineDotsHorizontal} from 'react-icons/hi'


import axios from 'axios';
import {serverURL} from '../../../Redux/config/axios'

const UserCard = (props) => {
    /*Menu*/
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
    /*Menu*/
    const [user, setUser] = useState({})

    function getUserPage(){
        axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/user/${props.id}`,
        }).then((res)=>{
            if(res?.status === 200){
                setUser(res.data)
            }
        })
    }

    useEffect(()=>{
        getUserPage()
    },[])

    return (user &&
        <div className={cl.UserWrapper}>
            <div className={cl.ImageWrapper}>
                <div className={cl.Image} style={{backgroundImage: `url(${user.avatarURL ? user.avatarURL : './assets/questionmark.jpg'})`}}></div>
            </div>
            <div className={cl.Main}>
                <div className={cl.Credentials}>
                    <NavLink className={cl.Nickname} to={`/@${user.nickname}`}>{user.nickname}</NavLink>
                </div>
                <div className={cl.Options}>
                    <HiOutlineDotsHorizontal className={isMenuOpen ? 'active' : ''} onClick={()=> MenuToggler()}/>
                    <div className={cl.MenuWrapper} ref={MenuBarRef}>
                    
                    <div className={isMenuOpen ? cl.MenuOpenWrapper + ' active' : cl.MenuOpenWrapper}>
                        {/* {currentUser.nickname !== track.author &&
                        <button disabled className={cl.Link} onClick={()=> AddToFeature()}>Добавить в избранное</button>
                        }
                        {currentUser.nickname === track.author&&
                        <div>
                            <button disabled className={cl.Link} onClick={()=> ChangeTrackData()}>Изменить</button>
                            <button className={cl.Link} onClick={()=> DeleteTrack()}>Удалить</button>
                        </div>
                        } */}
                    </div>
                </div>
            </div>
          </div>
        </div>
    )
}

export default UserCard