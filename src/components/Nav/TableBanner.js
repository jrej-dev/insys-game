import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import StoreContext from '../../store/AppStore';

const TableBanner = () => {
    const store = React.useContext(StoreContext);

    return (
      <div class="alert-banner w-full fixed top-0">
        <label class="flex items-center justify-between w-full p-2 bg-red-500 shadow text-white">
          You have created a table. You'll be redirected to the game once another player has joined.
        </label>
      </div>
    )
};

export default TableBanner;
