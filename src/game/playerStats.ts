// Valores de economia do GDD (seção 6)
// TODO - ALTERAR PARA O REDUX OU OUTRO CONTROLE DE STATE
export const COINS_PER_KILL = 5;

const STORAGE_KEY = 'wi2:playerStats';

export interface PlayerStats {
  coins: number;
  bestKills: number;
}

export interface MatchResult {
  kills: number;
  coinsEarned: number;
  totalCoins: number;
  bestKills: number;
  isNewRecord: boolean;
  durationMs: number;
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

function saveStats(stats: PlayerStats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // storage indisponível: partida segue sem persistir
  }
}

/** Credita as moedas da partida e atualiza o recorde, retornando o resumo. */
export function applyMatchResult(kills: number, durationMs: number): MatchResult {
  const stats = loadStats();
  const coinsEarned = kills * COINS_PER_KILL;
  const isNewRecord = kills > stats.bestKills;

  const updated: PlayerStats = {
    coins: stats.coins + coinsEarned,
    bestKills: isNewRecord ? kills : stats.bestKills,
  };
  saveStats(updated);

  return {
    kills,
    coinsEarned,
    totalCoins: updated.coins,
    bestKills: updated.bestKills,
    isNewRecord,
    durationMs,
  };
}
