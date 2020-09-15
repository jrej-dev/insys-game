import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from '../../store/AppStore';
import { armies } from '../../gameStats/armies';
//Component
import UnitStack from './UnitStack';

const ArmyBuilder = () => {
  const store = React.useContext(StoreContext);
  const [army, setArmy] = useState("tabForces");
  const [selection, setSelection] = useState([]);
  const [ready, setReady] = useState(false);
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

  const selectMini = (army, unitId, index) => {
    let armyValue = 0;
    if (selection) {
      armyValue = selection.reduce((acc, value) => { return acc + armies[army].units[value.id]["cost"] }, 0)
    }
    
    if (!ready) {
      if (selection.some(mini => mini.index === index)){
        setSelection(selection => [...selection.filter(mini => mini.index !== index)]);
      } else {
        if (armyValue + armies[army].units[unitId]["cost"] <= 10) {
          setSelection(selection => [...selection, {id:unitId, index:index}]);
        }
      }
    }
  }

  const UserMinis = ({ army }) => {
    return useObserver(() => {
      let minis = [];
      if (toJS(store.userMinis) && toJS(store.userMinis).length > 0 && army) {
        toJS(store.userMinis).forEach((unitId, index) => {
          if (armies[army].units[unitId]) {
            minis.push(
              <button className={`${selection.some(mini => mini.index === index)?"border border-gray-700 rounded" : ""} m-2`} key={unitId + index} onClick={() => selectMini(army, unitId, index)}>
                <UnitStack army={army} unitId={unitId} />
              </button>
            )
          }
        })
      }
      if (minis.length > 0) {
        return (
          <div className="w-full flex flex-row justify-center lg:justify-start items-start flex-wrap lg:pl-12">
            {minis}
          </div>
        );
      } else {
        return <></>
      }
    })
  }

  const TeamSelection = ({ army }) => {
    if (selection) {
      let minis = []
      selection.forEach((unit,index)=> {
        minis.push(
          <p key={unit.id+index}>
            1x {armies[army].units[unit.id].name} - Cost: {armies[army].units[unit.id].cost}
          </p>
        )
      })
      return minis;
    } else {
      return <></>
    }

  }

  const SideBar = ({ army, setArmy }) => {
    return (
      <div className="flex flex-col h-screen items-center w-5/12 sm:w-3/12">
        <div className="w-10/12 mx-2 text-center">
          <div>
            <h1 className="m-4"> Select an army </h1>
            <ul className="list-none">
              <li>
                <button
                  className={`${army === "tabForces" ? "bg-green-700 text-white" : ""} border border-gray-800 w-full hover:text-white my-2 py-2 px-4 hover:bg-green-700 rounded`}
                  onClick={() => {setArmy("tabForces"); setSelection([])}}
                >
                  T.A.B Forces
                      </button>
              </li>
              <li>
                <button
                  className={`${army === "sysTroops" ? "bg-blue-700 text-white" : ""} border border-gray-800 w-full hover:text-white my-2 py-2 px-4 hover:bg-blue-700 rounded`}
                  onClick={() => {setArmy("sysTroops"); setSelection([])}}
                >
                  SYS Troops
                      </button>
              </li>
              <li>
                <button
                  className={`${army === "rebels" ? "bg-orange-700 text-white" : ""} border border-gray-800 w-full hover:text-white my-2 py-2 px-4 hover:bg-orange-700 rounded`}
                  onClick={() => {setArmy("rebels"); setSelection([])}}
                >
                  Raging Rebels
                      </button>
              </li>
              <li>
                <button
                  className={`${army === "outerRing" ? "bg-yellow-700 text-white" : ""} border border-gray-800 w-full hover:text-white my-2 py-2 px-4 hover:bg-yellow-700 rounded`}
                  onClick={() => {setArmy("outerRing"); setSelection([])}}
                >
                  Outer-Ring Savages
                      </button>
              </li>
              <li>
                <button
                  className={`${army === "voidWarriors" ? "bg-purple-700 text-white" : ""} border border-gray-800 w-full hover:text-white my-2 py-2 px-4 hover:bg-purple-700 rounded`}
                  onClick={() => {setArmy("voidWarriors"); setSelection([])}}
                >
                  Void Warriors
                </button>
              </li>
            </ul>
          </div>
          <button
                className={`
                ${selection.length === 0 ? "opacity-50 cursor-not-allowed" : ""} 
                ${ready ? "bg-teal-400" : "bg-gray-500"} 
                w-full font-semibold my-8 p-4 text-white rounded`}
                onClick={playerIsReady}
              >
                {
                  ready?
                  "Ready!":
                  "Ready?"
                }
                
          </button>
          <div className="mt-2">
            <h1 className="text-center">Selected team</h1>
            <h2 className="mb-2 text-center">Max army value: 10</h2>
            <TeamSelection army={army}/>
          </div>
        </div>
      </div>
    );
  }

  const playerIsReady = () => {
    if (toJS(store.userDetail) && toJS(store.userDetail).name) {
      if (selection.length > 0 && !ready) {
        setReady(true);
        socket.emit('setArmy', tableId, toJS(store.userDetail).name, selection.map(mini => mini.id), army);
      } else if (ready) {
        setReady(false);
        socket.emit('setArmy', tableId, toJS(store.userDetail).name, [], "");
      }
    }
  }

  return (
    <div className="w-full h-full min-h-screen bg-gray-600 overflow-hidden">
      {
        ready ?
        <div className="alert-banner w-full">
          <label className="flex items-center justify-center w-full py-2 px-12 bg-teal-400 shadow text-white text-center">
            Ready to battle! You'll be redirected to the next phase once your opponent is all set.
          </label>
        </div> :
        <></>
      }
      <div className="flex flex-row">
        <SideBar army={army} setArmy={setArmy} />
        <div className="flex flex-col w-7/12 sm:w-full h-auto bg-white p-4 text-center">
          <h1>Select your miniatures</h1>
          <UserMinis army={army} />
        </div>
      </div>
    </div>
  )
};


export default ArmyBuilder;
