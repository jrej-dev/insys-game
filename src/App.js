import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
//import { useObserver } from 'mobx-react';
//import { toJS } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from './store/AppStore';
import './App.scss';

//Components
import Home from './components/Home/Home';
import GamePage from './components/Game/GamePage';

import Lobby from './components/Play/Lobby';
import Footer from './components/Nav/Footer';
import Nav from './components/Nav/Nav';
import TableBanner from './components/Nav/TableBanner';

const App = () => {
  const store = React.useContext(StoreContext);
  const history = useHistory();
  
  //history.push("/profile")
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
  })

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
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/game">
            <GamePage />
          </Route>
          <Route exact path="/play">
            <Lobby />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
};


export default App;
