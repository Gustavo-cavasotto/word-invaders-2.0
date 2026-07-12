import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { getInvaderObjects } from '../../game/invaderRegistry';
import { setRadarBlips } from '../../game/radar';

const direction = new Vector3();

export function RadarTracker() {
  useFrame(({ camera }) => {
    camera.getWorldDirection(direction);
    const headingAngle = Math.atan2(direction.x, direction.z);

    setRadarBlips(
      getInvaderObjects().map((object, index) => {
        const dx = object.position.x - camera.position.x;
        const dz = object.position.z - camera.position.z;
        return {
          id: index,
          angle: headingAngle - Math.atan2(dx, dz),
          distance: Math.hypot(dx, dz),
        };
      }),
    );
  });

  return null;
}
