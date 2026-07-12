export interface RadarBlip {
  id: number;
  angle: number;
  distance: number;
}

let blips: RadarBlip[] = [];

export function setRadarBlips(next: RadarBlip[]): void {
  blips = next;
}

export function getRadarBlips(): RadarBlip[] {
  return blips;
}
