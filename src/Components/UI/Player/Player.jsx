import React, {useState, useRef, useEffect} from 'react'

import cl from './Player.module.css'
import {IoIosMusicalNotes} from 'react-icons/io'
import { useMusic } from '../../../Contexts/MusicContext'

import AudioPlayer from 'react-h5-audio-player';
import './Player.css';
import { NavLink } from 'react-router-dom'

const Player = () => {
    const {currentTrack} = useMusic()
    const [togglePlayer, setTogglePlayer] = useState(false)
    useEffect(()=>{
        if(currentTrack?.trackURL){
            setTogglePlayer(true)
        }
    },[currentTrack])
    const playerRef = useRef(null);
    const PlayerInstance = useRef(null)
    useOutsideAlerter(playerRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setTogglePlayer(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
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
            {currentTrack.trackURL &&
            <AudioPlayer
                ref={PlayerInstance}
                volume={0.5}
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