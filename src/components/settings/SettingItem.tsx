import { Switch } from "@/components/ui/switch";
import { IonButton } from "@ionic/react";
import { useTranslation } from "react-i18next";

type SettingItemProps = {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onTest?: () => void;
};

export function SettingItem({
  title,
  description,
  checked,
  onCheckedChange,
  onTest,
}: SettingItemProps) {
  const { t } = useTranslation();

  return (
    <div className="border-b border-white/7 py-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-[17px] font-extrabold text-white">{title}</p>
          <p className="mt-1 text-[13px] text-gray-sub">{description}</p>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </div>

      {onTest && (
        <IonButton className="btn-test mt-3" onClick={onTest}>
          {t("settings.test")}
        </IonButton>
      )}
    </div>
  );
}
