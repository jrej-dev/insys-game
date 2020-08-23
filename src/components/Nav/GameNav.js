import React, { useState } from 'react';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import StoreContext from '../../store/AppStore';

const GameNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [sound, /*setSound*/] = useState(false);
    const store = React.useContext(StoreContext);

    const PlayerTurn = () => {
        return useObserver(() => {
            if (toJS(store.gameInfo)) {
              return (
                <p className="block mt-0 inline-block text-gray-400">
                    {toJS(store.gameInfo.currentPlayer.name)}'s turn
                </p>
              );
            } else {
              return (
                <></>
              )
            }
          })
    }

    return (
        <nav className="flex items-center justify-between lg:flex-wrap bg-gray-700 p-4">
            <div className="flex flex-col lg:flex-row">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <span className="font-semibold text-xl tracking-tight">IN/SYS</span>
                </div>
                <div className="text-sm flex flex-col">
                    <p className="block mt-0 inline-block mt-0 text-gray-400 mr-4">{`Table #${store.gameInfo.tableNumber}`}</p>
                    <p className="hidden lg:block mt-0 inline-block mt-0 text-gray-400 mr-4">Progression</p>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="text-sm flex flex-col">
                    
                </div>
                <div className="flex flex-col items-center flex-shrink-0 text-white">
                    <PlayerTurn />
                    <span className="font-semibold text-xl tracking-tight">Time left</span>
                </div>
            </div>

            <div className="flex flex-row">
                <button /*onClick={() => setSound(!sound)}*/ type="button" className="flex items-center px-3 py-2 rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                    {   
                        sound ?
                        <svg viewBox="0 0 20 20" fill="currentColor" className="volume-up w-6 h-6"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"></path></svg> :
                        <svg viewBox="0 0 20 20" fill="currentColor" className="volume-off w-6 h-6"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    }
                </button>
                <button onClick={store.toggleFullScreen} type="button" className="flex items-center px-3 py-2 rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="arrows-expand w-6 h-6"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                </button>
                <button onClick={() => setMenuOpen(!menuOpen)} type="button" className="flex items-center px-3 py-2 rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="cog w-6 h-6"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                </button>
            </div>


            {/*<div className="block lg:hidden">
                <button onClick={() => setNavbarOpen(!navbarOpen)} type="button" className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className={
                "w-full block flex-grow lg:flex lg:items-center lg:w-auto" +
                (navbarOpen ? " flex" : " hidden")
            }>
                <div className="text-sm lg:flex lg:flex-grow w-full">
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                        Play
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                        Game
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                        Shop
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                        Market
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                        Minis
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                        FAQ
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white ml-auto mr-4">
                        Blog
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                        Profile
                    </a>
                </div>
            </div>*/}
        </nav>
    )
};


export default GameNav;
