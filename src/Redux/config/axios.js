import axios from 'axios'

// export const serverURL = 'http://localhost:5000/api';
// export const serverURLWS = 'http://localhost:5000';
export const serverURL = 'https://samplepackshouse-server.herokuapp.com/api';
export const serverURLWS = 'https://samplepackshouse-server.herokuapp.com/';

export const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['Authorization'] = token;
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
}