import React, {useRef, useState, useEffect} from 'react'

import cl from './Profile.module.css'
import card from '../../UI/Card.module.css'
import {Container, Row, Col} from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Collection from './Functions/ControlPanel/Collection/Collection'
import About from './Functions/MainFeed/About/About'
import AddToFollow from './Functions/ControlPanel/AddToFollow/AddToFollow'
import FollowList from './Functions/ControlPanel/FollowList/FollowList'

// import {IoSettingsOutline} from 'react-icons/io5'
import axios from 'axios'
import { serverURL } from '../../../Redux/config/axios'

import { useSelector } from 'react-redux'

const Profile = () => {

  const [pageUser, setPageUser] = useState(null)
  const User = window.location.pathname.slice(2).toLocaleLowerCase();

  const currentUser = useSelector(state => state.user.user)
  const {role, isAuthenticated} = currentUser

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

  document.title = `Профиль - @${pageUser?.nickname}`

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
              <Col xl={4} lg={5} md={12}>
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
                {isAuthenticated && 
                  <div className={cl.ActionGrid}>
                      <AddToFollow id={pageUser.nickname}/>
                  </div>
                }
                {/* Передать nickname через props
                Добавить followList функцию */}
                <Collection trackList={pageUser.trackList}/>
                <FollowList userFollowers={pageUser.youFollow}/>
              </Col>
              <Col xl={8} lg={7} md={12}>
                <About about={pageUser.about} pref_genres={pageUser.pref_genres}/>
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