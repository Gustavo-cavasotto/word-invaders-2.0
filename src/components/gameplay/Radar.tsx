import { useEffect, useState } from 'react';
import { getRadarBlips, type RadarBlip } from '../../game/radar';

const RADAR_SIZE = 112;
const RADAR_RANGE = 5; // metros até a borda (spawn é a 4m)
const BLIP_RADIUS_MAX = RADAR_SIZE / 2 - 10;
const CLOSE_DISTANCE = 2.5;
const VERY_CLOSE_DISTANCE = 1.2;

function blipStyle(blip: RadarBlip): React.CSSProperties {
  const radius = Math.min(blip.distance / RADAR_RANGE, 1) * BLIP_RADIUS_MAX;
  const x = Math.sin(blip.angle) * radius;
  const y = -Math.cos(blip.angle) * radius;

  const veryClose = blip.distance < VERY_CLOSE_DISTANCE;
  const close = blip.distance <= CLOSE_DISTANCE;
  const color = close ? '#FF4B4B' : '#F2C94C';

  return {
    transform: `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px))`,
    background: color,
    boxShadow: `0 0 ${veryClose ? 10 : 6}px ${color}`,
    animation: veryClose ? 'blink 0.4s steps(1) infinite' : undefined,
  };
}

export function Radar() {
  const [blips, setBlips] = useState<RadarBlip[]>([]);

  useEffect(() => {
    let frame = requestAnimationFrame(function update() {
      setBlips(getRadarBlips());
      frame = requestAnimationFrame(update);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="absolute left-1/2 top-5 z-[3] -translate-x-1/2 rounded-full border border-alien-green/60 bg-[rgba(11,13,20,0.55)]"
      style={{
        width: RADAR_SIZE,
        height: RADAR_SIZE,
        boxShadow: '0 0 12px rgba(166,232,92,.25)',
      }}
    >
      {/* linhas de referência + jogador no centro */}
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-alien-green/15" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-alien-green/15" />
      <span className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-alien-glow shadow-[0_0_6px_#A6E85C]" />

      {blips.map((blip) => (
        <span
          key={blip.id}
          className="absolute left-1/2 top-1/2 h-[9px] w-[9px] rounded-full"
          style={blipStyle(blip)}
        />
      ))}
    </div>
  );
}
