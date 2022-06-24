import React, {useRef, useState, useEffect} from 'react'

import cl from './Profile.module.css'
import card from '../../UI/Card.module.css'
import {Container, Row, Col} from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Collection from './Functions/ControlPanel/Collection/Collection'
import About from './Functions/MainFeed/About/About'
import AddToFollow from './Functions/ControlPanel/AddToFollow/AddToFollow'
import FollowList from './Functions/ControlPanel/FollowList/FollowList'
import Posts from './Functions/MainFeed/Posts/Posts'

import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { serverURL } from '../../../Redux/config/axios'

import { useSelector } from 'react-redux'
import Library from './Functions/MainFeed/Library/Library'
import Featured from './Functions/MainFeed/Featured/Featured'

const ProfileDifferent = () => {
  let location = useLocation();
  let User = location.pathname.slice(2).toLocaleLowerCase();
  const currentUser = useSelector(state => state.user.user)
  const theme = useSelector(state => state.user.theme)
  const {role, isAuthenticated} = currentUser

  const [pageUser, setPageUser] = useState(null)

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
    setPageUser(null)
    getUserPage()
  },[location])

  document.title = `Профиль - @${pageUser?.nickname}`

  function AlternateBackgroundImage(){
    let string = ' ';
    for(var i = 0; i < 50; i++) {
      string += pageUser?.nickname + ' ' ;
    }
    return string.toString();
  }

  function BgColor(){
    if(theme === 'light'){
      return 'black'
    }
    else if(theme === 'dark'){
      return 'white'
    }
  }

  return (pageUser ?
      <>
        <div className={cl.ProfileBackImage} style={pageUser.nickname &&
          {background: `linear-gradient(rgba(10,10,20,0.5) -150% , var(--background-01) 80%), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='200px'><text x='-30' y='27%' fill='${BgColor()}' font-size='3rem' font-weight='600' opacity='0.8'>${AlternateBackgroundImage()}</text><text x='-15' y='60%' fill='${BgColor()}' font-size='4rem' font-weight='600' opacity='0.8' >${AlternateBackgroundImage()}</text><text x='-5' y='93%' fill='${BgColor()}' font-size='3rem' font-weight='600' opacity='0.8' >${AlternateBackgroundImage()}</text></svg>")`}
        }></div>
        <div className={cl.Wrapper}>
          <Container>
            <Row>
              <Col xl={4} lg={5} md={12}>
                <div className={card.Wrapper}>
                  <div className={cl.CardWrapper}>
                    <div className={cl.ProfileAvatar}>
                      <div className={cl.ProfileImage} style={
                        {backgroundImage: `url(${pageUser.avatarURL === 'none' 
                          ? './assets/questionmark.jpg' 
                          : pageUser.avatarURL})`}}>
                      </div>
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
                <Collection trackList={pageUser.trackList}/>
                <FollowList userFollowers={pageUser.youFollow}/>
              </Col>
              <Col xl={8} lg={7} md={12}>
                <About about={pageUser.about} pref_genres={pageUser.pref_genres}/>
                <Tabs>
                  <TabList className={cl.Tabs}>
                    <Tab>Посты</Tab>
                    <Tab>Библиотека</Tab>
                    <Tab>Избранное</Tab>
                  </TabList>
                  <TabPanel className={cl.TabContent}>
                    <Posts user={pageUser}/>
                  </TabPanel>
                  <TabPanel className={cl.TabContent}>
                    <Library trackList={pageUser.trackList}/>
                  </TabPanel>
                  <TabPanel className={cl.TabContent}>
                    <Featured featuredList={pageUser.featuredList}/>
                  </TabPanel>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </div>
      </>
      :
      <Container>
        <div className={cl.PrimaryText}>Страница не найдена</div>
      </Container>
  )
}

export default ProfileDifferent