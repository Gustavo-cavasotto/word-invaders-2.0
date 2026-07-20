import { configureStore } from '@reduxjs/toolkit'
import playerStatsReducer from './slices/playerStatsSlice'
import { localStorageMiddleware } from './middleware/localStorageMiddleware'

export const store = configureStore({
  reducer: {
    playerStats: playerStatsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
