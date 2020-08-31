import React from 'react';
import StoreContext from '../../store/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

const Menu = () => {
  const store = React.useContext(StoreContext);
  return useObserver(() => {
    if (toJS(store.userDetail) && toJS(store.userDetail).name) {
      let user = toJS(store.userDetail);
      return (
        <>
          <img className={`z-10 w-10 h-10 rounded-full border-2 hidden lg:block`} src={`https://images.hive.blog/u/${user.name.toLowerCase()}/avatar`} alt="avatar" /> 
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white ml-auto mr-4 capitalize lg:hidden">
            {user.name}
          </a>
        </>
      )
    } else {
      return (
        <div className="login">
          <a href={store.loginLink} title="Hivesigner login" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white">
            Login
          </a>
          <p className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white hidden lg:block">/</p>
          <a href="https://hiveonboard.com/create-account/" title="Hive register page" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white">Register</a>
        </div>
      )
    }
  })
}

export default Menu;
