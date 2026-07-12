import { AlienScene } from "@/components/home/AlienScene";
import { GridFloor } from "@/components/home/GridFloor";
import { Stars } from "@/components/home/Stars";
import { CoinBadge } from "@/components/ui/CoinBadge";
import { useHistory } from "react-router-dom";

export function HomeScreen() {
  const history = useHistory();

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #161B2A 0%, #0B0D14 60%)",
        perspective: 900,
      }}
    >
      <Stars />
      <GridFloor />

      <div className="absolute right-5 top-5 z-10">
        <CoinBadge coins={0} />
      </div>

      <div className="relative z-2 flex flex-1 flex-col items-center justify-center px-6">
        <AlienScene />

        <h1
          className="mt-7.5 text-center text-[22px] leading-[1.9] text-[#EFFDE0]"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            textShadow:
              "0 0 16px rgba(166,232,92,.55), 2px 2px 0 rgba(47,91,29,.9), 4px 4px 0 rgba(20,40,12,.7), 0 10px 24px rgba(0,0,0,.6)",
            transform: "rotateX(10deg)",
          }}
        >
          WORLD
          <br />
          INVADERS 2.0
        </h1>

        <p className="mt-3 text-[14px] text-gray-sub">
          Realidade aumentada • aponte e atire
        </p>

        <div className="mt-3.5 flex items-center gap-1.5 rounded-full border border-alien-green/45 bg-[rgba(20,32,14,0.5)] px-3.5 py-1.5 text-[11px] font-black tracking-[.14em] text-[#CDEFA8]">
          <span
            className="h-1.5 w-1.5 animate-blink rounded-full bg-alien-glow"
            style={{ boxShadow: "0 0 8px #A6E85C" }}
          />
          AR READY
        </div>
      </div>

      <div className="relative z-2 flex flex-col gap-3.5 px-6 pb-10">
        <button
          onClick={() => history.push("/gameplay")}
          className="flex h-14.5 items-center justify-center gap-2.5 rounded-2xl text-[17px] font-black tracking-[.02em] text-[#10240A] transition-transform active:translate-y-0.5"
          style={{
            background: "linear-gradient(180deg, #B7EC6E, #8FD95C)",
            boxShadow:
              "0 6px 0 #4E8A2B, 0 12px 24px rgba(0,0,0,.45), 0 0 28px rgba(166,232,92,.3)",
            transform: "translateY(-3px)",
          }}
        >
          ▶ JOGAR
        </button>

        <button
          onClick={() => history.push("/arsenal")}
          className="flex h-14.5 items-center justify-center gap-2.5 rounded-2xl border border-white/12 text-[17px] font-bold text-white transition-transform active:translate-y-0.5"
          style={{
            background: "linear-gradient(180deg, #1D2027, #14161B)",
            boxShadow: "0 5px 0 #08090C, 0 10px 20px rgba(0,0,0,.4)",
          }}
        >
          🔫 ARSENAL
        </button>

        <button
          onClick={() => history.push("/settings")}
          className="flex h-14.5 items-center justify-center gap-2.5 rounded-2xl border border-white/12 text-[17px] font-bold text-white transition-transform active:translate-y-0.5"
          style={{
            background: "linear-gradient(180deg, #1D2027, #14161B)",
            boxShadow: "0 5px 0 #08090C, 0 10px 20px rgba(0,0,0,.4)",
          }}
        >
          ⚙️ CONFIGURAÇÕES
        </button>
      </div>
    </div>
  );
}
