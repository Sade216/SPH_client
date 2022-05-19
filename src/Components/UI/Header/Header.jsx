import React from 'react'

import cl from './Header.module.css'
import {Container, Row, Col, Spinner} from 'react-bootstrap'

import SearchBar from './SearchBar/SearchBar'
import UserBar from './UserBar/UserBar'
import MenuBar from './MenuBar/MenuBar'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className={cl.HeaderWrapper}>
        <Container className={cl.Header}>
          <Row>
            <Col>
              <NavLink className={cl.Logo} to='/'>SPH</NavLink>
            </Col>
            <Col xs={1}>
              <MenuBar/>
            </Col>
            <Col  xs={4}>
              <SearchBar/>
            </Col>
            <Col xs={3}>
              <UserBar/>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Header