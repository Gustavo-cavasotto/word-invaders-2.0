import Game, { exitAR } from "@/components/gameplay/Game";
import { CoinBadge } from "@/components/ui/CoinBadge";
import { ExitConfirmDialog } from "@/components/ui/ExitConfirmDialog";
import { applyMatchResult, COINS_PER_KILL } from "@/game/playerStats";
import { IonButton, IonPage, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import { X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

export function GameplayScreen() {
  const history = useHistory();

  const [exitOpen, setExitOpen] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [kills, setKills] = useState(0);
  const playerHitRef = useRef(false);
  const killsRef = useRef(0);
  const startTimeRef = useRef(0);
  useIonViewWillEnter(() => {
    playerHitRef.current = false;
    killsRef.current = 0;
    startTimeRef.current = Date.now();
    setKills(0);
    setGameActive(true);
  });
  useIonViewWillLeave(() => {
    exitAR();
    setGameActive(false);
  });

  const handleKill = useCallback(() => {
    killsRef.current += 1;
    setKills(killsRef.current);
  }, []);

  const handlePlayerHit = () => {
    if (playerHitRef.current) return;
    playerHitRef.current = true;
    const result = applyMatchResult(killsRef.current, Date.now() - startTimeRef.current);
    history.replace("/game-over", result);
  };

  return (
    <IonPage>
      <div className="relative h-full w-full overflow-hidden bg-space-900">
        <div className="absolute inset-0 z-0">
          {gameActive && (
            <Game autoEnterAR onPlayerHit={handlePlayerHit} onKill={handleKill} />
          )}
        </div>

        <div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-2">
          <IonButton
            className="btn-icon-ghost"
            onClick={() => setExitOpen(true)}
          >
            <X size={18} strokeWidth={2.5} />
          </IonButton>

          <CoinBadge coins={kills * COINS_PER_KILL} />
        </div>

        <ExitConfirmDialog
          open={exitOpen}
          onOpenChange={setExitOpen}
          onConfirm={() => {
            setExitOpen(false);
            history.goBack();
          }}
        />
      </div>
    </IonPage>
  );
}
