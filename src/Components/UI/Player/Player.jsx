import React, {useState, useRef, useEffect} from 'react'

import { NavLink } from 'react-router-dom'

import cl from './Player.module.css'
import './Player.css';
import {IoIosMusicalNotes} from 'react-icons/io'

import AudioPlayer from 'react-h5-audio-player';

import {useSelector} from 'react-redux'
import { BsExclamationCircle } from 'react-icons/bs';

const Player = () => {
    const MusicState = useSelector(state => state.music)
    const {currentTrack} = MusicState

    const [togglePlayer, setTogglePlayer] = useState(false)
    const localVolume = localStorage.getItem('PlayerVolume') === null ? localStorage.setItem('PlayerVolume', 1) : localStorage.getItem('PlayerVolume')
    const [volume, setVolume] = useState(localVolume)

    useEffect(()=>{
        localStorage.setItem('PlayerVolume', volume)
    },[volume])

    useEffect(()=>{
        if(currentTrack?.trackURL){
            setTogglePlayer(true)
        }
    },[currentTrack])

    const playerRef = useRef(null);
    const PlayerInstance = useRef(null)
    // useOutsideAlerter(playerRef);
    // function useOutsideAlerter(ref) {
    //     useEffect(() => {
    //         function handleClickOutside(event) {
    //             if (ref.current && !ref.current.contains(event.target)) {
    //                 setTogglePlayer(false)
    //             }
    //         }
    //         document.addEventListener("mousedown", handleClickOutside);
    //         return () => {
    //             document.removeEventListener("mousedown", handleClickOutside);
    //         };
    //     }, [ref]);
    // }
    function TogglePlayer(){
        setTogglePlayer(!togglePlayer)
    }
    
  return (currentTrack &&
    <div ref={playerRef}>
        <div className={cl.PlayerWrapper + (togglePlayer ? ' musicActive' : '') }>
            {currentTrack.trackURL &&
                <div className={cl.ImageWrapper}>   
                    <div className={cl.Image} style={{backgroundImage: `url(${currentTrack.imageURL ? currentTrack.imageURL : './assets/questionmark.jpg'})`}}></div>
                </div>
            }
            <div className={cl.Data}>
                <div className={cl.RunningLine}>
                    <div className={cl.Title}>{currentTrack.title}</div>
                </div>
                <div className={cl.RunningLine}>
                    <NavLink className={cl.Author} to={`/@${currentTrack.author}`}>{currentTrack.author}</NavLink>
                </div>
            </div>
            <div className={cl.Stat}>
                <BsExclamationCircle/>
                <div className={cl.AddInfo}>
                    <div className={cl.StatRow}>Описание: {currentTrack.desc ? currentTrack : 'Описание отсутствует'}</div>
                    <div className={cl.StatRow}>Теги: {currentTrack.tags.map((tag, index)=> (
                        <div className={cl.StatText}>{tag}</div>
                    ))}
                    </div>
                </div>
            </div>
            {currentTrack.trackURL &&
            <AudioPlayer
                ref={PlayerInstance}
                volume={volume}
                onVolumeChange={(e)=>setVolume(Math.round(e.target.volume * 100) / 100)}
                layout='horizontal-reverse'
                autoPlay
                src={currentTrack.trackURL}
                // other props here
            />
            }
        </div>
        <button className={cl.Toggler} onClick={TogglePlayer}> <IoIosMusicalNotes/> </button>
    </div>
  )
}

export default Player