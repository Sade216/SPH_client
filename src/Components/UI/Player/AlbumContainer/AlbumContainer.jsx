import React, { useEffect, useRef } from 'react'

import cl from './AlbumContainer.module.css'

const AlbumContainer = ({children}) => {

    const ScrollBar = useRef()

    function scrollHorizontally(e) {
        e.preventDefault();
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        ScrollBar.current.scrollLeft -= (delta * 210);
    }

    useEffect(()=>{
        ScrollBar?.current?.addEventListener('mousewheel', scrollHorizontally);
    },[])

    return (
        <div ref={ScrollBar} className={cl.Wrapper}>
            {children}
        </div>
    )
}

export default AlbumContainer