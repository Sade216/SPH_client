import React, {useState, useEffect, useRef} from 'react'

import cl from './Track.module.css'
import {BsPlay, BsPause} from 'react-icons/bs'
import {HiOutlineDotsHorizontal} from 'react-icons/hi'

import { NavLink } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { musicSlice } from '../../../../Redux/reducers/MusicReducer'
import { addTimesListened, addToFeatured, deleteFromFeatured, deleteTrack, getTrackData, trackIsFeatured, updateTrackData } from '../../../../Redux/reducers/asyncActions/fetchMusic'

const Track = ({id, trackProp = null, currentPlayList = null}) => {

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

  const [isFeatured, setIsFeatured] = useState(false)

  useEffect(()=>{
    if(trackProp){
      setTrack(trackProp)
    }
    else if(id){
      GetTrackData()
    }
  },[])
  useEffect(()=>{
    if(track){
      dispatch(trackIsFeatured(track?._id)).then((res)=>{
        setIsFeatured(res.data)
      })
    }
  },[track])
  function GetTrackData(){
    if(id){
      dispatch(getTrackData(id)).then((res)=>{
        setTrack(res.data)
      })
    }
  }
  function ChangeTrackData(){
    dispatch(updateTrackData(track))
  }
  function DeleteTrack(){
    dispatch(deleteTrack(track))
  }
  
  function AddToFeatured(){
    dispatch(addToFeatured(track._id)).then((res)=>{
      setIsFeatured(res.data)
    })
  }
  function DeleteFromFeatured(){
    dispatch(deleteFromFeatured(track._id)).then((res)=>{
      setIsFeatured(res.data)
    })
  }
  const PlayButton = () => {
    dispatch(musicSlice.actions.musicChangeCurrentTrack(track))
    dispatch(musicSlice.actions.musicChangeCurrentTrackList(currentPlayList))
    if(!track.timesListened.includes(currentUser.nickname)){
      dispatch(addTimesListened(track._id))
    }
  }

  return ( track &&
    <div className={cl.TrackWrapper}>
      <div className={cl.ImageWrapper}>
        <div className={cl.Image} style={{backgroundImage: `url(${track.imageURL ? track.imageURL : './assets/questionmark.jpg'})`}}>
          <div className={cl.PlayButton} onClick={PlayButton}>
            {currentTrack?.title === track.title ?
              <BsPause className={cl.BsPause}/>
              :
              <BsPlay className={cl.BsPlay}/>
            }
          </div>
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
                  <div className={cl.Stats}>Уникальных слушателей: {track.timesListened.length}</div>
                  <hr className={cl.Hr}/>
                  {currentUser.nickname !== track.author && 
                    (isFeatured === false ? 
                      <button className={cl.Link} onClick={()=> AddToFeatured()}>Добавить в избранное</button>
                    :
                      <button className={cl.Link} onClick={()=> DeleteFromFeatured()}>Удалить из избранного</button>)
                  }
                  {currentUser.nickname === track.author | currentUser.role === 'admin' ?
                    <>
                      <button className={cl.Link} onClick={()=> ChangeTrackData()}>Изменить</button>
                      <button className={cl.Link} onClick={()=> DeleteTrack()}>Удалить</button>
                    </>
                    :
                    null
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