import React, {useEffect, useState} from 'react'

import {Spinner} from 'react-bootstrap'
import cl from './NewsFetch.module.css'

import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import NewsCard from '../NewsCard/NewsCard'

import { useAuth } from '../../../../../Contexts/UserContext'

import axios from 'axios'

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from 'react-query'

const QueryClientGetNews = new QueryClient();

const NewsFetchQuery = () => {

    const {serverURL} = useAuth();
    
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
        QueryClientGetNews.prefetchQuery(['news', page + 1], () =>
        getNews(page + 1)
        )
    }, [data, page])

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
                        <NewsCard news={news} index={index}/>
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

const NewsFetch = () =>{
    return (
        <QueryClientProvider client={QueryClientGetNews}>
            <NewsFetchQuery/>
        </QueryClientProvider>
    )
}
export default NewsFetch