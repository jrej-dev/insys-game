import React from 'react';
import { toJS } from 'mobx';
import { useObserver } from 'mobx-react';
//import { Link } from "react-router-dom";
import StoreContext from '../../store/AppStore';

const TableBanner = () => {
    const store = React.useContext(StoreContext);
     return useObserver(() => {
        if (toJS(store.userDetail) && toJS(store.userDetail).name && toJS(store.userTable)) {
            return (
              <div className="alert-banner w-full">
                <label className="items-center justify-center w-full p-2 bg-teal-400 shadow text-white hidden md:flex">
                  You have created a table. You'll be redirected to the game once another player has joined.
                </label>
                <label className="flex items-center justify-center w-full p-2 bg-teal-400 shadow text-center text-white md:hidden">
                  Table created. Waiting for another player to redirect...
                </label>
              </div>
            )
        } else {
            return <></>
        }
     })
                        
};

export default TableBanner;
