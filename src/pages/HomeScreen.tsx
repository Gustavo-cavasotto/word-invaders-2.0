import { HomeScene } from "@/components/home/HomeScene";
import { CoinBadge } from "@/components/ui/CoinBadge";
import { useAppSelector } from "@/store/hooks";
import { selectCoins } from "@/store/slices/playerStatsSlice";
import {
  IonButton,
  IonPage,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export function HomeScreen() {
  const history = useHistory();
  const { t } = useTranslation();

  const [sceneActive, setSceneActive] = useState(true);
  const coins = useAppSelector(selectCoins);

  useIonViewWillEnter(() => {
    setSceneActive(true);
  });
  useIonViewDidLeave(() => setSceneActive(false));

  return (
    <IonPage>
      <div
        className="relative flex h-full w-full flex-col overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #161B2A 0%, #0B0D14 60%)",
        }}
      >
        <div className="absolute inset-0 z-0">
          {sceneActive && <HomeScene />}
        </div>

        <div className="absolute right-5 top-5 z-10">
          <CoinBadge coins={coins} />
        </div>

        <div className="pointer-events-none relative z-2 flex flex-1 flex-col items-center justify-end px-6">
          <h1
            className="mt-7.5 text-center text-[22px] leading-[1.9] text-[#EFFDE0]"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow:
                "0 0 16px rgba(166,232,92,.55), 2px 2px 0 rgba(47,91,29,.9), 4px 4px 0 rgba(20,40,12,.7), 0 10px 24px rgba(0,0,0,.6)",
            }}
          >
            WORLD
            <br />
            INVADERS 2.0
          </h1>

          <p className="mt-3 text-[14px] text-gray-sub">
            {t("home.tagline")}
          </p>

          <div className="mt-3.5 flex items-center gap-1.5 rounded-full border border-alien-green/45 bg-[rgba(20,32,14,0.5)] px-3.5 py-1.5 text-[11px] font-black tracking-[.14em] text-[#CDEFA8]">
            <span
              className="h-1.5 w-1.5 animate-blink rounded-full bg-alien-glow"
              style={{ boxShadow: "0 0 8px #A6E85C" }}
            />
            {t("home.arReady")}
          </div>
        </div>

        <div className="relative z-2 flex flex-col gap-3.5 px-6 pb-10 pt-6">
          <IonButton
            className="btn-pixel btn-pixel-primary"
            onClick={() => history.push("/gameplay")}
          >
            {t("home.play")}
          </IonButton>

          <IonButton
            className="btn-pixel btn-pixel-dark"
            onClick={() => history.push("/arsenal")}
          >
            {t("home.arsenal")}
          </IonButton>

          <IonButton
            className="btn-pixel btn-pixel-dark"
            onClick={() => history.push("/settings")}
          >
            {t("home.settings")}
          </IonButton>
        </div>
      </div>
    </IonPage>
  );
}
