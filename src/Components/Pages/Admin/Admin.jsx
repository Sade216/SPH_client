import React, {useState, useEffect} from 'react'

import cl from './Admin.module.css'
import card from '../../UI/Card.module.css'
import {Container, Col, Row} from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Admin = () => {
  document.title = 'Админ-панель'

  return (
    <div className={cl.Wrapper}>
        <Container>
          <Row>
            <Col>
              <Tabs>
                <TabList className={cl.Tabs}>
                    <Tab>Пользователи</Tab>
                    <Tab>Новости</Tab>
                    <Tab>Репорты</Tab>
                </TabList>

                <TabPanel className={cl.TabContent}>
                  <h3>Пользователи</h3>
                </TabPanel>
                <TabPanel className={cl.TabContent}>
                    <h3>Новости</h3>
                </TabPanel>
                <TabPanel className={cl.TabContent}>
                    <h3>Репорты</h3>
                </TabPanel>
              </Tabs>
              {/* <div className={card.Wrapper}>
                <div className={cl.Header}>
                  <div className={cl.Title}>
                    Логин
                  </div>
                </div>
                <div className={cl.Body}>

                </div>
                <div className={cl.Footer}>

                </div>
              </div> */}
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Admin