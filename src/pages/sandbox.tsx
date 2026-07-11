import { IonButton, IonContent, IonPage } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { CapacitorFlash } from '@capgo/capacitor-flash';

const Sandbox: React.FC = () => {
  const tremerCelular = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };

  const piscarLanterna = async () => {
    if (!Capacitor.isNativePlatform()) return;

    await CapacitorFlash.toggle();
    window.setTimeout(() => {
      CapacitorFlash.toggle();
    }, 150);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            background: '#ffffff',
          }}
        >
          <IonButton onClick={tremerCelular}>Tremer celular</IonButton>
          <IonButton onClick={piscarLanterna}>Piscar lanterna</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Sandbox;