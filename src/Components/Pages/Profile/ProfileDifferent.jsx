import React, {useRef, useState, useEffect} from 'react'

import cl from './Profile.module.css'
import card from '../../UI/Card.module.css'
import {Container, Row, Col} from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { useAuth } from '../../../Contexts/UserContext'

import Collection from './Functions/ControlPanel/Collection/Collection'
import About from './Functions/MainFeed/About/About'
import AddToFollow from './Functions/ControlPanel/AddToFollow/AddToFollow'
import FollowList from './Functions/ControlPanel/FollowList/FollowList'

// import {IoSettingsOutline} from 'react-icons/io5'
import axios from 'axios'

const Profile = () => {
  const { serverURL, currentUser } = useAuth();

  const [pageUser, setPageUser] = useState(null)

  const User = window.location.pathname.slice(2).toLocaleLowerCase();

  function getUserPage(){
    axios({
      method: 'GET',
      withCredentials: true,
      url: serverURL + `/user/${User}`,
    }).then((res)=>{
      if(res?.status === 200){
        setPageUser(res.data)
      }
    })
  }

  useEffect(()=>{
    getUserPage()
  },[])

  function AlternateBackgroundImage(){
    let string = ' ';
    for(var i = 0; i < 50; i++) {
      string += pageUser.nickname + ' ' ;
    }
    return string.toString();
  }

  const imageRef = useRef();

  function ChangeImage(){
    imageRef.current.click();
  }


  return (
    pageUser !== null && 
      <>
        <div className={cl.ProfileBackImage} style={
          {background: `linear-gradient(rgba(10,10,20,0.5) -150% , var(--background-01) 80%), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='200px'><text x='-30' y='27%' fill='white' font-size='3rem' font-weight='600' opacity='0.8'>${AlternateBackgroundImage()}</text><text x='-15' y='60%' fill='white' font-size='4rem' font-weight='600' opacity='0.8' >${AlternateBackgroundImage()}</text><text x='-5' y='93%' fill='white' font-size='3rem' font-weight='600' opacity='0.8' >${AlternateBackgroundImage()}</text></svg>")`}
        }></div>
        <div className={cl.Wrapper}>
          <Container>
            <Row>
              <Col lg={4}>
                <div className={card.Wrapper}>
                  <div className={cl.CardWrapper}>
                    <div className={cl.ProfileAvatar}>
                      <div className={cl.ProfileImage} style={{backgroundImage: `url(${pageUser.avatarURL === 'none' ? './assets/questionmark.jpg' : pageUser.avatarURL})`}}></div>
                    </div>
                    <div className={cl.ProfileData}>
                        <div className={cl.PrimaryText}>{pageUser.nickname}</div>
                        <div className={cl.Stats}>
                          <div className={cl.StatsElement}>
                            <div className={cl.StatsMainText}>
                              {pageUser.followers?.length}
                            </div>
                            <div>Отслеживают</div>
                          </div>
                          <div className={cl.VerticalLine}></div>
                          <div className={cl.StatsElement}>
                            <div className={cl.StatsMainText}>
                              {pageUser?.trackList?.length}
                            </div>
                            <div>Загружено</div>
                          </div>
                          <div className={cl.VerticalLine}></div>
                          <div className={cl.StatsElement}>
                            <div className={cl.StatsMainText}>
                              {pageUser?.visitors?.length}
                            </div>
                            <div>Просмотры</div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div className={cl.ActionGrid}>
                  {currentUser &&
                    <AddToFollow id={pageUser.nickname}/>
                  }
                </div>
                {/* Передать nickname через props
                Добавить followList функцию */}
                <Collection/>
              </Col>
              <Col>
                <About/>
                <Tabs>
                  <TabList className={cl.Tabs}>
                    <Tab>Посты</Tab>
                    <Tab>Популярное</Tab>
                    <Tab>Подборки</Tab>
                  </TabList>
                  <TabPanel className={cl.TabContent}>
                      <h3>Пользователь ничего не публикует</h3>
                  </TabPanel>
                  <TabPanel className={cl.TabContent}>
                      <h3>Популярное</h3>
                  </TabPanel>
                  <TabPanel className={cl.TabContent}>
                      <h3>Подборки</h3>
                  </TabPanel>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </div>
      </>
  )
}

export default Profile