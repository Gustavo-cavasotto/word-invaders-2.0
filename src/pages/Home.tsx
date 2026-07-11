import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Game from '../components/Game';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Word Invaders AR</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Game />
      </IonContent>
    </IonPage>
  );
};

export default Home;
