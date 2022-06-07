import React, {useState, useEffect} from 'react'

import cl from './Login.module.css'
import Card from '../../UI/Card'
import {Container, Col, Row} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { UserLogin, UserRegistration } from '../../../Redux/reducers/asyncActions/fetchUser'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  document.title = 'Логин'

  const dispatch = useDispatch()
  const {currentUser} = useSelector(state => state.user)
  const [loginLog, setLoginLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');

  const [loginReg,setLoginReg] = useState('');
  const [emailReg,setEmailReg] = useState('');
  const [passwordReg,setPasswordReg] = useState('');
  const [passwordConfirmReg,setPasswordConfirmReg] = useState('');

  function Log(){
    dispatch(UserLogin(loginLog, passwordLog))
  }
  function Reg(){
    if(passwordReg === passwordConfirmReg){
      dispatch(UserRegistration(loginReg, emailReg, passwordReg))
    }
  }

  return (
    <div className={cl.Wrapper}>
        <Container>
          <Row>
            <Col className={cl.Colums}>
              <Card>
                <div className={cl.Header}>
                  <div className={cl.Title}>
                    Логин
                  </div>
                </div>
                <div className={cl.Body}>
                  <input type='login' placeholder='Логин' value={loginLog} onChange={(e)=> setLoginLog(e.target.value)}/>
                  <input type='password' placeholder='Пароль' value={passwordLog} onChange={(e)=> setPasswordLog(e.target.value)}/>
                </div>
                <div className={cl.Footer}>
                  <input type='button' 
                    value='Войти в систему'
                    disabled={!loginLog | !passwordLog}
                    onClick={()=> Log()}/>
                </div>
              </Card>
            </Col>
            <Col>
              <Card>
                <div className={cl.Header}>
                  <div className={cl.Title}>
                    Регистрация
                  </div>
                </div>
                <div className={cl.Body}>
                  <input type='login' placeholder='Логин' value={loginReg} onChange={(e)=> setLoginReg(e.target.value)}/>
                  <input type='email' placeholder='Email' value={emailReg} onChange={(e)=> setEmailReg(e.target.value)}/>
                  <input type='password' placeholder='Пароль' value={passwordReg} onChange={(e)=> setPasswordReg(e.target.value)} />
                  <input type='password' placeholder='Повторите пароль' value={passwordConfirmReg} 
                    onChange={(e)=> setPasswordConfirmReg(e.target.value)}/>
                </div>
                <div className={cl.Footer}>
                  <input type='button' 
                    value='Регистрация'
                    disabled={!loginReg | !emailReg | !passwordReg | !passwordConfirmReg | (passwordReg !== passwordConfirmReg)}
                    onClick={()=> Reg()}/>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Login