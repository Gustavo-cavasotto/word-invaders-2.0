import { describe, it, expect } from 'vitest'
import playerStatsReducer, {
  hydrateFromStorage,
  startMatch,
  incrementKills,
  endMatch,
  resetMatch,
  selectCoins,
  selectBestKills,
  selectCurrentKills,
  selectIsMatchActive,
  selectMatchResult,
  COINS_PER_KILL,
  type PlayerStatsState,
} from './playerStatsSlice'

describe('playerStatsSlice', () => {
  const initialState: PlayerStatsState = {
    coins: 0,
    bestKills: 0,
    currentMatch: {
      kills: 0,
      isActive: false,
    },
    isHydrated: false,
  }

  describe('reducers', () => {
    it('hydrateFromStorage deve carregar dados do localStorage', () => {
      const state = playerStatsReducer(
        initialState,
        hydrateFromStorage({ coins: 100, bestKills: 10 })
      )

      expect(state.coins).toBe(100)
      expect(state.bestKills).toBe(10)
      expect(state.isHydrated).toBe(true)
    })

    it('startMatch deve iniciar uma nova partida', () => {
      const state = playerStatsReducer(initialState, startMatch())

      expect(state.currentMatch.kills).toBe(0)
      expect(state.currentMatch.isActive).toBe(true)
    })

    it('incrementKills deve incrementar contador de kills', () => {
      const stateWithMatch = playerStatsReducer(initialState, startMatch())
      const state1 = playerStatsReducer(stateWithMatch, incrementKills())
      const state2 = playerStatsReducer(state1, incrementKills())

      expect(state2.currentMatch.kills).toBe(2)
    })

    it('endMatch deve creditar moedas e atualizar recorde', () => {
      const stateWithMatch = playerStatsReducer(initialState, startMatch())
      const stateWith5Kills = {
        ...stateWithMatch,
        currentMatch: { ...stateWithMatch.currentMatch, kills: 5 },
      }

      const state = playerStatsReducer(stateWith5Kills, endMatch())

      expect(state.coins).toBe(5 * COINS_PER_KILL) // 25 moedas
      expect(state.bestKills).toBe(5)
      expect(state.currentMatch.kills).toBe(5) // Mantém kills para GameOverScreen
    })

    it('endMatch deve atualizar bestKills apenas se for novo recorde', () => {
      const stateWithRecord = {
        ...initialState,
        bestKills: 10,
        currentMatch: { kills: 5, isActive: true },
      }

      const state = playerStatsReducer(stateWithRecord, endMatch())

      expect(state.bestKills).toBe(10) // Não atualiza porque 5 < 10
      expect(state.coins).toBe(5 * COINS_PER_KILL)
    })

    it('endMatch deve acumular moedas em partidas consecutivas', () => {
      let state = playerStatsReducer(initialState, hydrateFromStorage({ coins: 50, bestKills: 0 }))
      state = playerStatsReducer(state, startMatch())
      state = { ...state, currentMatch: { ...state.currentMatch, kills: 10 } }
      state = playerStatsReducer(state, endMatch())

      expect(state.coins).toBe(50 + 10 * COINS_PER_KILL) // 50 + 50 = 100
    })

    it('resetMatch deve limpar estado da partida', () => {
      const stateWithMatch = {
        ...initialState,
        currentMatch: { kills: 10, isActive: true },
      }

      const state = playerStatsReducer(stateWithMatch, resetMatch())

      expect(state.currentMatch.kills).toBe(0)
      expect(state.currentMatch.isActive).toBe(false)
    })
  })

  describe('selectors', () => {
    const mockState: { playerStats: PlayerStatsState } = {
      playerStats: {
        coins: 100,
        bestKills: 15,
        currentMatch: {
          kills: 8,
          isActive: true,
        },
        isHydrated: true,
      },
    }

    it('selectCoins deve retornar total de moedas', () => {
      expect(selectCoins(mockState)).toBe(100)
    })

    it('selectBestKills deve retornar recorde', () => {
      expect(selectBestKills(mockState)).toBe(15)
    })

    it('selectCurrentKills deve retornar kills da partida atual', () => {
      expect(selectCurrentKills(mockState)).toBe(8)
    })

    it('selectIsMatchActive deve retornar status da partida', () => {
      expect(selectIsMatchActive(mockState)).toBe(true)
    })

    it('selectMatchResult deve calcular resultado da partida', () => {
      const result = selectMatchResult(mockState)

      expect(result.kills).toBe(8)
      expect(result.coinsEarned).toBe(8 * COINS_PER_KILL)
      expect(result.totalCoins).toBe(100)
      expect(result.bestKills).toBe(15)
      expect(result.isNewRecord).toBe(false)
    })

    it('selectMatchResult deve detectar novo recorde', () => {
      const stateWithNewRecord: { playerStats: PlayerStatsState } = {
        playerStats: {
          ...mockState.playerStats,
          currentMatch: { kills: 15, isActive: true },
          bestKills: 15, // Igual ao kills atual = novo recorde
        },
      }

      const result = selectMatchResult(stateWithNewRecord)

      expect(result.isNewRecord).toBe(true)
    })

    it('selectMatchResult deve retornar isNewRecord false quando kills é 0', () => {
      const stateWithZeroKills: { playerStats: PlayerStatsState } = {
        playerStats: {
          ...mockState.playerStats,
          currentMatch: { kills: 0, isActive: false },
          bestKills: 0,
        },
      }

      const result = selectMatchResult(stateWithZeroKills)

      expect(result.isNewRecord).toBe(false)
    })
  })
})
