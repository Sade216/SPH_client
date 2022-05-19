import React, {useState, useEffect} from 'react'

import cl from './AddToFollow.module.css'
import {BsPlusCircle} from 'react-icons/bs'
import axios from 'axios'
import { useAuth } from '../../../../../../Contexts/UserContext'

const AddToFollow = (props) => {
    const {currentUser, serverURL} = useAuth()
    const [isFollowed, setIsFollowed] = useState('loading')

    function GetIsFollowed(){
        axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/user/isFollowed/${props.id}`,
        }).then((res)=>{
            setIsFollowed(res.data)
        })
    }

    function Follow(){
        axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/user/setFollow/${props.id}`,
        }).then((res)=>{
            console.log(res.data)
            setIsFollowed(res.data)
        })
    }

    function UnFollow(){
        axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/user/setUnFollow/${props.id}`,
        }).then((res)=>{
            console.log(res.data)
            setIsFollowed(res.data)
        })
    }

    useEffect(()=>{
        GetIsFollowed()
    },[])

    return (
        <>
            {isFollowed === 'loading' && 
                <div className={cl.ActionBtn}></div>
            }
            {isFollowed === false &&
                <button className={cl.ActionBtn} onClick={()=> Follow()}>
                    <BsPlusCircle/>
                    Отслеживать
                </button>
            }
            {isFollowed === true &&
                <button className={cl.ActionBtn} onClick={()=> UnFollow()}>
                    <BsPlusCircle/>
                    Перестать отслеживать
                </button>
            }
            
        </>
    )
}

export default AddToFollow