import React, {useEffect, useState, useRef} from 'react'
import {NavLink} from 'react-router-dom'

import {HiOutlineDotsHorizontal} from 'react-icons/hi'
import {BiLike} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'

import Card from '../../../../UI/Card'
import cl from './NewsCard.module.css'

import {useSelector} from 'react-redux'

const NewsCard = ({news, index}) => {
    const currentUser = useSelector(state => state.user.user)
    const {isAuthenticated, role} = currentUser

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
        <Card key={index}>
            <div className={cl.CardWrapper}>
                <div className={cl.Header}>
                    <div className={cl.Title}>{news.title}</div>
                    <NavLink className={cl.Author} to={`/@${news.author}`}>от: {news.author}</NavLink>
                </div>
                <div className={cl.Text}>{news.text}</div>
                <div className={cl.Tags}>
                    {news.tags.map((tag, index)=>(
                        <NavLink className={cl.Tag} key={index} to={`/search?section=news&id=${tag.toLowerCase()}`}>{tag}</NavLink>
                    ))}
                </div>
                <hr className={cl.Hr} />
                <div className={cl.Footer}>
                    <div className={cl.Row}>
                        <div className={cl.Element}>
                            <BiLike disabled={!isAuthenticated} active={news.likes.indexOf(currentUser?.nickname)}/>
                        </div>
                        <div className={cl.LikesCounter}>{news.likes.length <= 0 ? '' : news.likes.length}</div>
                        <div className={cl.Element}>
                            <FaRegComment/>
                        </div>
                    </div>
                    {role === 'admin' | role === 'moderator' ?
                        <div className={cl.Options} ref={MenuBarRef}>
                            <HiOutlineDotsHorizontal className={cl.OptionElement} onClick={MenuToggler}/>
                            <div className={cl.MenuWrapper} >
                            <div className={isMenuOpen ? cl.MenuOpenWrapper + ' active' : cl.MenuOpenWrapper}>
                                <button disabled className={cl.MenuLink} onClick={()=> MenuToggler()}>Изменить</button>
                                <button className={cl.MenuLink} onClick={()=> MenuToggler()}>Удалить</button>
                            </div>
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>
        </Card>
    )
}

export default NewsCard