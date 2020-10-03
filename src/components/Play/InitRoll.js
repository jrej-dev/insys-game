import React, { useEffect } from 'react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';
import { useHistory } from "react-router-dom";
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from '../../store/appstore';

const InitRoll = () => {
  const store = React.useContext(StoreContext);
  const history = useHistory();
  var tableId = new URLSearchParams(document.location.search).get('table');
  var socket = store.socket;
  var reactDice1;
  var reactDice2;

  useEffect(() => {
    if (!socket._callbacks.$redirect) {
      socket.on("redirect", function (url) {
        history.push(url)
        store.getUserTable();
      })
    }
    
    socket.on("opponentInitRoll", function (player, roll) {
      store.setInitRoll(player, roll);
      if (toJS(store.userTable).player1 === player && reactDice1) {
        reactDice1.rollAll([roll]);
      } else if (toJS(store.userTable).player2 === player && reactDice2) {
        reactDice2.rollAll([roll]);
      }
    })

    socket.on("initRollWinner", function (initWinner) {
      if (!toJS(store.userTable).initWinner || toJS(store.userTable).initWinner === "none") {
        setTimeout(() => {
          store.setInitWinner(initWinner);
        },2000);
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    store.getTableById(tableId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const PlayerUnits = ({ player }) => {
    return useObserver(() => {
      let units = [];
      if (toJS(store.userTable) && toJS(store.userTable)[`${player}Units`] && toJS(store.unitStats)) {
        for (const [i, unitId] of toJS(store.userTable)[`${player}Units`].entries()) {
          units.push(
            <div key={i} className="w-40 md:w-48 m-2">
              <img className="rounded-t-lg" src={toJS(store.unitStats)[unitId].image} alt="" />
              <div className="w-full p-2 flex justify-center items-center bg-white">
                <p className="text-center">{toJS(store.unitStats)[unitId].name}</p>
              </div>
            </div>
          )
        }
      }
      if (units && units.length > 0) {
        return (
          <div className="flex flex-col justify-start w-full md:w-3/10 mt-6 mb-6 md:mb-20" >
            <h1 className="md:m-4">{toJS(store.userTable)[player]}</h1>
            <div className="lg:h-full flex flex-col flex-wrap md:justify-around items-center">
              {units}
            </div>
          </div>
        )
      } else {
        return <></>
      }
    });
  }

  const PlayerRoll = ({ player }) => {
    return useObserver(() => {
      if (toJS(store.userTable) && toJS(store.userTable)[player]) {
        return (
          <div className="flex flex-col">
            <div>
              <span className="capitalize">{toJS(store.userTable)[player]}</span>
              <span>'s roll</span>
            </div>
            <ReactDice
              defaultRoll={toJS(store.userTable)[`${player}InitRoll`] || 1}
              faceColor={"#4a5568"}
              dotColor={"#ffffff"}
              numDice={1}
              disableIndividual={toJS(store.userTable)[player] === toJS(store.userDetail).name ? toJS(store.userTable)[`${player}InitRoll`] ? true : false : true}
              rollDone={toJS(store.userTable)[player] === toJS(store.userDetail).name ? rollDoneCallback : displayCallBack}
              ref={dice => {player === "player1" ? reactDice1 = dice : reactDice2 = dice }}
            />
          </div>
        )
      } else {
        return <></>
      }
    })
  }

  const rollDice = () => {
    if (toJS(store.userTable).player1 === toJS(store.userDetail).name) {
      reactDice1.rollAll();
    } else if (toJS(store.userTable).player2 === toJS(store.userDetail).name) {
      reactDice2.rollAll();
    }
  }

  const rollDoneCallback = (num) => {
    console.log(`You rolled a ${num}`)
    store.setInitRoll(toJS(store.userDetail).name, num);
    socket.emit('initRoll', tableId, toJS(store.userDetail).name, num);
  }

  const displayCallBack = (num) => {
    console.log(`Enemy rolled a ${num}`)
  }

  const RollButton = () => {
    return useObserver(() => {
      if (toJS(store.userTable) && toJS(store.userDetail).name) {
        let initWinner = toJS(store.userTable).initWinner;
        if (initWinner && initWinner !== "none") {
          if (toJS(store.userDetail).name === initWinner) {
            let currentPlayer = toJS(store.userDetail).name === toJS(store.userTable).player1 ? "player1" : "player2";
            let enemyPlayer = toJS(store.userDetail).name === toJS(store.userTable).player1 ? "player2" : "player1";
            return (
              <>
                <p>You rolled higher. Please decide who plays first.</p>
                <div className="m-6">
                  <button 
                    className="border border-gray-800 hover:text-white m-2 py-4 px-10 hover:bg-gray-700 rounded" 
                    onClick={() => {socket.emit('initGame', tableId, currentPlayer)}}
                  >
                    Take initiative
                  </button>
                  <button 
                    className="border border-gray-800 hover:text-white m-2 py-4 px-10 hover:bg-gray-700 rounded" 
                    onClick={() => {socket.emit('initGame', tableId, enemyPlayer)}}
                  >
                    Leave initiative
                  </button>
                </div>
              </>
            )
          } else {
            return <p>You rolled lower. Initiative will be chosen by your opponent.</p>
          }
        } else {
          if (toJS(store.userTable).player1 === toJS(store.userDetail).name && toJS(store.userTable).player1InitRoll > 0 && initWinner !== "none") {
            return (
              <p>
                Waiting for other player to roll
              </p>
            )
          } else if (toJS(store.userTable).player2 === toJS(store.userDetail).name && toJS(store.userTable).player2InitRoll > 0 && initWinner !== "none") {
            return (
              <p>
                Waiting for other player to roll
              </p>
            )
          } else {
            return (
              <>
                {
                  initWinner === "none" ?
                    <p>That's a tie! Please try again.</p>
                    :
                    <></>
                }
                <button className="border border-gray-800 hover:text-white my-2 py-4 px-10 hover:bg-gray-700 rounded" onClick={rollDice}>
                  Roll
                </button>
              </>
            )
          }
        }
      } else {
        return <></>
      }
    })

  }

  return (
    <div className="w-full h-full bg-gray-600 overflow-hidden">
      {/*
        ready ?
        <div className="alert-banner w-full">
          <label className="flex items-center justify-center w-full py-2 px-12 bg-teal-400 shadow text-white text-center">
            You Rolled! Waiting for the opponent to roll...
          </label>
        </div> :
        <></>*/
      }
      <div className="w-screen min-h-screen text-center bg-gradient-to-r from-gray-700 via-white to-gray-700 p-4">
        <div className="flex flex-col md:flex-row w-full lg:h-screen md:items-stretch items-center md:justify-around">
          <PlayerUnits player={"player1"} />
          <div className="w-3/10 flex flex-col justify-center items-center">
            <p className="m-6 hidden md:block">VS</p>
            <p>Highest number chooses initiative!</p>
            <div className="flex flex-col md:flex-row justify-around w-full m-4">
              <PlayerRoll player={"player1"} />
              <PlayerRoll player={"player2"} />
            </div>
            <RollButton />
          </div>
          <PlayerUnits player={"player2"} />
        </div>
      </div>
    </div>
  )
};


export default InitRoll;