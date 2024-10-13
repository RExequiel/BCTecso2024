import { configureStore } from '@reduxjs/toolkit'
import mascoteroReducer from './features/mascoteros/mascoteroSlice'; 

export const store = configureStore({
    reducer: {
        mascoteros: mascoteroReducer,
    },
})