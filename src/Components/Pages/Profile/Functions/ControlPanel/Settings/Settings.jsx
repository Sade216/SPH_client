import React, {useRef, useState} from 'react'

import Modal from '../../../../../UI/Modal/Modal'
import cl from './Settings.module.css'
import modal from '../../../../../UI/Modal/Modal.module.css'
import {IoSettingsOutline} from 'react-icons/io5'

const Settings = (props) => {
    
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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

    }

    return (
        <>
            {props.mode === 'profile' &&
                <button className={cl.ActionBtn} onClick={()=> setShowModal(true)}>
                    <IoSettingsOutline className={cl.ActionBtnSvg}/>
                    Настройки
                </button>
            }
            {props.mode === 'header' &&
                <button className={cl.ActionBtnHeader} onClick={()=> setShowModal(true)}>
                    Настройки
                </button>
            }
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className={modal.ModalContent}>
                    <h2>Настройки</h2>

                    <div className={cl.Row}>
                        <label>Фон профиля:</label>
                        <button className={cl.SelectButton} onClick={()=>HandleProfileBackgroundUploader()}>Выберите фон профиля</button>
                        <input ref={profileBackground} type='file' accept='image/*' onChange={handleProfileBackgroundSelect}/>
                    </div>

                    <div className={cl.Row}>
                        <label>О себе:</label>
                        <input type='text' placeholder='О себе' value={about} onChange={(e)=>setAbout(e.target.value)} required/>
                    </div>
                    
                    {/* <div className={cl.Row}>
                        <label>Описание:</label>
                        <textarea type='text' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                    </div> */}

                    <div className={cl.Row}>
                        <input disabled={isLoading} type='submit' onClick={()=> SubmitSettings()}/>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Settings