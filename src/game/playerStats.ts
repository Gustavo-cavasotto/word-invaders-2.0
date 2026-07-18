export const COINS_PER_KILL = 5;

const STORAGE_KEY = 'wi2:playerStats';

export interface PlayerStats {
  coins: number;
  bestKills: number;
}

export function loadStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        coins: Number(parsed.coins) || 0,
        bestKills: Number(parsed.bestKills) || 0,
      };
    }
  } catch {
    // storage indisponível ou corrompido: começa zerado
  }
  return { coins: 0, bestKills: 0 };
}
