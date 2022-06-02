import React from 'react'

import cl from './Header.module.css'
import {Container, Row, Col} from 'react-bootstrap'

import SearchBar from './SearchBar/SearchBar'
import UserBar from './UserBar/UserBar'
import MenuBar from './MenuBar/MenuBar'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className={cl.HeaderWrapper}>
        
        <Container className={cl.Header}>
          <Row>
            <Col lg={4}>
              <NavLink className={cl.Logo} to='/'>SPH</NavLink>
            </Col>
            
            <Col>
              <SearchBar/>
            </Col>
            <Col lg={2}>
              <UserBar/>
            </Col>
            <Col lg={1}>
              <MenuBar/>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Header