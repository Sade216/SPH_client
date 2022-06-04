import React, {useEffect, useRef} from 'react'

import cl from './Modal.module.css'

import {AiOutlineCloseCircle} from 'react-icons/ai'

const Modal = ({ modalStyle, children, show, onClose, backdropStyle, outsideClick}) => {
    const modalRef = useRef(null);
    const ModalClickOutside = useRef(null)
    useOutsideAlerter(ModalClickOutside);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    if(!outsideClick){
                        onClose()
                    }
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, outsideClick]);
    }
    useEffect(() => {
        if (show) {
            modalRef.current.classList.add(cl.Visible);
        }
        else {
            modalRef.current.classList.remove(cl.Visible);
        }
    },[show]);
    return (
        <React.Fragment>
            <div ref={modalRef} style={backdropStyle} className={cl.ModalWrap}>
                <div style={modalStyle} className={cl.Modal} ref={ModalClickOutside}>
                <button
                    onClick={onClose}
                    className={cl.CloseBtn}
                ><AiOutlineCloseCircle/>
                </button>
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Modal