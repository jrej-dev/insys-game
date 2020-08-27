import React from 'react';

const Footer = () => {
    return (
        <div className="w-screen bg-gray-700 py-6 px-8 lg:px-32">
            <ul className="w-full list-none flex flex-row flex-wrap justify-center lg:justify-around items-center text-white">
                <li className="px-2">
                    Factions
                </li>
                <li className="px-2">
                    Store
                </li>
                <li className="px-2">
                    Market
                </li>
                <li className="px-2">
                    Battle
                </li>
                <li className="px-2">
                    <a href="https://hive.blog/@jrej" target="_blank" rel="noopener noreferrer" title="Inkito blog">Blog</a>
                </li>
            </ul>
        </div>
    )
};


export default Footer;
