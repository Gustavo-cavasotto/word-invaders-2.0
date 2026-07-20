import { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { ArsenalScreen } from './pages/ArsenalScreen'
import { GameOverScreen } from './pages/GameOverScreen'
import { GameplayScreen } from './pages/GameplayScreen'
import { HomeScreen } from './pages/HomeScreen'
import { SettingsScreen } from './pages/SettingsScreen'
import { loadStats } from './game/playerStats'
import { useAppDispatch } from './store/hooks'
import { hydrateFromStorage } from './store/slices/playerStatsSlice'

import './theme/variables.css'

setupIonicReact({ mode: 'md', rippleEffect: false })

export default function App() {
  const dispatch = useAppDispatch()

  // Hydrate Redux state from localStorage on app startup
  useEffect(() => {
    const stats = loadStats()
    dispatch(hydrateFromStorage(stats))
  }, [dispatch])

  return (
    <IonApp>
      {/* basename pro deploy em subpath (GitHub Pages); '/' no dev */}
      <IonReactRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <IonRouterOutlet>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/settings" component={SettingsScreen} />
          <Route exact path="/arsenal" component={ArsenalScreen} />
          <Route exact path="/gameplay" component={GameplayScreen} />
          <Route exact path="/game-over" component={GameOverScreen} />
          <Redirect to="/" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}
