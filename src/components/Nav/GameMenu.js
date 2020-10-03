import React from 'react';
import Popper from "popper.js";
import StoreContext from '../../store/appstore';
import { useHistory } from "react-router-dom";
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

const GameMenu = () => {
  const store = React.useContext(StoreContext);
  const history = useHistory();
  const href = history.location.pathname + history.location.search;
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
          <div className="flex flex-wrap px-3 py-2 items-center">
            <div className="w-full">
              <div className="relative inline-flex align-middle w-full">
                <button
                  className={
                    "rounded-full outline-none focus:outline-none"
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
                  <svg viewBox="0 0 20 20" fill="white" className="cog w-6 h-6"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                  {/*<img className={`z-10 w-10 h-10 rounded-full border-2 hidden lg:block`} src={`https://images.hive.blog/u/${user.name.toLowerCase()}/avatar`} alt="" />*/}
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
                  
                  */}
                  <a
                    href="#pablo"
                    className={
                      "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                      (color === "white" ? " text-gray-800" : "text-white")
                    }
                    onClick={() => history.push("/")}
                  >
                    Home
                  </a>
                  
                  <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                  <a
                    href="#pablo"
                    className={
                      "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                      (color === "white" ? " text-gray-800" : "text-white")
                    }
                    onClick={
                      e => {e.preventDefault(); 
                        store.gameUpdate.gameOver(
                          {
                            name: user.name === toJS(store.userTable).player1 ?  toJS(store.userTable).player2 : toJS(store.userTable).player1, 
                            team: toJS(store.gameInfo).players ? user.name === toJS(store.gameInfo).players.teamWhite.name ? "teamBlack" : "teamWhite" : "undefined"
                          },
                          href.includes("/game") ?
                          true :
                          false                           
                        );
                      }
                    }
                  >
                    Forfeit Game
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
          <button  className={"rounded-full outline-none focus:outline-none mr-1 mb-1"}  type="button" >
            <svg viewBox="0 0 20 20" fill="white" className="cog w-6 h-6"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
          </button>
        )
    }
  })
}

export default GameMenu;
