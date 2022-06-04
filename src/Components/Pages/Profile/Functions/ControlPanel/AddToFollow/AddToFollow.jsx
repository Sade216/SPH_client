import React, {useState, useEffect} from 'react'

import cl from './AddToFollow.module.css'
import {BsPlusCircle} from 'react-icons/bs'

import { useDispatch } from 'react-redux'
import { isFollowed, setFollow, setUnFollow } from '../../../../../../Redux/reducers/asyncActions/fetchUser'
const AddToFollow = ({id}) => {
    const dispatch = useDispatch()

    const [isFollow, setIsFollow] = useState('loading')

    function GetIsFollowed(){
        dispatch(isFollowed(id)).then((res)=>{
            setIsFollow(res.data)
        })
    }

    function Follow(){
        dispatch(setFollow(id)).then((res)=>{
            setIsFollow(res.data)
        })
    }

    function UnFollow(){
        dispatch(setUnFollow(id)).then((res)=>{
            setIsFollow(res.data)
        })
    }

    useEffect(()=>{
        GetIsFollowed()
    },[])

    return (
        <>
            {isFollow === 'loading' && 
                <div className={cl.ActionBtn}></div>
            }
            {isFollow === false &&
                <button className={cl.ActionBtn} onClick={()=> Follow()}>
                    <BsPlusCircle/>
                    Отслеживать
                </button>
            }
            {isFollow === true &&
                <button className={cl.ActionBtn} onClick={()=> UnFollow()}>
                    <BsPlusCircle/>
                    Перестать отслеживать
                </button>
            }
            
        </>
    )
}

export default AddToFollow