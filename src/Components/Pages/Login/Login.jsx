import React, {useState, useEffect} from 'react'

import cl from './Login.module.css'
import card from '../../UI/Card.module.css'
import {Container, Col, Row} from 'react-bootstrap'

import { useAuth } from '../../../Contexts/UserContext'

const Login = () => {

  const { loginForm, registerForm } = useAuth()

  const [loginLog, setLoginLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');

  const [loginReg,setLoginReg] = useState('');
  const [emailReg,setEmailReg] = useState('');
  const [passwordReg,setPasswordReg] = useState('');
  const [passwordConfirmReg,setPasswordConfirmReg] = useState('');

  function Log(){
    loginForm(loginLog, passwordLog)
  }
  function Reg(){
    if(passwordReg === passwordConfirmReg){
      registerForm(loginReg, emailReg, passwordReg)
    }
  }

  return (
    <div className={cl.Wrapper}>
        <Container>
          <Row>
            <Col className={cl.Colums}>
              <div className={card.Wrapper}>
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
              </div>
            </Col>
            <Col>
              <div className={card.Wrapper}>
                <div className={cl.Header}>
                  <div className={cl.Title}>
                    Регистрация
                  </div>
                </div>
                <div className={cl.Body}>
                  <input type='login' placeholder='Логин' value={loginReg} onChange={(e)=> setLoginReg(e.target.value)}/>
                  <input type='email' placeholder='Email' value={emailReg} onChange={(e)=> setEmailReg(e.target.value)}/>
                  <input type='password' placeholder='Пароль' value={passwordReg} onChange={(e)=> setPasswordReg(e.target.value)} />
                  <input type='password' placeholder='Повторите пароль' value={passwordConfirmReg} onChange={(e)=> setPasswordConfirmReg(e.target.value)}/>
                </div>
                <div className={cl.Footer}>
                  <input type='button' 
                    value='Регистрация'
                    disabled={!loginReg | !emailReg | !passwordReg | !passwordConfirmReg | (passwordReg !== passwordConfirmReg)}
                    onClick={()=> Reg()}/>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Login