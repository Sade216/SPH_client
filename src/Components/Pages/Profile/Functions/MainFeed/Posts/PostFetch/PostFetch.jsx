import React, {useState, useEffect} from 'react'

import axios from 'axios';
import { serverURL } from '../../../../../../../Redux/config/axios';

import cl from './PostFetch.module.css'
import { Spinner } from 'react-bootstrap';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import {
    useQuery,
    QueryClient,
    QueryClientProvider,
  //   ReactQueryDevtools,
} from 'react-query'
import PostCard from '../PostCard/PostCard';
  
const QueryClientGetPosts = new QueryClient();

const Posts = () => {
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    async function getPosts(page = 1, limit = 10){
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/user/getPosts?page=${page}`
        })
        setPageCount(data?.pages)
        return data.data
    }
    const {isLoading, isError, error, data} = 
    useQuery(['posts', page], () => getPosts(page), { keepPreviousData : true, staleTime: 300000 })
    
    useEffect(() => {
        if(pageCount > page){
            QueryClientGetPosts.prefetchQuery(['news', page + 1], () =>
            getPosts(page + 1)
            )
        }
    }, [data, page])

    return(
        <>
            {isLoading ? (<div className={cl.Spinner}> <Spinner animation="border" role="status"/></div>) 
            : isError ? (<div>Error: {error.message}</div>) : (
                <>
                {
                    data.map((post, index)=>(
                        <PostCard post={post} key={index}/>
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
                        onClick={() => {setPage(old => old + 1)}}
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

const PostFetch = () => {
    return (
        <QueryClientProvider client={QueryClientGetPosts}>
            <Posts/>
        </QueryClientProvider>
    )
}
export default PostFetch