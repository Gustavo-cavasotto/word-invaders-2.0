import { SettingItem } from "@/components/settings/SettingItem";
import { NavHeader } from "@/components/ui/NavHeader";
import { vibrate } from "@/lib/haptics";
import { flashTorch } from "@/lib/torch";
import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";

export function SettingsScreen() {
  const [vibrateEnabled, setVibrateEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  return (
    <IonPage>
      <NavHeader title="Configurações" />

      <IonContent scrollY={false}>
        <div className="px-5">
          <SettingItem
            title="Vibrar ao atirar"
            description="Feedback tátil a cada disparo"
            checked={vibrateEnabled}
            onCheckedChange={setVibrateEnabled}
            onTest={vibrate}
          />
          <SettingItem
            title="Acender flash"
            description="Liga o flash da câmera ao disparar"
            checked={flashEnabled}
            onCheckedChange={setFlashEnabled}
            onTest={() => flashTorch(800)}
          />
          <SettingItem
            title="Liberar câmera"
            description="Usa a câmera real para o fundo AR"
            checked={cameraEnabled}
            onCheckedChange={setCameraEnabled}
          />
        </div>
      </IonContent>
    </IonPage>
  );
}
