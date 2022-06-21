import React, {useEffect, useState, useRef} from 'react'

import Card from '../../../../../../UI/Card'
import cl from './PostCard.module.css'

import {HiOutlineDotsHorizontal} from 'react-icons/hi'
import {BiLike} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'

import moment from 'moment'

import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostCard = ({post, user}) => {
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
    <Card className={cl.Wrapper}>
        <div className={cl.Header}>
          <Link className={cl.Author} to={`/@${user.nickname}`} >@{user.nickname}</Link>
          <div className={cl.Time}>{moment(post.createdAt).format("HH:mm")}</div>
        </div>
        <div className={cl.Text}>{post.text}</div>
        <div className={cl.Footer}>
          <div className={cl.Row}>
              <div className={cl.Element}>
                  <BiLike disabled={!isAuthenticated} active={post?.likes?.indexOf(user?.nickname)}/>
              </div>
              <div className={cl.LikesCounter}>{post?.likes?.length <= 0 ? '' : post?.likes?.length}</div>
              <div className={cl.Element}>
                  <FaRegComment/>
              </div>
          </div>
          {role === 'admin' | role === 'moderator' | user.nickname === currentUser.nickname?
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
    </Card>
  )
}

export default PostCard