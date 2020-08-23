import React, { useState } from 'react';

const Nav = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">IN/SYS Wargame</span>
            </div>
            <div className="block lg:hidden">
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
            </div>
        </nav>
    )
};


export default Nav;
