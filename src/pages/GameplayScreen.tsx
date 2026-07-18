import Game, { exitAR } from "@/components/gameplay/Game";
import { CoinBadge } from "@/components/ui/CoinBadge";
import { ExitConfirmDialog } from "@/components/ui/ExitConfirmDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  startMatch,
  incrementKills,
  endMatch,
  resetMatch,
  selectCurrentKills,
  COINS_PER_KILL,
} from "@/store/slices/playerStatsSlice";
import { IonButton, IonPage, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import { X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

export function GameplayScreen() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [exitOpen, setExitOpen] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const kills = useAppSelector(selectCurrentKills);
  const playerHitRef = useRef(false);

  useIonViewWillEnter(() => {
    playerHitRef.current = false;
    dispatch(startMatch());
    setGameActive(true);
  });

  useIonViewWillLeave(() => {
    exitAR();
    dispatch(resetMatch());
    setGameActive(false);
  });

  const handleKill = useCallback(() => {
    dispatch(incrementKills());
  }, [dispatch]);

  const handlePlayerHit = useCallback(() => {
    if (playerHitRef.current) return;
    playerHitRef.current = true;
    dispatch(endMatch());
    // Navigate without passing state - GameOverScreen reads from Redux
    history.replace("/game-over");
  }, [dispatch, history]);

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
