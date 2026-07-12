import { SettingItem } from "@/components/settings/SettingItem";
import { NavHeader } from "@/components/ui/NavHeader";
import { useState } from "react";

export function SettingsScreen() {
  const [vibrate, setVibrate] = useState(true);
  const [flash, setFlash] = useState(true);
  const [camera, setCamera] = useState(false);

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-space-900">
      <NavHeader title="Configurações" />

      <div className="px-5 z-[2]">
        <SettingItem
          title="Vibrar ao atirar"
          description="Feedback tátil a cada disparo"
          checked={vibrate}
          onCheckedChange={setVibrate}
        />
        <SettingItem
          title="Acender flash"
          description="Pisca a tela ao disparar"
          checked={flash}
          onCheckedChange={setFlash}
        />
        <SettingItem
          title="Liberar câmera"
          description="Usa a câmera real para o fundo AR"
          checked={camera}
          onCheckedChange={setCamera}
        />
      </div>
    </div>
  );
}
