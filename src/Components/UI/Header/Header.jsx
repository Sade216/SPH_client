import React, {useState} from 'react'

import cl from './Header.module.css'
import {Container, Row, Col, Button, Offcanvas} from 'react-bootstrap'

import SearchBar from './SearchBar/SearchBar'
import UserBar from './UserBar/UserBar'
import MenuBar from './MenuBar/MenuBar'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className={cl.HeaderWrapper}>
        
        <Container className={cl.Header}>
          <Row>
            <Col md={4}>
              <NavLink className={cl.Logo} to='/'>SPH</NavLink>
            </Col>
            
            <Col>
              <SearchBar/>
            </Col>
            <Col md={2}>
              <UserBar/>
            </Col>
            <Col md={1}>
              <MenuBar/>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Header