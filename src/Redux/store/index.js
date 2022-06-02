import {combineReducers, configureStore} from '@reduxjs/toolkit'

import ChatReducer from '../reducers/ChatReducer'
import MusicReducer from '../reducers/MusicReducer'
import UserReducer from '../reducers/UserReducer'

const rootReducer = combineReducers({
    user: UserReducer,
    music: MusicReducer,
    chat: ChatReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        
    })
}