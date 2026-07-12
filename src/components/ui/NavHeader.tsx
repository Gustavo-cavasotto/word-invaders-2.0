import { CoinBadge } from "@/components/ui/CoinBadge";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

type NavHeaderProps = {
  title: string;
  coins?: number;
};

export function NavHeader({ title, coins }: NavHeaderProps) {
  return (
    <IonHeader className="ion-no-border z-10">
      <IonToolbar className="nav-toolbar">
        <IonButtons slot="start">
          <IonBackButton
            defaultHref="/"
            text=""
            icon={chevronBackOutline}
            className="nav-back"
          />
        </IonButtons>

        <IonTitle className="nav-title">{title}</IonTitle>

        {coins !== undefined && (
          <IonButtons slot="end">
            <CoinBadge coins={coins} />
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
}
