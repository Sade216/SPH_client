import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '../../../Redux/reducers/UserReducer';
const LightTheme = React.lazy(() => import('./lightTheme'));
const DarkTheme = React.lazy(() => import('./darkTheme'));



const ThemeSelector = ({ children }) => {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.user.theme)

  useEffect(()=>{
    dispatch(userSlice.actions.changeTheme(localStorage.getItem('TYPE_OF_THEME') || 'dark'))
  },[])

  useEffect(()=>{
    if(theme){
      localStorage.setItem('TYPE_OF_THEME', theme)
    }
  },[theme])
  
  return (theme &&
    <>
      <React.Suspense fallback={<></>}>
        {(theme === 'light') && <LightTheme />}
        {(theme === 'dark') && <DarkTheme />}
      </React.Suspense>
      {children}
    </>
  )
}

export default ThemeSelector