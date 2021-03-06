import React, { useEffect, useState } from 'react'

import cl from './Profile.module.css'
import card from '../../UI/Card.module.css'
import {Container, Row, Col} from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import AvatarUpload from './Functions/ControlPanel/AvatarUpload/AvatarUpload'
import AddFiles from './Functions/ControlPanel/AddFiles/AddFiles'
import Settings from './Functions/ControlPanel/Settings/Settings'

import FollowList from './Functions/ControlPanel/FollowList/FollowList'
import Collection from './Functions/ControlPanel/Collection/Collection'

import About from './Functions/MainFeed/About/About'
import Posts from './Functions/MainFeed/Posts/Posts'

import { useSelector } from 'react-redux'
import Library from './Functions/MainFeed/Library/Library'
import Featured from './Functions/MainFeed/Featured/Featured'

const Profile = ({preSelectedTab = 0}) => {
  const currentUser = useSelector(state => state.user.user)
  const theme = useSelector(state => state.user.theme)
  const {isAuthenticated} = currentUser

  const [tabIndex, setTabIndex] = useState(0)

  useEffect(()=>{
    setTabIndex(preSelectedTab)
  },[preSelectedTab])

  document.title = `Профиль - @${currentUser.nickname}`

  function AlternateBackgroundImage(){
    let string = ' ';
    for(var i = 0; i < 50; i++) {
      string += currentUser.nickname + ' ' ;
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
  return (
    isAuthenticated && 
      <div>
        <div className={cl.ProfileBackImage} style={
          {background: `linear-gradient(rgba(10,10,20,0.5) -150% , var(--background-01) 80%), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='200px'><text x='-30' y='27%' fill='${BgColor()}' font-size='3rem' font-weight='600' opacity='0.8'>${AlternateBackgroundImage()}</text><text x='-15' y='60%' fill='${BgColor()}' font-size='4rem' font-weight='600' opacity='0.8' >${AlternateBackgroundImage()}</text><text x='-5' y='93%' fill='${BgColor()}' font-size='3rem' font-weight='600' opacity='0.8' >${AlternateBackgroundImage()}</text></svg>")`}
        }></div>
        <div className={cl.Wrapper}>
          <Container>
            <Row>
              <Col xl={4} lg={5} md={12}>
                <div className={cl.ControlWrapper}>
                  <div className={card.Wrapper}>
                    <div className={cl.CardWrapper}>
                      <div className={cl.ProfileAvatar}>
                        <AvatarUpload/>
                      </div>
                      <div className={cl.ProfileData}>
                        <div className={cl.PrimaryText}>{currentUser.nickname}</div>
                        <div className={cl.Stats}>
                          <div className={cl.StatsElement}>
                            <div className={cl.StatsMainText}>
                              {currentUser.followers?.length}
                            </div>
                            <div>Отслеживают</div>
                          </div>
                          <div className={cl.VerticalLine}></div>
                          <div className={cl.StatsElement}>
                            <div className={cl.StatsMainText}>
                              {currentUser.trackList?.length}
                            </div>
                            <div>Загружено</div>
                          </div>
                          <div className={cl.VerticalLine}></div>
                          <div className={cl.StatsElement}>
                            <div className={cl.StatsMainText}>
                              {currentUser.visitors?.length}
                            </div>
                            <div>Просмотры</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={cl.ActionGrid}>
                    <Settings mode='profile'/>
                    <AddFiles/>
                  </div>

                  <Collection owner={currentUser.nickname} trackList={currentUser.trackList}/>
                  <FollowList userFollowers={currentUser.youFollow}/>

                </div>
              </Col>
              <Col xl={8} lg={7} md={12}>
                <About about={currentUser.about} pref_genres={currentUser.pref_genres}/>
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                  <TabList className={cl.Tabs}>
                    <Tab>Посты</Tab>
                    <Tab>Библиотека</Tab>
                    <Tab>Избранное</Tab>
                  </TabList>
                  <TabPanel className={cl.TabContent}>
                    <Posts user={currentUser}/>
                  </TabPanel>
                  <TabPanel className={cl.TabContent}>
                    <Library trackList={currentUser.trackList}/>
                  </TabPanel>
                  <TabPanel className={cl.TabContent}>
                    <Featured featuredList={currentUser.featuredList}/>
                  </TabPanel>
               </Tabs>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
  )
}

export default Profile