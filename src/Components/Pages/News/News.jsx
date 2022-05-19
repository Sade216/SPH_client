import React, {useEffect, useState, useRef} from 'react'
import {NavLink} from 'react-router-dom'

import {Container, Row, Col, Spinner} from 'react-bootstrap'
import card from '../../UI/Card.module.css'
import cl from './News.module.css'
import {BiLike} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {HiOutlineDotsHorizontal} from 'react-icons/hi'

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import axios from 'axios'
import { useAuth } from '../../../Contexts/UserContext'

const queryClientGetNews = new QueryClient()


function NewsFetch() {
  const { serverURL, currentUser} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const MenuBarRef = useRef(null);
  useOutsideAlerter(MenuBarRef);
  function useOutsideAlerter(ref) {
      useEffect(() => {
          function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target)) {
              setIsMenuOpen(false)
              }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [ref]);
  }
  function MenuToggler(){
      setIsMenuOpen(!isMenuOpen);
  }
  //--------------------НОВОСТИ--------------------
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  async function getNews(page = 1){
    const { data } = await axios({
      method: 'GET',
      withCredentials: true,
      url: serverURL + `/news/getAll?page=${page}`
    })
    setPageCount(data?.pages)
    return data.data
  }
  const {isLoading, isError, error, data} = 
    useQuery(['news', page], () => getNews(page), { keepPreviousData : true, staleTime: 300000 })
    
  useEffect(() => {
      queryClientGetNews.prefetchQuery(['news', page + 1], () =>
        getNews(page + 1)
      )
  }, [data, page])
//---------------КОНЕЦ НОВОСТЯМ-------------------


  return (
    <div>
      {isLoading ? (
        <div className={cl.Spinner}> <Spinner animation="border" role="status"/></div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
          <>
            {
            data.map((news, index)=>(
                <div className={card.Wrapper} key={index}>
                  <div className={cl.CardWrapper}>
                    <div className={cl.Header}>
                      <div className={cl.Title}>{news.title}</div>
                      <NavLink className={cl.Author} to={`/@${news.author}`}>от: {news.author}</NavLink>
                    </div>
                    <div className={cl.Text}>{news.text}</div>
                    <div className={cl.Tags}>
                      {news.tags.map((tag, index)=>(
                        <NavLink className={cl.Tag} key={index} to={`/search?track_title=${tag}`}>{tag}</NavLink>
                      ))}
                    </div>
                    <hr className={cl.Hr} />
                    <div className={cl.Footer}>
                      <div className={cl.Row}>
                        <div className={cl.Element}>
                          <BiLike disabled={!currentUser} active={news.likes.indexOf(currentUser?.nickname)}/>
                        </div>
                        <div className={cl.LikesCounter}>{news.likes.length <= 0 ? '' : news.likes.length}</div>
                        <div className={cl.Element}>
                          <FaRegComment/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ))
          }
          <div className={cl.PaginationWrapper}>
              <button
                onClick={() => setPage(old => Math.max(old - 1, 0))}
                disabled={page <= 1}
              >
                <IoIosArrowBack/>
              </button>
              <div className={cl.PageCounter}>{page}</div>
              <button
                onClick={() => {
                  setPage(old => old + 1)
                }}
                disabled={page === pageCount}
              >
                <IoIosArrowForward/>
              </button>
            </div>
        </>
      )}
    </div>
  )
}

const News = () => {
  const {currentUser} = useAuth();
  
  return (
    <div className={cl.Wrapper} >
      <Container >
        <Row>
            <Col>
              <QueryClientProvider client={queryClientGetNews}>
                <NewsFetch />
              </QueryClientProvider>
            </Col>
            <Col xs={3}>
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


