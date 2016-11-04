import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import GamesPage from './containers/GamesPage';
import GameView from './containers/GameView';
import JobsPage from './containers/JobsPage';
import SteamPage from './containers/SteamPage';
import SettingsPage from './containers/SettingsPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={GamesPage} />
    <Route path="/jobs" component={JobsPage} />
    <Route path="/steam" component={SteamPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/game/:gameId" component={GameView} />
  </Route>
);
