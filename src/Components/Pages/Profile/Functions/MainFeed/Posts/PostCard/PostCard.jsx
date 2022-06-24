import React, {useEffect, useState, useRef} from 'react'

import Card from '../../../../../../UI/Card'
import cl from './PostCard.module.css'

import {HiOutlineDotsHorizontal} from 'react-icons/hi'
import {BiLike} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'

import moment from 'moment'

import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DeletePost, isLikedPost, setLikeOnPost, setUnlikeOnPost } from '../../../../../../../Redux/reducers/asyncActions/fetchUser'

const PostCard = ({post, user}) => {
  const dispatch = useDispatch()
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

  const deletePost = () => {
    dispatch(DeletePost(post._id))
  }

  return (
    <Card className={cl.Wrapper}>
        <div className={cl.Header}>
          <Link className={cl.Author} to={`/@${user.nickname}`} >@{user.nickname}</Link>
          <div className={cl.Time}>{moment(post.createdAt).format("HH:mm")}</div>
        </div>
        <div className={cl.Text}>{post.text}</div>
        {isAuthenticated &&
          <>
            <div className={cl.Footer}>
              <div className={cl.Row}>
                  
              </div>
              {role === 'admin' | role === 'moderator' | user.nickname === currentUser.nickname?
                  <div className={cl.Options} ref={MenuBarRef}>
                      <HiOutlineDotsHorizontal className={cl.OptionElement} onClick={MenuToggler}/>
                      <div className={cl.MenuWrapper} >
                      <div className={isMenuOpen ? cl.MenuOpenWrapper + ' active' : cl.MenuOpenWrapper}>
                          <button disabled className={cl.MenuLink} onClick={()=> MenuToggler()}>Изменить</button>
                          <button className={cl.MenuLink} onClick={()=> deletePost()}>Удалить</button>
                      </div>
                      </div>
                  </div>
                  : null
              }
            </div>
          </>
        }
    </Card>
  )
}

export default PostCard