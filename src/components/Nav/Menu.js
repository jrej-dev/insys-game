import React from 'react';
import Popper from "popper.js";
import StoreContext from '../../store/appstore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

const Menu = () => {
  const store = React.useContext(StoreContext);
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  let color = "white";
  color === "white" ? (bgColor = "bg-gray-800")
    : (bgColor = "bg-" + color + "-500");

  return useObserver(() => {
    if (toJS(store.userDetail) && toJS(store.userDetail).name) {
      let user = toJS(store.userDetail);
      return (
        <>
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="relative inline-flex align-middle w-full">
                <button
                  className={
                    "rounded-full outline-none focus:outline-none mr-1 mb-1"
                  }
                  style={{ transition: "all .15s ease" }}
                  type="button"
                  ref={btnDropdownRef}
                  onClick={() => {
                    dropdownPopoverShow
                      ? closeDropdownPopover()
                      : openDropdownPopover();
                  }}
                >
                  <img className={`z-10 w-10 h-10 rounded-full border-2 hidden lg:block`} src={`https://images.hive.blog/u/${user.name.toLowerCase()}/avatar`} alt="" /> 
                  <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white ml-auto mr-4 capitalize lg:hidden">
                    {user.name}
                  </a>
                </button>
                <div
                  ref={popoverDropdownRef}
                  className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    (color === "white" ? "bg-white " : bgColor + " ") +
                    "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                  }
                  style={{ minWidth: "5rem" }}
                >
                  {/*<a
                    href="#pablo"
                    className={
                      "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                      (color === "white" ? " text-gray-800" : "text-white")
                    }
                    onClick={e => e.preventDefault()}
                  >
                    Action
              </a>
                  <a
                    href="#pablo"
                    className={
                      "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                      (color === "white" ? " text-gray-800" : "text-white")
                    }
                    onClick={e => e.preventDefault()}
                  >
                    Another action
              </a>
                  <a
                    href="#pablo"
                    className={
                      "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                      (color === "white" ? " text-gray-800" : "text-white")
                    }
                    onClick={e => e.preventDefault()}
                  >
                    Something else here
              </a>
                  <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                  */}
                  <a
                    href="#pablo"
                    className={
                      "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                      (color === "white" ? " text-gray-800" : "text-white")
                    }
                    onClick={e => {e.preventDefault(); store.logOut()}}
                  >
                    Log Out
              </a>
                </div>
              </div>
            </div>
          </div>
          {/*<button
          style={{ transition: "all .15s ease" }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
            <img className={`z-10 w-10 h-10 rounded-full border-2 hidden lg:block`} src={`https://images.hive.blog/u/${user.name.toLowerCase()}/avatar`} alt="avatar" /> 
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white ml-auto mr-4 capitalize lg:hidden">
              {user.name}
            </a>
            </button>*/}
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
