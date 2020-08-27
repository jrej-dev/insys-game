import React from 'react';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import StoreContext from '../../store/AppStore';


const History = () => {
    const store = React.useContext(StoreContext);
    return useObserver(() => {
        if (store.gameInfo) {
            let events = toJS(store.gameInfo.history);
            let history = [];
            var result = [];

            for (let i = 0; i < events.length; i++) {
                if (events[i] && events[i].includes(store.gameInfo.players.teamWhite.name)) {
                    let arr = events[i].split(store.gameInfo.players.teamWhite.name)
                    result = [<span key={arr[0]}>{arr[0]}</span>, <span key={store.gameInfo.players.teamWhite.name} className="text-white font-bold">{store.gameInfo.players.teamWhite.name}</span>, <span key={arr[1]}>{arr[1]}</span>]
                } else if (events[i] && events[i].includes(store.gameInfo.players.teamBlack.name)) {
                    let arr = events[i].split(store.gameInfo.players.teamBlack.name)
                    result = [<span key={arr[0]}>{arr[0]}</span>, <span key={store.gameInfo.players.teamBlack.name} className="text-black font-bold">{store.gameInfo.players.teamBlack.name}</span>, <span key={arr[1]}>{arr[1]}</span>]
                } else {
                    result = [events[i]]
                }
                history.unshift(
                    <div key={i} className="bg-gray-500 hidden rounded-sm lg:block m-2 p-2">
                        {result}
                    </div>
                )
            }
            return (
                <div className="scroll-bar overflow-auto my-4 pb-1 mx-1 hidden lg:block w-auto" style={{height:store.canvasHeight * 1.75}}>
                    {history}
                </div>
            )
        } else {
            return <></>
        }
    })
};


export default History;