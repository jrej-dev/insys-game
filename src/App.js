import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from './store/AppStore';
import './App.scss';

//Components
import Scene from './components/Scene/Scene';
//import Nav from './components/Nav/Nav';
import GameNav from './components/Nav/GameNav';
import Footer from './components/Nav/Footer';
import Player from './components/Sidebar/Player';
import History from './components/Sidebar/History';
import InfoBar from './components/Sidebar/InfoBar';

const App = () => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    store.temporalLogin();
    store.getUserDetail();
    if (store.loginLink === "") {
      store.initHSLogin();
    }
    store.setTimer();
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

  const SideBar = () => {
    return useObserver(() => {
      if (toJS(store.gameInfo)) {
        return (
          <div className={`${store.fullScreen ? "hidden" : ""} flex flex-col justify-between lg:w-3/12`} >
            <div className="flex flex-row lg:flex-col items-center justify-center" >
              <Player team={"white"} playerName={toJS(store.gameInfo.players.teamWhite.name)} actionsLeft={toJS(store.gameInfo.players.teamWhite.turnActions)} minisLeft={toJS(store.gameInfo.players.teamWhite.minis.length)} isCurrentPlayer={toJS(store.gameInfo.currentPlayer.name) === toJS(store.gameInfo.players.teamWhite.name) ? true : false}/>
              <Player team={"black"} playerName={toJS(store.gameInfo.players.teamBlack.name)} actionsLeft={toJS(store.gameInfo.players.teamBlack.turnActions)} minisLeft={toJS(store.gameInfo.players.teamBlack.minis.length)} isCurrentPlayer={toJS(store.gameInfo.currentPlayer.name) === toJS(store.gameInfo.players.teamBlack.name) ? true : false}/>
            </div>
            <History />
          </div>
        );
      } else {
        return (
          <></>
        )
      }
    })
  } 

  return (
    <div className="side-bar w-full h-full bg-gray-800 overflow-hidden">
      <GameNav />
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="w-full h-full">
          <Scene />
          <InfoBar team="teamWhite"/>
          <InfoBar team="teamBlack"/>
        </div>
        <SideBar />
      </div>
      <Footer />
    </div>
  )
};


export default App;
