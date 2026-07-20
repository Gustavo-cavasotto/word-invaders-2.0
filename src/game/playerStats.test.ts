import { beforeEach, describe, expect, it } from 'vitest';
import { COINS_PER_KILL, loadStats } from './playerStats';

describe('playerStats', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('começa zerado sem dados salvos', () => {
    expect(loadStats()).toEqual({ coins: 0, bestKills: 0 });
  });

  it('carrega dados salvos do localStorage', () => {
    localStorage.setItem('wi2:playerStats', JSON.stringify({ coins: 100, bestKills: 15 }));
    expect(loadStats()).toEqual({ coins: 100, bestKills: 15 });
  });

  it('ignora dados corrompidos no storage', () => {
    localStorage.setItem('wi2:playerStats', 'not json');
    expect(loadStats()).toEqual({ coins: 0, bestKills: 0 });
  });

  it('converte valores para números', () => {
    localStorage.setItem('wi2:playerStats', JSON.stringify({ coins: '50', bestKills: '10' }));
    expect(loadStats()).toEqual({ coins: 50, bestKills: 10 });
  });

  it('COINS_PER_KILL mantém o valor correto', () => {
    expect(COINS_PER_KILL).toBe(5);
  });
});
