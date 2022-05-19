import React, {createContext, useContext, useEffect, useState} from 'react'

import axios from 'axios'

import { useAuth } from './UserContext';


const MusicContext = createContext({
    // getTrack: ()=> Promise, 
    ChangeTrack: ()=> Promise,
    // getTrackData: ()=> Promise,
    // getCollection: ()=> Promise,
    UserPlaylist: null,
    currentTrack: null,
})

export const useMusic = () => useContext(MusicContext)

export default function MusicContextProvider({children}) {
    const {currentUser} = useAuth()

    const [UserPlaylist, setUserPlaylist] = useState([]);
    const [currentTrack, setCurrentTrack] = useState([]);

    // const navigate = useNavigate();

    useEffect(()=>{
        
    },[currentTrack]);

    function ChangeTrack(track){
        setCurrentTrack(track)
    }

    // function getUserPlaylist(name){
    //     axios({
    //         method: 'GET',
    //         withCredentials: true,
    //         url: serverURL + '',
    //     }).then((res)=>{
    //         setUserPlaylist(res)
    //     })
    // }

    // function getTrack(id) {
    //     axios({
    //         method: 'POST',
    //         data:{
    //             id
    //         },
    //         withCredentials: true,
    //         url: serverURL + '',
    //         }).then((res)=>{
    //         ToastSuccses(res)
    //         })
    // }

    const value = {
        // getTrack,
        ChangeTrack,
        // getTrackData,
        // getCollection,
        UserPlaylist,
        currentTrack,
    }
    return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}