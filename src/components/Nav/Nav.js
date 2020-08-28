import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Menu from './Menu';

const Nav = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

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
                    <Link className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4" to="/game">Play</Link>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                        Game
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
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
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white ml-auto mr-4">
                        Blog
                    </a>
                    <Menu />
                </div>
            </div>
        </nav>
    )
};


export default Nav;
