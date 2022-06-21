import React, {useEffect, useState} from 'react'

import {Spinner} from 'react-bootstrap'
import cl from './NewsFetch.module.css'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import NewsCard from '../NewsCard/NewsCard'

import { fetchNews } from '../../../../../Redux/reducers/asyncActions/fetchNews'

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
//   ReactQueryDevtools,
} from 'react-query'

import { useDispatch } from 'react-redux'

const QueryClientGetNews = new QueryClient();

const NewsFetchQuery = () => {
    const dispatch = useDispatch()
    //--------------------НОВОСТИ--------------------
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    async function getNews(page = 1){
        const data = await dispatch(fetchNews(page))
        setPageCount(data?.pages)
        return data.data
    }
    const {isLoading, isError, error, data} = 
    useQuery(['news', page], () => getNews(page), { keepPreviousData : true, staleTime: 1000 })
    
    useEffect(() => {
        if(pageCount > page){
            QueryClientGetNews.prefetchQuery(['news', page + 1], () =>
            getNews(page + 1)
            )
        }
    }, [data, page])

    return (
        <>
            {isLoading ? (
                <div className={cl.Spinner}> <Spinner animation="border" role="status"/></div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <>
                    {
                    data.map((news, index)=>(
                        <NewsCard news={news} key={index}/>
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
        </>
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