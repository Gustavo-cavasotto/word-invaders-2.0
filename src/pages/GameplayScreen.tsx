import Game, { exitAR } from "@/components/gameplay/Game";
import { CoinBadge } from "@/components/ui/CoinBadge";
import { ExitConfirmDialog } from "@/components/ui/ExitConfirmDialog";
import { IonButton, IonPage, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import { X } from "lucide-react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export function GameplayScreen() {
  const history = useHistory();

  const [exitOpen, setExitOpen] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  useIonViewWillEnter(() => setGameActive(true));
  useIonViewWillLeave(() => {
    exitAR();
    setGameActive(false);
  });

  return (
    <IonPage>
      <div className="relative h-full w-full overflow-hidden bg-space-900">
        <div className="absolute inset-0 z-0">
          {gameActive && <Game autoEnterAR />}
        </div>

        <div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-2">
          <IonButton
            className="btn-icon-ghost"
            onClick={() => setExitOpen(true)}
          >
            <X size={18} strokeWidth={2.5} />
          </IonButton>

          <CoinBadge coins={5} />
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
