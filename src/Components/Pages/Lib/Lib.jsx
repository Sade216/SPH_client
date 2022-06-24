import React, { useState, useEffect } from 'react'

import cl from './Lib.module.css'
import card from '../../UI/Card.module.css'
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Track from '../../UI/Player/Track/Track'
import axios from 'axios';

import { serverURL } from '../../../Redux/config/axios';

import {
    useQuery,
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
import Album from '../../UI/Player/Album/Album';
import AlbumContainer from '../../UI/Player/AlbumContainer/AlbumContainer';
  
const queryClientGetTrack = new QueryClient()
const queryClientGetAlbums = new QueryClient()

const Lib = () => {
    document.title = 'Библиотека'
    
    function TracksFetch(){
        const [page, setPage] = useState(1);
        const [pageCount, setPageCount] = useState(1);

        async function getMusic(page = 1, limit = 10){
            const { data } = await axios({
                method: 'GET',
                withCredentials: true,
                url: serverURL + `/music/getAll?page=${page}&limit=${limit}`
            })
            setPageCount(data?.pages)
            return data.data
        }
        const {isLoading, isError, error, data} = 
            useQuery(['music', page], () => getMusic(page), { keepPreviousData : true, staleTime: 300000 })
            
        useEffect(() => {
            if(pageCount > 1){
                queryClientGetTrack.prefetchQuery(['music', page + 1], () =>
                    getMusic(page + 1)
                )
            }
        }, [data, page, pageCount])

        return(
            !data ? <div className={cl.Spinner}><Spinner animation="border" role="status"/></div>
            : 
            <>
                {data.map((track, index)=>(
                    <Track key={index} trackProp={track} currentPlayList={data}/>
                ))}
            </>
        )
    }

    function AlbumFetch(){
        const [page, setPage] = useState(1);
        const [pageCount, setPageCount] = useState(1);

        async function getMusic(page = 1, limit = 10){
            const { data } = await axios({
                method: 'GET',
                withCredentials: true,
                url: serverURL + `/music/getAlbums?page=${page}&limit=${limit}`
            })
            setPageCount(data?.pages)
            return data.data
        }

        const {isLoading, isError, error, data} = 
            useQuery(['music', page], () => getMusic(page), { keepPreviousData : true, staleTime: 300000 })
            
        useEffect(() => {
            if(pageCount > 1){
                queryClientGetTrack.prefetchQuery(['music', page + 1], () =>
                    getMusic(page + 1)
                )
            }
        }, [data, page, pageCount])

        return(
            !data ? <div className={cl.Spinner}><Spinner animation="border" role="status"/></div>
            : 
            <AlbumContainer>
                {data.map((album, index)=>(
                    <Album key={index} album={album}/>
                ))}
            </AlbumContainer>
        )
    }

    return (
    <div className={cl.Wrapper}>
        <Container >
            <Row>
                <Tabs>
                    <TabList className={cl.Tabs}>
                        <Tab>Вся музыка</Tab>
                        {/* <Tab>Популярное</Tab>
                        <Tab>Подборки</Tab> */}
                    </TabList>
                    <TabPanel className={cl.TabContent}>
                        {/* <h3>Альбомы:</h3>
                        <QueryClientProvider client={queryClientGetAlbums}>
                            <AlbumFetch/>
                        </QueryClientProvider> */}
                        <hr />
                        <h3>Все композиции:</h3>
                        <QueryClientProvider client={queryClientGetTrack}>
                            <TracksFetch/>
                        </QueryClientProvider>
                    </TabPanel>
                    {/* <TabPanel className={cl.TabContent}>
                        <h3>Популярное</h3>
                    </TabPanel>
                    <TabPanel className={cl.TabContent}>
                        <h3>Подборки</h3>
                    </TabPanel> */}
                </Tabs>
            </Row>
        </Container>
    </div>
  )
}

export default Lib