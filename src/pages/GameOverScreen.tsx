import { CoinBadge } from "@/components/ui/CoinBadge";
import { useAppSelector } from "@/store/hooks";
import { selectMatchResult } from "@/store/slices/playerStatsSlice";
import { IonButton, IonPage } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { Redirect, useHistory } from "react-router-dom";

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function GameOverScreen() {
  const history = useHistory();
  const { t } = useTranslation();
  const result = useAppSelector(selectMatchResult);

  // No match data means user accessed this screen directly
  if (!result || result.kills === 0) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      <div
        className="relative flex h-full w-full flex-col overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #2A1616 0%, #0B0D14 60%)",
        }}
      >
        <div className="absolute right-5 top-5 z-10">
          <CoinBadge coins={result.totalCoins} />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <h1
            className="text-center text-[26px] leading-[1.6] text-[#FFD9D9]"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow:
                "0 0 16px rgba(255,92,92,.55), 2px 2px 0 rgba(91,29,29,.9), 4px 4px 0 rgba(40,12,12,.7), 0 10px 24px rgba(0,0,0,.6)",
            }}
          >
            GAME
            <br />
            OVER
          </h1>

          {result.isNewRecord && (
            <div className="mt-6 flex items-center gap-1.5 rounded-full border border-alien-green/45 bg-[rgba(20,32,14,0.5)] px-3.5 py-1.5 text-[11px] font-black tracking-[.14em] text-[#CDEFA8]">
              <span
                className="h-1.5 w-1.5 animate-blink rounded-full bg-alien-glow"
                style={{ boxShadow: "0 0 8px #A6E85C" }}
              />
              {t("gameOver.newRecord")}
            </div>
          )}

          <div className="mt-8 w-full max-w-[340px] rounded-[18px] border border-card-border bg-card-dark p-5">
            <div className="flex items-center justify-between border-b border-white/7 pb-3">
              <span className="text-[14px] text-gray-sub">
                {t("gameOver.kills")}
              </span>
              <span className="text-[17px] font-extrabold text-white">
                {result.kills}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/7 py-3">
              <span className="text-[14px] text-gray-sub">
                {t("gameOver.time")}
              </span>
              <span className="text-[17px] font-extrabold text-white">
                {formatDuration(result.durationMs)}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/7 py-3">
              <span className="text-[14px] text-gray-sub">
                {t("gameOver.coinsEarned")}
              </span>
              <span className="text-[17px] font-extrabold text-[#F2C94C]">
                +{result.coinsEarned}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-[14px] text-gray-sub">
                {t("gameOver.best")}
              </span>
              <span
                className={
                  result.isNewRecord
                    ? "text-[17px] font-extrabold text-alien-glow"
                    : "text-[17px] font-extrabold text-white"
                }
              >
                {result.bestKills}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 px-6 pb-10 pt-6">
          <IonButton
            className="btn-pixel btn-pixel-primary"
            onClick={() => history.replace("/gameplay")}
          >
            {t("gameOver.playAgain")}
          </IonButton>

          <IonButton
            className="btn-pixel btn-pixel-dark"
            onClick={() => history.push("/arsenal")}
          >
            {t("gameOver.arsenal")}
          </IonButton>

          <IonButton
            className="btn-pixel btn-pixel-dark"
            onClick={() => history.goBack()}
          >
            {t("gameOver.menu")}
          </IonButton>
        </div>
      </div>
    </IonPage>
  );
}
