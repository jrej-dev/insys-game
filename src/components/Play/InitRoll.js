import React, { useEffect/*, useState*/ } from 'react';
import { useHistory } from "react-router-dom";
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from '../../store/AppStore';

const InitRoll = () => {
  const store = React.useContext(StoreContext);
  const history = useHistory();
  var tableId = new URLSearchParams(document.location.search).get('table');
  var socket = store.socket;

  useEffect(() => {
    if (!socket._callbacks.$redirect) {
      socket.on("redirect", function (url) {
          console.log("redirect");
          history.push(url)
          store.getUserTable();
      })
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect (() => {
    store.getTableById(tableId);
  }, [store, tableId])
  
  const PlayerUnits = ({ player }) => {
    return useObserver (() => {
      let units = [];
      if (toJS(store.userTable) && toJS(store.userTable)[`${player}Army`]){
        for (const [i, unitId] of toJS(store.userTable)[`${player}Army`].entries()) {
          units.push(
            <div key={i} className="w-40 md:w-48 m-2">
              <img className="rounded-t-lg" src={store.unitStats[unitId].image} alt=""/>
              <div className="w-full p-2 flex justify-center items-center bg-white">
                <p className="text-center">{store.unitStats[unitId].name}</p>
              </div>
            </div>
          )
        }
      }
      if (units && units.length > 0){
        return (
        <div className="flex flex-col justify-start w-full md:w-3/10 my-6 md:my-12" >
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
      <div className="w-screen text-center bg-gradient-to-r from-gray-700 via-white to-gray-700 p-4">      
        <div className="flex flex-col md:flex-row w-full h-auto lg:h-screen md:justify-around">
          <PlayerUnits player={"player1"}/>
          <p className="m-6">VS</p>
          <PlayerUnits player={"player2"}/>
        </div>
      </div>
    </div>
  )
};


export default InitRoll;