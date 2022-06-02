import React, {useEffect, useState, useRef} from 'react'
import {NavLink} from 'react-router-dom'

import NewsFetch from './Assets/NewsFetch/NewsFetch'

import {Container, Row, Col, Spinner} from 'react-bootstrap'
import card from '../../UI/Card.module.css'
import cl from './News.module.css'
import { useSelector } from 'react-redux'


const News = () => {
  document.title = 'Новости'

  const {currentUser} = useSelector(state => state.user.user);
  

  return (
    <div className={cl.Wrapper} >
      <Container >
        <Row>
            <Col>
              <NewsFetch/>
            </Col>
            <Col lg={{order: 'last', span: 3}} sm={{order: 'first', span: 12}} xs={{order: 'first', span: 12}} >
                <div className={card.Wrapper}>
                  <div className={cl.CardWrapper}>
                    <div className={cl.Header}>
                      <div className={cl.Title}>Навигация:</div>
                    </div>
                    <div>
                      <NavLink className={cl.Link} to='/lib'>Библиотека</NavLink>
                      {!currentUser ?
                        <NavLink className={cl.Link} to='/login'>Логин/Реистрация</NavLink>
                        :
                        <NavLink className={cl.Link} to={`@${currentUser.nickname}`}>Профиль</NavLink>
                      }
                    </div>
                  </div>
                </div>
                <div className={card.Wrapper}>
                  <div className={cl.CardWrapper}>
                    <div className={cl.Header}>
                      <div className={cl.Title}>Новые релизы:</div>
                    </div>
                    <div className={cl.Spinner}> 
                      <Spinner animation="border" /> 
                    </div>
                  </div>
                </div>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default News;


