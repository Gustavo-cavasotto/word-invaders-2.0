export function AlienScene() {
  return (
    <div className="relative flex h-[190px] w-[200px] items-center justify-center">
      <ViewfinderCorner position="tl" />
      <ViewfinderCorner position="tr" />
      <ViewfinderCorner position="bl" />
      <ViewfinderCorner position="br" />

      <div
        className="pointer-events-none absolute z-[3] h-[2px] animate-scan"
        style={{
          left: -8,
          right: -8,
          background:
            "linear-gradient(90deg, transparent, rgba(166,232,92,.8), transparent)",
        }}
      />

      <div
        className="absolute left-1/2 top-[56%] z-0 h-16 w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full animate-portal-pulse"
        style={{
          border: "2px solid rgba(166,232,92,.5)",
          boxShadow:
            "0 0 24px rgba(166,232,92,.35), inset 0 0 24px rgba(166,232,92,.18)",
        }}
      >
        <div
          className="absolute rounded-full animate-spin-slow"
          style={{
            inset: 10,
            border: "1px dashed rgba(166,232,92,.35)",
          }}
        />
      </div>

      <div
        className="absolute left-1/2 top-[78%] h-[26px] w-[110px] -translate-x-1/2 animate-shadow-pulse rounded-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,.55), transparent 70%)",
          filter: "blur(3px)",
        }}
      />

      <div
        className="relative z-[2] h-[118px] w-[118px] animate-float3d rounded-[34px]"
        style={{
          background:
            "radial-gradient(circle at 35% 28%, #C7F09A, #8FD95C 65%, #6FB93F)",
          boxShadow:
            "0 0 44px rgba(166,232,92,.55), 0 0 90px rgba(166,232,92,.25), inset -8px -12px 22px rgba(30,70,10,.45), inset 8px 10px 18px rgba(255,255,255,.35)",
        }}
      >
        <span
          className="absolute top-[38px] left-[30px] h-[15px] w-[15px] rounded-full bg-space-900"
          style={{ boxShadow: "inset 0 2px 3px rgba(255,255,255,.15)" }}
        />
        <span
          className="absolute top-[38px] right-[30px] h-[15px] w-[15px] rounded-full bg-space-900"
          style={{ boxShadow: "inset 0 2px 3px rgba(255,255,255,.15)" }}
        />
      </div>

      <span
        className="absolute z-[1] animate-depth-dot rounded-full bg-alien-glow/70"
        style={{
          width: 6,
          height: 6,
          top: "12%",
          left: "-8%",
          animationDelay: ".4s",
        }}
      />
      <span
        className="absolute z-[1] animate-depth-dot rounded-full bg-alien-glow/70"
        style={{
          width: 4,
          height: 4,
          top: "30%",
          right: "-12%",
          animationDelay: "1.2s",
          opacity: 0.5,
        }}
      />
      <span
        className="absolute z-[1] animate-depth-dot rounded-full bg-alien-glow/70"
        style={{
          width: 3,
          height: 3,
          bottom: "18%",
          left: "-16%",
          animationDelay: ".8s",
          opacity: 0.35,
        }}
      />
    </div>
  );
}

type VFPosition = "tl" | "tr" | "bl" | "br";

function ViewfinderCorner({ position }: { position: VFPosition }) {
  const posStyles: Record<VFPosition, React.CSSProperties> = {
    tl: {
      top: -6,
      left: -14,
      borderRight: "none",
      borderBottom: "none",
      borderRadius: "8px 0 0 0",
    },
    tr: {
      top: -6,
      right: -14,
      borderLeft: "none",
      borderBottom: "none",
      borderRadius: "0 8px 0 0",
    },
    bl: {
      bottom: -6,
      left: -14,
      borderRight: "none",
      borderTop: "none",
      borderRadius: "0 0 0 8px",
    },
    br: {
      bottom: -6,
      right: -14,
      borderLeft: "none",
      borderTop: "none",
      borderRadius: "0 0 8px 0",
    },
  };

  return (
    <span
      className="absolute z-[3] h-[26px] w-[26px]"
      style={{
        border: "3px solid rgba(166,232,92,.65)",
        filter: "drop-shadow(0 0 6px rgba(166,232,92,.5))",
        ...posStyles[position],
      }}
    />
  );
}
