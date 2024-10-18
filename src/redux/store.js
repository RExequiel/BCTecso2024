import { configureStore } from '@reduxjs/toolkit'
import mascoteroReducer from './features/mascoteros/mascoteroSlice'; 
import mascotasReducer from './features/mascoteros/mascotaSlice'; 

export const store = configureStore({
    reducer: {
        mascotas: mascotasReducer,
        mascoteros: mascoteroReducer,
    },
})