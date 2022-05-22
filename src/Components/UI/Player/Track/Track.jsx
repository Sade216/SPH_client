import React, {useState, useEffect, useRef} from 'react'

import cl from './Track.module.css'

import {BsPlay, BsPause} from 'react-icons/bs'
import {HiOutlineDotsHorizontal} from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../../../Contexts/UserContext'
import { useMusic } from '../../../../Contexts/MusicContext'

const Track = (props) => {
  const {currentUser} = useAuth()

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

  const {serverURL, getUser} = useAuth()
  const {ChangeTrack, currentTrack} = useMusic()

  const [track, setTrack]= useState(null)

  // const image = props.track?.image
  // const author = props.track?.author
  // const title = props.track?.title

  /* Превью картинки*/
  // const [imageURL, setImageURL] = useState(null);
  // const readURL = image => {
  //   return new Promise((res, rej) => {
  //       const reader = new FileReader();
  //       reader.onloadend = e => res(e.target.result);
  //       reader.onerror = e => rej(e);
  //       reader.readAsDataURL(image);
  //   });
  // };
  // const preview = async image => {
  //   await readURL(image).then((e)=> setImageURL(e));
  // };
  // useEffect(()=>{
  //   preview(image)
  // },[image])
  /* Конец превью картинки*/

  useEffect(()=>{
    getTrackData()
  },[])

  function getTrackData(){
    if(props.id){
      axios({
        method: 'GET',
        url: serverURL + `/music/getTrackData/${props.id}`
      }).then((res)=>{
        setTrack(res.data)
      })
    }
  }

  function ChangeTrackData(){

  }

  function AddToFeature(){
    
  }

  function DeleteTrack(){
    axios({
      method: 'POST',
      withCredentials: true,
      url: serverURL + `/music/deleteTrack`,
      data: track,
    }).then((res)=>{
      console.log(res.data)
      getUser()
    })
  }
  const PlayButton = () => {
    ChangeTrack(track)
  }

  return ( track &&
    <div className={cl.TrackWrapper}>
      <div className={cl.ImageWrapper}>
        <div className={cl.Image} style={{backgroundImage: `url(${track.imageURL ? track.imageURL : './assets/questionmark.jpg'})`}}></div>
        {props.mode !== 'preview' &&
          <div className={cl.PlayButton} onClick={PlayButton}>
            {currentTrack?.title === track.title ?
              <BsPause/>
              :
              <BsPlay/>
            }
          </div>
        }
      </div>
      <div className={cl.Main}>
        <div className={cl.Credentials}>
          <div className={cl.Title}>{track.title ? track.title : "Без названия?"}</div>
          <NavLink className={cl.Author} to={`/@${track.author}`}>{track.author ? track.author : "Без автора???????"}</NavLink>
        </div>
          {currentUser &&
            <div className={cl.Options}>
              <HiOutlineDotsHorizontal className={isMenuOpen ? 'active' : ''} onClick={()=> MenuToggler()}/>
              <div className={cl.MenuWrapper} ref={MenuBarRef}>
                <div className={isMenuOpen ? cl.MenuOpenWrapper + ' active' : cl.MenuOpenWrapper}>
                  {currentUser.nickname !== track.author &&
                    <button disabled className={cl.Link} onClick={()=> AddToFeature()}>Добавить в избранное</button>
                  }
                  {currentUser.nickname === track.author&&
                    <div>
                      <button disabled className={cl.Link} onClick={()=> ChangeTrackData()}>Изменить</button>
                      <button className={cl.Link} onClick={()=> DeleteTrack()}>Удалить</button>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
    </div>
  )
}

export default Track