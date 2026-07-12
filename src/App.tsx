import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { ArsenalScreen } from './pages/ArsenalScreen'
import { GameplayScreen } from './pages/GameplayScreen'
import { HomeScreen } from './pages/HomeScreen'
import { SettingsScreen } from './pages/SettingsScreen'

import './theme/variables.css'

setupIonicReact({ mode: 'md', rippleEffect: false })

export default function App() {
  return (
    <IonApp>
      {/* basename pro deploy em subpath (GitHub Pages); '/' no dev */}
      <IonReactRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <IonRouterOutlet>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/settings" component={SettingsScreen} />
          <Route exact path="/arsenal" component={ArsenalScreen} />
          <Route exact path="/gameplay" component={GameplayScreen} />
          <Redirect to="/" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}
