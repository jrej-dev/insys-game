import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from './store/appstore';
import './app.scss';

//Components
import Home from './components/home/home';
import GamePage from './components/game/gamepage';

import Lobby from './components/play/lobby';
import ArmyBuilder from './components/play/armybuilder';
import InitRoll from './components/play/initroll';
import Footer from './components/nav/footer';
import Nav from './components/nav/nav';
import TableBanner from './components/nav/tablebanner';

const App = () => {
  const store = React.useContext(StoreContext);
  //var socket = store.socket;

  useEffect(() => {
    store.temporalLogin();
    getUserDetail();
    if (store.loginLink === "") {
      store.initHSLogin();
    }
    window.addEventListener('keydown', handleFirstTab);
    return () => {
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
