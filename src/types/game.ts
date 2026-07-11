export interface InvaderProps {
  initialPosition: [number, number, number];
  speed?: number;
  onReachPlayer?: () => void;
  onDestroy?: () => void;
}

export interface InvaderState {
  isAlive: boolean;
  health: number;
}

export interface ProjectileData {
  id: number;
  origin: [number, number, number];
  direction: [number, number, number];
}

export interface ProjectileProps {
  origin: [number, number, number];
  direction: [number, number, number];
  speed?: number;
  maxDistance?: number;
  onExpire: () => void;
}

export interface CrosshairProps {
  distance?: number;
}

export enum InvaderType {
  PERSEGUIDOR = 'perseguidor',
  TANQUE = 'tanque',
  RAPIDO = 'rapido',
}
