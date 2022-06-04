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
  
const queryClientGetMusic = new QueryClient()

const Lib = () => {
    document.title = 'Библиотека'
    
    function Music(){
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
                queryClientGetMusic.prefetchQuery(['music', page + 1], () =>
                    getMusic(page + 1)
                )
            }
        }, [data, page, pageCount])

        return(
            !data ? <div className={cl.Spinner}> <Spinner animation="border" role="status"/></div>
            : 
            <>
                {data.map((track, index)=>(
                    <Track key={index} trackProp={track} currentPlayList={data}/>
                ))}
            </>
        )
    }

    return (
    <div className={cl.Wrapper}>
        <Container >
            <Row>
                <Tabs>
                    <TabList className={cl.Tabs}>
                        <Tab>Вся музыка</Tab>
                        <Tab>Популярное</Tab>
                        <Tab>Подборки</Tab>
                    </TabList>
                    <TabPanel className={cl.TabContent}>
                    <QueryClientProvider client={queryClientGetMusic}>
                        <Music/>
                    </QueryClientProvider>
                    </TabPanel>
                    <TabPanel className={cl.TabContent}>
                        <h3>Популярное</h3>
                    </TabPanel>
                    <TabPanel className={cl.TabContent}>
                        <h3>Подборки</h3>
                    </TabPanel>
                </Tabs>
            </Row>
        </Container>
    </div>
  )
}

export default Lib