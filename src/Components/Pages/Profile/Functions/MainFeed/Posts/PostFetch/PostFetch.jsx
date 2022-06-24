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

const Posts = ({user = null}) => {
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    async function getPosts(page = 1, limit = 10){
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: serverURL + `/user/getPosts/${user && user.nickname}?page=${page}`
        })
        setPageCount(data?.pages)
        return data.data
    }
    const {isLoading, isError, error, data} = 
    useQuery([`posts_${user.nickname}`, page], () => getPosts(page), { keepPreviousData: true, staleTime: 30000 })
    
    useEffect(() => {
        if(pageCount > page){
            QueryClientGetPosts.prefetchQuery([`posts_${user.nickname}`, page + 1], () =>
            getPosts(page + 1)
            )
        }
    }, [data, page])

    return(
        <>
            {isLoading ? (<div className={cl.Spinner}> <Spinner animation="border" role="status"/></div>) 
            : isError ? (<div>Error: {error.message}</div>) : (
                <>
                {data ?
                    data.map((post, index)=>(
                        <PostCard post={post} user={user} key={index}/>
                    ))
                    :
                    <div>Постов нет(</div>
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
                        disabled={page === pageCount | pageCount === 0}
                    >
                        <IoIosArrowForward/>
                    </button>
                </div>
                </>
            )}
        </>
    )
}

const PostFetch = ({user}) => {
    return (
        <QueryClientProvider client={QueryClientGetPosts}>
            <Posts user={user}/>
        </QueryClientProvider>
    )
}
export default PostFetch