import axios from 'axios'

export const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['Authorization'] = token;
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
}