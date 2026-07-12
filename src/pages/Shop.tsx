import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Shop: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shop</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <p>Loja de upgrades em breve.</p>
      </IonContent>
    </IonPage>
  );
};

export default Shop;
