import { Line3, Object3D, Vector3 } from 'three';

interface RegisteredInvader {
  object: Object3D;
  hit: () => void;
}

const invaders = new Map<number, RegisteredInvader>();
let nextId = 0;

export function registerInvader(object: Object3D, hit: () => void): number {
  const id = nextId++;
  invaders.set(id, { object, hit });
  return id;
}

export function unregisterInvader(id: number): void {
  invaders.delete(id);
}

export function getInvaderObjects(): Object3D[] {
  return Array.from(invaders.values(), (invader) => invader.object);
}

const segment = new Line3();
const closestPoint = new Vector3();

export function checkProjectileHit(from: Vector3, to: Vector3, radius: number): boolean {
  segment.set(from, to);
  for (const [id, invader] of invaders) {
    segment.closestPointToPoint(invader.object.position, true, closestPoint);
    if (closestPoint.distanceTo(invader.object.position) <= radius) {
      invaders.delete(id);
      invader.hit();
      return true;
    }
  }
  return false;
}
