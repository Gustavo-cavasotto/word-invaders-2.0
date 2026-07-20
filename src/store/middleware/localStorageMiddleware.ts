import type { Middleware } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { endMatch } from '../slices/playerStatsSlice'

const STORAGE_KEY = 'wi2:playerStats'
const DEBOUNCE_MS = 300

let saveTimeout: ReturnType<typeof setTimeout> | null = null

export const localStorageMiddleware = ((store) => (next) => (action) => {
  const result = next(action)

  // Save to localStorage after endMatch action
  if (endMatch.match(action)) {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    saveTimeout = setTimeout(() => {
      const state = store.getState() as RootState
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            coins: state.playerStats.coins,
            bestKills: state.playerStats.bestKills,
          })
        )
      } catch (error) {
        // localStorage unavailable or quota exceeded
        console.warn('Failed to save player stats to localStorage:', error)
      }
    }, DEBOUNCE_MS)
  }

  return result
}) satisfies Middleware

