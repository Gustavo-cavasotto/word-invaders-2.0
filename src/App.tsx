import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { ArsenalScreen } from './pages/ArsenalScreen'
import { GameplayScreen } from './pages/GameplayScreen'
import { HomeScreen } from './pages/HomeScreen'
import { SettingsScreen } from './pages/SettingsScreen'

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-full w-full bg-space-900">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/settings" component={SettingsScreen} />
          <Route path="/arsenal" component={ArsenalScreen} />
          <Route path="/gameplay" component={GameplayScreen} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
