import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//import { useObserver } from 'mobx-react';
//import { toJS } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from './store/AppStore';
import './App.scss';

//Components
import Home from './components/Home/Home';
import GamePage from './components/Game/GamePage';

const App = () => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    store.temporalLogin();
    //store.getUserDetail();
    if (store.loginLink === "") {
      store.initHSLogin();
    }
    window.addEventListener('keydown', handleFirstTab);
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
    }
  })

  const handleFirstTab = (e) => {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }

  return (
    <div className="font-mono">
      <Router>
        <Switch >
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/game">
            <GamePage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
};


export default App;
