import React from 'react';
import { toJS } from 'mobx';
import { useObserver } from 'mobx-react';
import { useHistory, withRouter } from "react-router-dom";
//import { Link } from "react-router-dom";
import StoreContext from '../../store/AppStore';

const TableBanner = () => {
  const store = React.useContext(StoreContext);
  const history = useHistory();
  const href = history.location.pathname + history.location.search;
  return useObserver(() => {
    if (toJS(store.userDetail) && toJS(store.userDetail).name && toJS(store.userTable) && !toJS(store.userTable).isFull) {
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
    } else if (toJS(store.userDetail) && toJS(store.userDetail).name && toJS(store.userTable) && toJS(store.userTable).isFull && !href.includes(toJS(store.userTable)._id)) {
      return (
        <div className="alert-banner w-full" onClick={() => {history.push(toJS(store.userTable).gameUrl)}}>
          <label className="flex cursor-pointer items-center justify-center w-full p-2 bg-teal-400 shadow text-white text-center">
            You are attended to an on-going game. Click to be redirected to it...
          </label>
        </div>
      )
    } else {
      return <></>
    }
  })

};

export default withRouter(TableBanner);
