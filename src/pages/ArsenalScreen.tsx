import { WeaponCard, WeaponCardProps } from "@/components/arsenal/WeaponCard";
import { NavHeader } from "@/components/ui/NavHeader";
import { IonContent, IonPage } from "@ionic/react";
import { useTranslation } from "react-i18next";

type WeaponDef = Omit<WeaponCardProps, "name" | "description"> & {
  key: string;
};

const WEAPONS: WeaponDef[] = [
  { key: "classic", color: "green", equipped: true },
  { key: "machineGun", color: "blue", price: 10 },
  { key: "shotgun", color: "orange", price: 20 },
  { key: "turret", color: "pink", price: 30 },
];

export function ArsenalScreen() {
  const { t } = useTranslation();

  return (
    <IonPage>
      <NavHeader title={t("arsenal.title")} coins={0} />

      <IonContent scrollY={false}>
        <div className="flex flex-col gap-3 px-4">
          {WEAPONS.map(({ key, ...weapon }) => (
            <WeaponCard
              key={key}
              name={t(`arsenal.weapons.${key}.name`)}
              description={t(`arsenal.weapons.${key}.description`)}
              {...weapon}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
}
