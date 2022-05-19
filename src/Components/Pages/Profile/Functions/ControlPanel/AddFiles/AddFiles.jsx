import React, {useState, useRef} from 'react'

import {useAuth} from '../../../../../../Contexts/UserContext'

import Modal from '../../../../../UI/Modal/Modal'

import cl from './AddFiles.module.css'
import modal from '../../../../../UI/Modal/Modal.module.css'
import {IoMusicalNotesOutline} from 'react-icons/io5'

import Track from '../../../../../UI/Player/Track/Track'

import axios from 'axios'
const AddFiles = () => {
  const {currentUser, serverURL} = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState(currentUser?.nickname)
  const [image, setImage] = useState('')
  const [track, setTrack] = useState('')
  const [tags, setTags] = useState('')
  const [desc, setDesc] = useState('')

  const uploadFile = useRef();
  const uploadImage = useRef();

  const HandleFileUploader = ()=>uploadFile.current.click()
  const HandleImageUploader = ()=>uploadImage.current.click()

  const handleFileSelect = (event)=>{
    let file = event.target.files[0]
    if (!file) {
      console.log('File is required');
      return false;
      }
    if (!file.name.match(/\.(mp3|wav)$/)) {
      console.log('select valid file.');
      return false;
    }
    setTrack(file)
  }

  const handleImageSelect = (event)=>{
    let image = event.target.files[0]
    if (!image) {
      console.log('image is required');
      return false;
      }
    if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
      console.log('select valid image.');
      return false;
    }
    setImage(image)
  }

  function SubmitTrack(){
    setIsLoading(true)
    let formDataFiles = new FormData();
    formDataFiles.append("track", track);
    formDataFiles.append("image", image);
    formDataFiles.append("title", title);
    formDataFiles.append("author", author);
    formDataFiles.append("tags", tags);
    formDataFiles.append("desc", desc);

    axios({
        method: "post",
        url: serverURL + "/music/addTrack",
        data: formDataFiles,
        withCredentials: true,
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      }).then((res)=>{
        console.log(res.status)
        if(res.status === 400 | res.status === 404){
          console.log(res)
        }
        if(res.status === 200){
          console.log(res.data)
          setTitle('')
          setAuthor('')
          setImage('')
          setTrack('')
          setTags('')
          setDesc('')
          setShowModal(false)
          setIsLoading(false)
        }
      })
      
  }

  return (
    <>
        <button className={cl.ActionBtn} onClick={()=> setShowModal(true)}>
            <IoMusicalNotesOutline className={cl.ActionBtnSvg}/>
            Добавить
        </button>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
            <div className={modal.ModalContent}>
                <h2>Добавить трек</h2>
                <h4>Предпросмотр:</h4>
                <Track track={{title, author, image}} mode='preview'/>
                <h4>Данные:</h4>
                <div className={cl.Row}>
                  <label>Трек:</label>
                  <button className={cl.SelectButton} onClick={()=>HandleFileUploader()}>Выберите трек</button>
                  <input ref={uploadFile} type='file' accept='.mp3, .wav' onChange={handleFileSelect}/>
                </div>
                <div className={cl.Row}>
                  <label>Название:</label>
                  <input type='text' placeholder='Название' value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                </div>
                <div className={cl.Row}>
                  <label>Описание:</label>
                  <textarea type='text' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                </div>
                <div className={cl.Row}>
                  <label>Обложка?:</label>
                  <button className={cl.SelectButton} onClick={()=>HandleImageUploader()}>Выберите обложку</button>
                  <input ref={uploadImage} type='file' accept='image/*' onChange={handleImageSelect}/>
                </div>
                <div className={cl.Row}>
                  <label>Теги:</label>
                  <input type='text' value={tags} onChange={(e)=>setTags(e.target.value)}/>
                </div>
                <div className={cl.Row}>
                  <input disabled={isLoading} type='submit' onClick={()=> SubmitTrack()}/>
                </div>
            </div>
        </Modal>
    </>
  )
}

export default AddFiles