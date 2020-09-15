import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import { useHistory } from "react-router-dom";
import StoreContext from '../../store/AppStore';

//Components
import Scene from '../Scene/Scene';
import Player from '../Sidebar/Player';
import History from '../Sidebar/History';
import InfoBar from '../Sidebar/InfoBar';

const GamePage = () => {
  const store = React.useContext(StoreContext);
  const history = useHistory();
  var socket = store.socket;
  var tableId = new URLSearchParams(document.location.search).get('table');

  useEffect(() => {
    if (!socket._callbacks.$redirect) {
      socket.emit('checkJoin', tableId);
      socket.on("redirect", function (url) {
        history.push(url)
        store.getUserTable();
      })
    }
    
    socket.on('battleReport', function(winner, noRedirect){
      store.gameUpdate.gameOver(winner, noRedirect, true)
    });
    //store.setTimer();
    return () => {
      //store.clearTimer();
      store.resetGame();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const SideBar = () => {
    return useObserver(() => {
      if (toJS(store.gameInfo) && toJS(store.gameInfo).players) {
        return (
          <div className={`${store.fullScreen ? "hidden" : ""} flex flex-col justify-start lg:w-3/12`} >
            <div className="flex flex-row lg:flex-col items-center justify-center" >
              <Player team={"white"} playerName={toJS(store.gameInfo).players.teamWhite.name} actionsLeft={toJS(store.gameInfo.players.teamWhite.turnActions)} minisLeft={toJS(store.gameInfo.players.teamWhite.minis.length)} isCurrentPlayer={toJS(store.gameInfo.currentPlayer.name) === toJS(store.gameInfo.players.teamWhite.name) ? true : false} />
              <Player team={"black"} playerName={toJS(store.gameInfo).players.teamBlack.name} actionsLeft={toJS(store.gameInfo.players.teamBlack.turnActions)} minisLeft={toJS(store.gameInfo.players.teamBlack.minis.length)} isCurrentPlayer={toJS(store.gameInfo.currentPlayer.name) === toJS(store.gameInfo.players.teamBlack.name) ? true : false} />
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

  const getScore = (team) => {
    //compare mini.unit left with units
    let enemyUnitsLeft = toJS(store.gameInfo).players[team === "teamWhite" ? "teamBlack" : "teamWhite"].minis.map(mini => mini.unit);
    let enemyUnitsStart = toJS(store.gameInfo).players[team === "teamWhite" ? "teamBlack" : "teamWhite"].units;
    let enemyUnitsKilled = enemyUnitsLeft = enemyUnitsStart.filter(val => !enemyUnitsLeft.includes(val));

    let killScore = enemyUnitsKilled.reduce((acc,val) => { return toJS(store.unitStats)[val].cost + acc }, 0);
    //get mini restante
    let playerUnitsLeft = toJS(store.gameInfo).players[team].minis.map(mini => mini.unit)
    let saveScore = playerUnitsLeft.reduce((acc,val) => { return toJS(store.unitStats)[val].cost + acc }, 0);
    //get max value
    let maxVal = toJS(store.gameInfo).maxVal;

    let score = ((killScore + saveScore) / maxVal) * 100;
    return score;
  }

  const PlayerStats = ({username, team}) => {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between w-full p-4">
        <div className="flex flex-col sm:flex-row items-center">
          <img className={`z-10 w-12 h-12 rounded-full flex items-center justify-center border border-black`} src={`https://images.hive.blog/u/${username.toLowerCase()}/avatar`} alt="" /> 
          <p className="capitalize m-2">{username}</p>
        </div>
        <p className="mt-2 sm:mt-0">Score {getScore(team)}</p>
      </div>
    )
  }

  const BattleReport = () => {
    return useObserver(() => {
      if (store.battleReport && toJS(store.gameInfo) && toJS(store.gameInfo).winner) {
        let players = toJS(store.gameInfo).players;
        let winner = toJS(store.gameInfo).winner;
        let looser = {name: winner.team === "teamWhite" ? players.teamBlack.name : players.teamWhite.name, team: winner.team === "teamWhite" ? "teamBlack" : "teamWhite"}
        return (
          <div className="absolute mt-10 w-10/12 md:w-7/12 h-auto lg:h-screen/1.5 bg-gray-100 p-4 z-20 pin-x-auto rounded-lg border border-gray-700">
            <div className="flex flex-col justify-between h-full p-4 text-center">
              <div>
                <h1 className="mb-6">
                  Battle Report
                </h1>
                {
                  winner.team === "tie" ?
                  <h2>It's a tie! No winner this time.</h2>
                  :
                  <h2>Winner is {<span className="capitalize font-bold">{winner.name}</span>}</h2>
                }
              </div>
              <div className="flex flex-col justify-center items-start sm:mx-16 divide-y divide-gray-400 mb-8">
                <div className="px-4 py-2">
                  <h2>Game Results:</h2>
                </div>
                <PlayerStats username={winner.name} team={winner.team}/>
                <PlayerStats username={looser.name} team={looser.team}/>
              </div>

              <div className="flex flex-row justify-around items-center sm:mx-16">
                <button onClick={() => history.push("/")} className="border border-gray-800 hover:border-white hover:text-white m-2 py-2 px-2 md:px-10 hover:bg-gray-500 rounded whitespace-no-wrap">Go Home</button>
                <button onClick={() => history.push("/play")} className="border border-gray-800 hover:border-white hover:text-white m-2 py-2 px-2 md:px-10 hover:bg-teal-400 rounded whitespace-no-wrap">Battle</button>
              </div>

            </div>
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
      <BattleReport />
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="w-full h-full min-h-screen">
          <Scene />
          <InfoBar team="teamWhite" />
          <InfoBar team="teamBlack" />
        </div>
        <SideBar />
      </div>
    </div>
  )
};


export default GamePage;
