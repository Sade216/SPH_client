import React, {useRef, useState} from 'react'

import Modal from '../../../../../UI/Modal/Modal'
import cl from './Settings.module.css'
import modal from '../../../../../UI/Modal/Modal.module.css'
import {IoSettingsOutline} from 'react-icons/io5'

import { ToggleButton, ButtonGroup  } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import { userSlice } from '../../../../../../Redux/reducers/UserReducer'

const Settings = ({mode}) => {
    const dispatch = useDispatch()
    const {isAuthenticated} = useSelector(state => state.user)

    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const defaultTheme = localStorage.getItem('TYPE_OF_THEME') ? localStorage.getItem('TYPE_OF_THEME') : false

    const [theme, setTheme] = useState(defaultTheme === 'light' ? false : true)
    const [about, setAbout] = useState('')
    const [backgroundImage, setBackgroundImage] = useState('')

    const profileBackground = useRef()
    const uploadImage = useRef();
  
    const HandleProfileBackgroundUploader = ()=>profileBackground.current.click()
    // const HandleImageUploader = ()=>uploadImage.current.click()
  
    const handleProfileBackgroundSelect = (event)=>{
        let image = event.target.files[0]
        if (!image) {
          console.log('image is required');
          return false;
          }
        if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
          console.log('select valid image.');
          return false;
        }
        setBackgroundImage(image)
    }

    function SubmitSettings(){
        if(theme === true){
            dispatch(userSlice.actions.changeTheme('dark'))
        }
        else{
            dispatch(userSlice.actions.changeTheme('light'))
        }
    }

    return (
        <>
            {mode === 'profile' ?
                <button className={cl.ActionBtn} onClick={()=> setShowModal(true)}>
                    <IoSettingsOutline className={cl.ActionBtnSvg}/>
                    Настройки
                </button>
                : mode === 'header' &&
                <button className={cl.ActionBtnHeader} onClick={()=> setShowModal(true)}>
                    Настройки
                </button>
            }
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className={modal.ModalContent}>
                    <h2>Настройки</h2>
                    {isAuthenticated &&
                        <>
                            <div className={cl.Row}>
                                <label>Фон профиля:</label>
                                <button className={cl.SelectButton} onClick={()=>HandleProfileBackgroundUploader()}>Выберите фон профиля</button>
                                <input ref={profileBackground} type='file' accept='image/*' onChange={handleProfileBackgroundSelect}/>
                            </div>

                            <div className={cl.Row}>
                                <label>О себе:</label>
                                <input type='text' placeholder='О себе' value={about} onChange={(e)=>setAbout(e.target.value)} required/>
                            </div>
                        </>
                    }
                    
                    <div className={cl.Row}>
                        <label>Тема:</label>
                        <label className={cl.SwitchTheme}>
                            <input className={cl.SwitchThemeBtn} type='checkbox' checked={theme} onChange={()=>setTheme(!theme)}/>
                            Темная тема
                        </label>
                    </div>

                    <div className={cl.Row}>
                        <input disabled={isLoading} type='submit' onClick={()=> SubmitSettings()}/>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Settings