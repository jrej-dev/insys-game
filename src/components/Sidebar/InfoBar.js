import React from 'react';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import StoreContext from '../../store/AppStore';
import UnitCard from './UnitCard';

const InfoBar = ({ team }) => {
    const store = React.useContext(StoreContext);
    return useObserver(() => {
        if (toJS(store.gameInfo) && toJS(store.gameInfo).players && toJS(store.gameInfo).players[team].minis) {
            let minis = toJS(store.gameInfo.players[team].minis);
            let cards = [];

            for (let i = 0; i < minis.length; i++) {
                cards.push(
                    <UnitCard key={team + i} army={toJS(store.gameInfo.players)[team].army} unitId={minis[i].unit}/>
                )
            }
            return (
                <>
                    <div className="w-auto h-auto min-h-full my-4 m-2 lg:mr-0">
                        <div className="w-full flex justify-start items-center bg-gray-600 border-b-2 border-gray-700 p-2 md:p-4">
                            <h2>
                                <span className={`text-${team.includes("White") ? 'white' : 'black'} font-bold capitalize`}>{toJS(store.gameInfo.players[team].name)}</span>'s miniatures:
                            </h2>
                        </div>
                        <div className="flex flex-row flex-wrap justify-center lg:justify-start items-center bg-gray-600 p-4 lg:px-10">
                            {cards}
                        </div>
                    </div>
                </>
            )
        } else {
            return <></>
        }
    })
};


export default InfoBar;