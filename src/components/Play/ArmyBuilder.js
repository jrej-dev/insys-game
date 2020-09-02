import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from '../../store/AppStore';

//Component
import UnitCard from '../Sidebar/UnitCard';

const ArmyBuilder = () => {
  const store = React.useContext(StoreContext);
  const [selectedArmy, setSelectedArmy] = useState("");
  useEffect(() => {
    //store.setTimer();
    //store.getUserMinis();
  })
  
  const UserMinis = () => {
    return useObserver(() => {
      let minis = [];
        if (toJS(store.userMinis) && toJS(store.userMinis).length > 0) {
            toJS(store.userMinis).forEach(mini => {
              minis.push(
                <UnitCard key={mini} army={selectedArmy} unitId={mini}/>
              ) 
            })
          }
          if (minis.length > 0) {
            return (
            <div className="flex flex-wrap">
              {minis}
            </div>
            );
          } else {
            return <></>
          }
      })
  }

  const SideBar = () => {
    return (
          <div className="flex flex-col items-center lg:w-3/12">
              <h2 className="m-4"> Armies </h2>
              <ul className="list-none">
                <li className="p-2">T.A.B Forces</li>
                <li className="p-2">SYS Troops</li>
                <li className="p-2">Raging Rebels</li>
                <li className="p-2">Outer-Ring Savages</li>
                <li className="p-2">Void Warriors</li>
              </ul>
          </div>
        );
   } 

  return (
    <div className="side-bar w-full h-full bg-gray-800 overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row">
        <SideBar />
        <div className="w-full h-full">
          <h1>Your Miniatures</h1>
          <UserMinis />
        </div>
      </div>
    </div>
  )
};


export default GamePage;
