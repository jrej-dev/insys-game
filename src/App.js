import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from './store/AppStore';
import './App.scss';

//Components
import Home from './components/Home/Home';
import GamePage from './components/Game/GamePage';

import Lobby from './components/Play/Lobby';
import ArmyBuilder from './components/Play/Armybuilder';
import InitRoll from './components/Play/InitRoll';
import Footer from './components/Nav/Footer';
import Nav from './components/Nav/Nav';
import ArmyBuilder from './components/Play/ArmyBuilder';
import InitRoll from './components/Play/InitRoll';
import TableBanner from './components/Nav/TableBanner';

const App = () => {
  const store = React.useContext(StoreContext);
  var socket = store.socket;

  useEffect(() => {
    store.temporalLogin();
    getUserDetail();
    if (store.loginLink === "") {
      store.initHSLogin();
    }

    window.addEventListener('keydown', handleFirstTab);
    return () => {
      socket.disconnect();
      window.removeEventListener('keydown', handleFirstTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getUserDetail = () => {
    const accessToken = localStorage.getItem('access-token');
    const user = localStorage.getItem('users');
    if (accessToken && user) {
      store.getUserDetail(JSON.parse(accessToken), JSON.parse(user));
    } else {
      store.getUserDetail();
    }
  }

  const handleFirstTab = (e) => {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }

  return (
    <div className="font-mono w-full h-full overflow-x-hidden">
      <Router>
        <Nav />
        <TableBanner />
        <Switch >
          <Route exact path="/" >
            <Home />
          </Route>
          <Route exact path="/game">
            <GamePage />
          </Route>
          <Route exact path="/play">
            <Lobby />
          </Route>
          <Route path="/build">
            <ArmyBuilder />
          </Route>
          <Route path="/init">
            <InitRoll />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
};


export default App
