import React, {useState, useEffect, useRef} from 'react'

import cl from './Track.module.css'

import { NavLink } from 'react-router-dom'

const TrackPreview = (props) => {

  /* Превью картинки*/
  const [imageURL, setImageURL] = useState(null);

  const image = props.image
  const author = props.author
  const title = props.title

  const readURL = image => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onloadend = e => res(e.target.result);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(image);
    });
  };
  const preview = async image => {
    await readURL(image).then((e)=> setImageURL(e));
  };
  useEffect(()=>{
    preview(image)
  },[image])
  /* Конец превью картинки*/

  
  return (
    <div className={cl.TrackWrapper}>
      <div className={cl.ImageWrapper}>
        <div className={cl.Image} style={{backgroundImage: `url(${imageURL ? imageURL : './assets/questionmark.jpg'})`}}>
        </div>
      </div>
      <div className={cl.Main}>
          <div className={cl.Credentials}>
              <div className={cl.Title}>{title ? title : "Без названия?"}</div>
              <NavLink className={cl.Author} to={`/@${author}`}>{author ? author : "Без автора???????"}</NavLink>
          </div>
      </div>
    </div>
  )
}

export default TrackPreview