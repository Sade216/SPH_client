import React, {useRef} from 'react'

import {BsCamera} from 'react-icons/bs'
import cl from './AvatarUpload.module.css'

import axios from 'axios'
import { serverURL } from '../../../../../../Redux/config/axios';

import { useDispatch, useSelector } from 'react-redux';
import { ChangeAvatar } from '../../../../../../Redux/reducers/asyncActions/fetchUser';

const AvatarUpload = () => {
  const currentUser = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const imageRef = useRef();
  function ChangeImage(){
    imageRef.current.click();
  }
  const handleFileSelect = (event) => {
    let image = event.target.files[0]
    if (!image) {
      console.log('image is required');
      return false;
      }
    if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
      console.log('select valid image.');
      return false;
    }

    let formData = new FormData();
    formData.append("image", image);
    dispatch(ChangeAvatar(formData))
  }
  return (
    <>
        <div className={cl.ProfileImage} style={{backgroundImage: `url(${currentUser.avatarURL === 'none' ? './assets/questionmark.jpg' : currentUser.avatarURL})`}}></div>
        <div className={cl.ImageUploader} onClick={()=>ChangeImage()}>
        <input type='file' ref={imageRef} accept="image/*" onChange={handleFileSelect}/>
        <BsCamera/>
        </div>
    </>
  )
}

export default AvatarUpload