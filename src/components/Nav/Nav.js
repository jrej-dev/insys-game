import React, { useState } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//Components
import Menu from './menu';
import GameNav from './gamenav';

const Nav = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const history = useHistory();
    const href = history.location.pathname + history.location.search;

    if (href.includes("/game")) {
        return (
            <GameNav />
        )
    } else if (href.includes("/build?table")) {
        return (
            <GameNav preGame={true} build={true}/>
        )  
    } else if (href.includes("/init?table")) {
        return (
            <GameNav preGame={true} init={true}/>
        )  
    } else {
        return (
            <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <h1 className="font-semibold text-xl tracking-tight">
                        <Link to="/">
                            Miniaturena
                        </Link>
                    </h1>
                </div>
                <div className="block flex flex-row justify-center items-center lg:hidden">
                    <button onClick={() => setNavbarOpen(!navbarOpen)} type="button" className="flex items-center ml-4 px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div className={
                    "w-full block flex-grow lg:flex lg:items-center lg:w-auto" +
                    (navbarOpen ? " flex" : " hidden")
                }>
                    <div className="text-lg lg:flex lg:flex-grow w-full items-center">
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4" to="/play">Play</Link>
                        {/*<a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                            Store
                        </a>
                        <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                            Market
                        </a>
                        <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                            Minis
                        </a>
                        <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                            FAQ
                        </a>*/}
                        <a href="https://hive.blog/@jrej" target="_blank" rel="noopener noreferrer" title="Inkito blog" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white ml-auto mr-4">
                            Blog
                        </a>
                        <Menu />
                    </div>
                </div>
            </nav>
        )
    }
};

export default withRouter(Nav);
