import React from 'react'

import cl from './Profile.module.css'
import card from '../../UI/Card.module.css'
import {Container, Row, Col} from 'react-bootstrap'

import AvatarUpload from './Functions/ControlPanel/AvatarUpload/AvatarUpload'
import AddFiles from './Functions/ControlPanel/AddFiles/AddFiles'
import Settings from './Functions/ControlPanel/Settings/Settings'

import About from './Functions/MainFeed/About/About'
import CreatePost from './Functions/MainFeed/CreatePost/CreatePost'
import FollowList from './Functions/ControlPanel/FollowList/FollowList'
import Collection from './Functions/ControlPanel/Collection/Collection'

import { useAuth } from '../../../Contexts/UserContext'

import {BsPencil} from 'react-icons/bs'

const Profile = () => {
  const { currentUser } = useAuth();

  function AlternateBackgroundImage(){
    let string = ' ';
    for(var i = 0; i < 50; i++) {
      string += currentUser.nickname + ' ' ;
    }
    return string.toString();
  }

  return (
    currentUser && 
      <div>
        <div className={cl.ProfileBackImage} style={
          {background: `linear-gradient(rgba(10,10,20,0.5) -150% , var(--background-01) 80%), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='200px'><text x='-30' y='27%' fill='white' font-size='3rem' font-weight='600' opacity='0.8'>${AlternateBackgroundImage()}</text><text x='-15' y='60%' fill='white' font-size='4rem' font-weight='600' opacity='0.8' >${AlternateBackgroundImage()}</text><text x='-5' y='93%' fill='white' font-size='3rem' font-weight='600' opacity='0.8' >${AlternateBackgroundImage()}</text></svg>")`}
        }></div>
        <div className={cl.Wrapper}>
          <Container>
            <Row>
              <Col lg={4}>
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

                    {/* <button className={cl.ActionBtn}>
                      <BsPencil className={cl.ActionBtnSvg}/>
                      Изменить
                    </button> */}
                    <Settings mode='profile'/>
                    <AddFiles/>
                  </div>
                  <Collection/>
                  <FollowList userFollowers={currentUser.youFollow}/>
                </div>
              </Col>
              <Col>
                <About/>
                <CreatePost/>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
  )
}

export default Profile