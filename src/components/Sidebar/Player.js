import React from 'react';

const Player = ({team, playerName, actionsLeft, minisLeft, isCurrentPlayer}) => {
    return (
        <div className={`w-full flex flex-col md:flex-row flex-grow items-center justify-center lg:justify-start bg-gray-500 p-2 lg:p-8 mx-4 my-2 lg:mb-0 lg:mr-0 lg:pr-8 rounded-md lg:rounded-l-md lg:rounded-r-none`}>
            <div className="relative flex flex-col w-16 items-center justify-center">
                {
                    isCurrentPlayer ?
                    <div className="absolute loader ease-linear rounded-full border-8 border-t-8 border-gray-500 h-16 w-16 top-6/12 left-6/12"/> :
                    null
                }
                {
                    playerName ?
                    <img className={`z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 border-${team}`} src={`https://images.hive.blog/u/${playerName.toLowerCase()}/avatar`} alt="avatar" /> :
                    <svg viewBox="0 0 20 20" fill="currentColor" className="user-circle w-10 h-10"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                }
            </div>
            <div className="flex flex-col flex-grow justify-center">
                <div className="flex flex-col md:flex-row flex-wrap w-full items-center justify-center lg:justify-between">
                    <p className={`mt-0 mr-2 lg:ml-4 lg:mr-0 font-bold text-${team}`}>{playerName}</p>
                    <p className="mt-0 lg:ml-4">Time left</p>
                </div>
                <div className="flex flex-row flex-wrap justify-center items-center lg:justify-between lg:ml-4">
                    <div className="flex flex-row flex-wrap actions mr-2">
                        <p className="mt-0">Actions:</p>
                        <p className="mt-0 ml-2">{actionsLeft}</p>
                    </div>
                    <div className="flex flex-row flex-wrap actions">
                        <p className="mt-0">Minis:</p>
                        <p className="mt-0 ml-2">{minisLeft}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Player;