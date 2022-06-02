import React, {useRef} from 'react'

import {BsCamera} from 'react-icons/bs'
import cl from './AvatarUpload.module.css'

import axios from 'axios'
import { serverURL } from '../../../../../../Redux/config/axios';

import { useSelector } from 'react-redux';

const AvatarUpload = () => {
  const currentUser = useSelector(state => state.user.user)

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
    axios({
        method: "post",
        url: serverURL + "/user/change_avatar",
        data: formData,
        withCredentials: true,
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      }).then((res)=>{
        console.log(res);
      })
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