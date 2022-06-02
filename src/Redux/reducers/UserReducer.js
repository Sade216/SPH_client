import { createSlice } from "@reduxjs/toolkit"
import { fetchUserData } from "../reducers/asyncActions/fetchUser"

const initState = {
    user:{
        isAuthenticated: false,
        nickname: null,
        email: null,
        avatarURL: null,
        backgroundURL: null,
        about: null,
        createdAt: null,
        lastLogin: null,
        pref_genres: [],
        role: null,
        visitors: [],
        followers: [],
        youFollow: [],

        posts: [],

        trackList: [],
    },
    isLoading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers:{
        userGetData(state, action){
            state.user.isAuthenticated = true
            state.user.nickname = action.payload.nickname
            state.user.email = action.payload.email
            state.user.avatarURL = action.payload.avatarURL
            state.user.backgroundURL = action.payload.backgroundURL
            state.user.about = action.payload.about
            state.user.createdAt = action.payload.createdAt
            state.user.lastLogin = action.payload.lastLogin
            state.user.pref_genres = action.payload.pref_genres
            state.user.role = action.payload.role
            state.user.visitors = action.payload.visitors
            state.user.followers = action.payload.followers
            state.user.youFollow = action.payload.youFollow
            state.user.posts = action.payload.posts
            state.user.trackList = action.payload.trackList
        },
        userLogin(state){
            return state
        },
        userRegistration(state){
            return state
        },
        userLogout(state){
            return state = initState
        },
        getUserTrackList(state, action){
            state.user.trackList = action.payload
        }
    },
    extraReducers: {
    }
})

export default userSlice.reducer