import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="w-screen bg-gray-700 py-6 px-8 lg:px-32">
            <ul className="w-full list-none flex flex-row text-md flex-wrap justify-center lg:justify-around items-center text-white">
                <li>
                    <Link className="px-4 block lg:inline-block lg:mt-0 text-gray-400 hover:text-white" to="/play">Play</Link>
                </li>
                <li>
                    <Link className="px-4 block lg:inline-block lg:mt-0 text-gray-400 hover:text-white" to="/game">Demo</Link>
                </li>
                {/*
                <li className="block lg:inline-block lg:mt-0 text-gray-400 hover:text-white mx-4">
                    Store
                </li>
                <li className="block lg:inline-block lg:mt-0 text-gray-400 hover:text-white mx-4">
                    Market
                </li>
                <li className="block lg:inline-block lg:mt-0 text-gray-400 hover:text-white mx-4">
                    FAQ
                </li>
                */}
                <li className="block lg:inline-block lg:mt-0 text-gray-400 hover:text-white mx-4">
                    <a href="https://hive.blog/@jrej" target="_blank" rel="noopener noreferrer" title="Inkito blog">Blog</a>
                </li>
            </ul>
        </div>
    )
};


export default Footer;
