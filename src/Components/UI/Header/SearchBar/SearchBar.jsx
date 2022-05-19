import React, {useState, useEffect} from 'react'
import cl from './SearchBar.module.css'
import {BiSearch} from 'react-icons/bi'
// import {AiOutlineExclamationCircle} from 'react-icons/ai'

import Modal from '../../Modal/Modal'
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')
  const [searchValueState, setSearchValueState] = useState('idle')

  useEffect(() => {
    if(searchValue.length <=2){
      setSearchValueState('idle')
    }
  }, [searchValue])
  const HandleSearchBar = (event) =>{
    const string = event.target.value
    setSearchValue(string)
  }
  function SearchParams(){
    if(searchValue.length > 2){
      if(!searchValue.match(/\s\s+/)){
        // console.log('Правильно -' + searchValue)
        setSearchValueState('load')
        function asd(){
          setTimeout(()=>{
            setSearchValueState('idle')
            setShowModal(true)
          }, 3000)
        }
      asd()
      }
      else{
        // console.log('Ошибка -' + searchValue)
        setSearchValueState('err')
      }
    }
    else return
  }

  const [showModal, setShowModal] = useState(false)



  return (
    <div className={cl.Wrapper}>
      <input disabled={searchValueState === 'load'} state={searchValueState} type="search" id="site-search" placeholder='Search for a new stuff HERE...' value={searchValue} onChange={HandleSearchBar}/>
      <BiSearch className={cl.SearchIcon} onClick={()=>SearchParams()}/>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
            
      </Modal>
    </div>
  )
}

export default SearchBar