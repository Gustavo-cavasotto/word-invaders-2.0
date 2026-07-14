import { beforeEach, describe, expect, it } from 'vitest';
import { applyMatchResult, COINS_PER_KILL, loadStats } from './playerStats';

describe('playerStats', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('começa zerado sem dados salvos', () => {
    expect(loadStats()).toEqual({ coins: 0, bestKills: 0 });
  });

  it('credita moedas proporcionais às kills e marca novo recorde', () => {
    const result = applyMatchResult(7);

    expect(result).toEqual({
      kills: 7,
      coinsEarned: 7 * COINS_PER_KILL,
      totalCoins: 7 * COINS_PER_KILL,
      bestKills: 7,
      isNewRecord: true,
    });
    expect(loadStats()).toEqual({ coins: 35, bestKills: 7 });
  });

  it('acumula moedas entre partidas e mantém o recorde maior', () => {
    applyMatchResult(7);
    const result = applyMatchResult(3);

    expect(result.coinsEarned).toBe(15);
    expect(result.totalCoins).toBe(50);
    expect(result.bestKills).toBe(7);
    expect(result.isNewRecord).toBe(false);
  });

  it('partida com 0 kills não é novo recorde', () => {
    const result = applyMatchResult(0);

    expect(result.coinsEarned).toBe(0);
    expect(result.isNewRecord).toBe(false);
  });

  it('ignora dados corrompidos no storage', () => {
    localStorage.setItem('wi2:playerStats', 'not json');
    expect(loadStats()).toEqual({ coins: 0, bestKills: 0 });
  });
});
