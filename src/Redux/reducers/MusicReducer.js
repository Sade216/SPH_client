import { createSlice } from "@reduxjs/toolkit"

const initState = {
    currentTracklist: [],
    currentTrack: null,
}

export const musicSlice = createSlice({
    name: 'music',
    initialState: initState,
    reducers:{
        musicGetTrackData(state){
            return state
        },
        musicGetTrackList(state){
            return state
        },
        musicChangeCurrentTrack(state, action){
            state.currentTrack = action.payload
        },
        musicChangeCurrentTrackList(state, action){
            state.currentTracklist = action.payload
        },
    },
    extraReducers: {
    }
})

export default musicSlice.reducer