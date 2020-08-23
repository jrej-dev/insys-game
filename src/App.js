import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from './store/AppStore';
import './App.scss';

//Components
import Scene from './components/Scene/Scene';
//import Nav from './components/Nav/Nav';
import GameNav from './components/Nav/GameNav';
import Players from './components/Sidebar/Player';


const App = () => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    store.temporalLogin();
    store.getUserDetail();
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

  const PlayerCards = () => {
    return useObserver(() => {
      if (store.gameInfo) {
        return (
          <div className={`${store.fullScreen ? "hidden" : ""} flex flex-row w-full lg:flex-col lg:w-2/12 items-center lg:mx-2`} >
            <Players team={"white"} playerName={store.gameInfo.players.teamWhite.player} actionsLeft={store.gameInfo.players.teamWhite.turnActions} minisLeft={store.gameInfo.players.teamWhite.minis.length} isCurrentPlayer={store.gameInfo.currentPlayer === "teamWhite" ? true : false}/>
            <Players team={"black"} playerName={store.gameInfo.players.teamBlack.player} actionsLeft={store.gameInfo.players.teamBlack.turnActions} minisLeft={store.gameInfo.players.teamBlack.minis.length} isCurrentPlayer={store.gameInfo.currentPlayer === "teamBlack" ? true : false}/>
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
    <div className="w-full h-screen bg-gray-800 overflow-hidden">
      <GameNav />
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="w-full">
          <Scene />
        </div>
        <PlayerCards />
      </div>
    </div>
  )
};


export default App;
