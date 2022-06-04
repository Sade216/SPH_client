import React, {useState, useEffect, useRef} from 'react'

import cl from './Track.module.css'
import {BsPlay, BsPause} from 'react-icons/bs'
import {HiOutlineDotsHorizontal} from 'react-icons/hi'

import { NavLink } from 'react-router-dom'

import axios from 'axios'
import {serverURL} from '../../../../Redux/config/axios'

import { useDispatch, useSelector } from 'react-redux'
import { musicSlice } from '../../../../Redux/reducers/MusicReducer'
import { deleteTrack } from '../../../../Redux/reducers/asyncActions/fetchMusic'

const Track = ({id, trackProp = null, mode = 'track', currentPlayList = null}) => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.user)
  const {isAuthenticated} = currentUser
  const currentTrack = useSelector(state => state.music.currentTrack)

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
      
    if(trackProp){
      setTrack(trackProp)
    }
    else if(id){
      getTrackData(id)
    }
  },[])

  function getTrackData(){
    if(id){
      axios({
        method: 'GET',
        url: serverURL + `/music/getTrackData/${id}`
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
    dispatch(deleteTrack(track))
  }
  const PlayButton = () => {
    dispatch(musicSlice.actions.musicChangeCurrentTrack(track))
    dispatch(musicSlice.actions.musicChangeCurrentTrackList(currentPlayList))
  }

  return ( track &&
    <div className={cl.TrackWrapper}>
      <div className={cl.ImageWrapper}>
        <div className={cl.Image} style={{backgroundImage: `url(${track.imageURL ? track.imageURL : './assets/questionmark.jpg'})`}}>
          {mode !== 'preview' &&
            <div className={cl.PlayButton} onClick={PlayButton}>
              {currentTrack?.title === track.title ?
                <BsPause className={cl.BsPause}/>
                :
                <BsPlay className={cl.BsPlay}/>
              }
            </div>
          }
        </div>
        
      </div>
      <div className={cl.Main}>
        <div className={cl.Credentials}>
          <div className={cl.Title}>{track.title ? track.title : "Без названия?"}</div>
          <NavLink className={cl.Author} to={`/@${track.author}`}>{track.author ? track.author : "Без автора???????"}</NavLink>
        </div>
          {isAuthenticated &&
            <div className={cl.Options} ref={MenuBarRef}>
              <HiOutlineDotsHorizontal className={cl.OptionElement} onClick={MenuToggler}/>
              <div className={cl.MenuWrapper}>
                <div className={isMenuOpen ? cl.MenuOpenWrapper + ' active' : cl.MenuOpenWrapper}>
                  {currentUser.nickname !== track.author &&
                    <button disabled className={cl.Link} onClick={()=> AddToFeature()}>Добавить в избранное</button>
                  }
                  {currentUser.nickname === track.author&&
                    <>
                      <button disabled className={cl.Link} onClick={()=> ChangeTrackData()}>Изменить</button>
                      <button className={cl.Link} onClick={()=> DeleteTrack()}>Удалить</button>
                    </>
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