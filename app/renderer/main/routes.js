import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import GameListPage from './containers/GameListPage';
import GamePage from './containers/GamePage';
import JobsPage from './containers/JobsPage';
import SteamPage from './containers/SteamPage';
import SettingsPage from './containers/SettingsPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={GameListPage} />
    <Route path="/jobs" component={JobsPage} />
    <Route path="/steam" component={SteamPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/game/:gameId" component={GamePage} />
  </Route>
);
