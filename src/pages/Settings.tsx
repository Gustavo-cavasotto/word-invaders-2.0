import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <p>Configurações em breve.</p>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
