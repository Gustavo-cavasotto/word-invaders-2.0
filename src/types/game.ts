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

export enum InvaderType {
  PERSEGUIDOR = 'perseguidor',
  TANQUE = 'tanque',
  RAPIDO = 'rapido',
}
