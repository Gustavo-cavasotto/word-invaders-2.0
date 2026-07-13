import { SettingItem } from "@/components/settings/SettingItem";
import { NavHeader } from "@/components/ui/NavHeader";
import { LANGUAGES } from "@/i18n";
import { vibrate } from "@/lib/haptics";
import { cn } from "@/lib/utils";
import { flashTorch } from "@/lib/torch";
import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SettingsScreen() {
  const { t, i18n } = useTranslation();

  const [vibrateEnabled, setVibrateEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  return (
    <IonPage>
      <NavHeader title={t("settings.title")} />

      <IonContent scrollY={false}>
        <div className="px-5">
          <SettingItem
            title={t("settings.vibrate.title")}
            description={t("settings.vibrate.description")}
            checked={vibrateEnabled}
            onCheckedChange={setVibrateEnabled}
            onTest={vibrate}
          />
          <SettingItem
            title={t("settings.flash.title")}
            description={t("settings.flash.description")}
            checked={flashEnabled}
            onCheckedChange={setFlashEnabled}
            onTest={() => flashTorch(800)}
          />
          <SettingItem
            title={t("settings.camera.title")}
            description={t("settings.camera.description")}
            checked={cameraEnabled}
            onCheckedChange={setCameraEnabled}
          />

          <div className="border-b border-white/7 py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[17px] font-extrabold text-white">
                  {t("settings.language.title")}
                </p>
                <p className="mt-1 text-[13px] text-gray-sub">
                  {t("settings.language.description")}
                </p>
              </div>

              <div className="flex gap-1.5">
                {LANGUAGES.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => i18n.changeLanguage(code)}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-[12px] font-black tracking-wider transition-colors",
                      i18n.resolvedLanguage === code
                        ? "bg-alien-green/25 text-[#CDEFA8] shadow-[0_0_0_1px_rgba(166,232,92,.45)]"
                        : "bg-white/7 text-gray-sub",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
