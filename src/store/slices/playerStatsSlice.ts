import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

export const COINS_PER_KILL = 5

export interface PlayerStatsState {
  coins: number
  bestKills: number
  currentMatch: {
    kills: number
    isActive: boolean
  }
  isHydrated: boolean
}

const initialState: PlayerStatsState = {
  coins: 0,
  bestKills: 0,
  currentMatch: {
    kills: 0,
    isActive: false,
  },
  isHydrated: false,
}

const playerStatsSlice = createSlice({
  name: 'playerStats',
  initialState,
  reducers: {
    hydrateFromStorage: (
      state,
      action: PayloadAction<{ coins: number; bestKills: number }>
    ) => {
      state.coins = action.payload.coins
      state.bestKills = action.payload.bestKills
      state.isHydrated = true
    },
    startMatch: (state) => {
      state.currentMatch.kills = 0
      state.currentMatch.isActive = true
    },
    incrementKills: (state) => {
      state.currentMatch.kills += 1
    },
    endMatch: (state) => {
      const coinsEarned = state.currentMatch.kills * COINS_PER_KILL

      state.coins += coinsEarned

      if (state.currentMatch.kills > state.bestKills) {
        state.bestKills = state.currentMatch.kills
      }

    },
    resetMatch: (state) => {
      state.currentMatch.kills = 0
      state.currentMatch.isActive = false
    },
  },
})

export const {
  hydrateFromStorage,
  startMatch,
  incrementKills,
  endMatch,
  resetMatch,
} = playerStatsSlice.actions

// Selectors
export const selectCoins = (state: RootState) => state.playerStats.coins
export const selectBestKills = (state: RootState) => state.playerStats.bestKills
export const selectCurrentKills = (state: RootState) =>
  state.playerStats.currentMatch.kills
export const selectIsMatchActive = (state: RootState) =>
  state.playerStats.currentMatch.isActive

// Computed selector for GameOverScreen
export const selectMatchResult = (state: RootState) => {
  const { currentMatch, coins, bestKills } = state.playerStats
  const coinsEarned = currentMatch.kills * COINS_PER_KILL
  // Calculate if it was a new record before endMatch updated bestKills
  // by checking if current kills equals the new best (means it just got updated)
  const isNewRecord = currentMatch.kills === bestKills && currentMatch.kills > 0

  return {
    kills: currentMatch.kills,
    coinsEarned,
    totalCoins: coins,
    bestKills,
    isNewRecord,
  }
}

export default playerStatsSlice.reducer
