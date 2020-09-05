import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from '../../store/AppStore';

const InitRoll = () => {
  const store = React.useContext(StoreContext);
  var tableId = new URLSearchParams(document.location.search).get('table');
  var socket = store.socket;

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
      <div className="h-screen w-screen text-center bg-gradient-to-r from-gray-700 via-white to-gray-700 p-4">      
        <div className="flex flex-row w-full justify-around mt-12">
            <div>
                <h1>Player 1</h1>
            </div>
            <p>
                VS          
            </p>
            <div>
                <h1>Player 2</h1>
            </div>
        </div>
      </div>
    </div>
  )
};


export default InitRoll;
