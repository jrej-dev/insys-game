import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { toJS } from 'mobx';
import { useObserver } from 'mobx-react';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from '../../store/AppStore';
//import { Link } from "react-router-dom";

const Lobby = () => {
    var ENDPOINT = "https://insys-node.herokuapp.com/";
    if (process.env.NODE_ENV === "development") {
        ENDPOINT = "http://localhost:5000/";
    }
    const store = React.useContext(StoreContext);
    const history = useHistory();
    const [tables, setTables] = useState([]);
    var socket = store.socket;

    useEffect(() => {
        fetch(`${ENDPOINT}table`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.msg) {
                    throw Error(response.msg);
                }
                setTables(response);
                return response
            })
            .catch(err => {
                console.log(err);
            })
    }, [ENDPOINT])

    useEffect(() => {
        socket.on("createdTable", function (data) {
            if (data) {
                setTables([...tables, data]);
                store.getUserTable();
            }
        })

        socket.on("deletedTable", function (tableId) {
            if (tableId) {
                setTables([...tables.filter(table => table._id !== tableId)]);
                store.getUserTable();
            }
        })

        socket.on("redirect", function (url) {
            history.push(url)
            store.getUserTable();
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createTable = () => {
        if (toJS(store.userDetail) && toJS(store.userDetail).name) {
            let user = toJS(store.userDetail);
            fetch(`${ENDPOINT}table/create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    player1: user.name
                })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.msg) {
                        throw Error(response.msg);
                    }
                    socket.emit('createTable', response);
                    socket.emit('joinTable', response._id);
                    return response
                })
                .catch(err => {
                    alert(err);
                })
        } else {
            console.log("Please sign in before creating table.")
        }
    };

    const handleTableJoin = (tableId, player) => {
        socket.emit('joinTable', tableId, player);
    }

    function timeFormat(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        var dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
        var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
        var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
        var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    function timeSince(date) {
        var seconds = Math.floor((Date.now() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }

    const TableLines = () => {
        return useObserver(() => {
            let rows = [];
            if (tables && tables.length > 0) {
                for (let table of tables) {
                    if (table) {
                        rows.push(
                            <tr key={table._id} className="bg-gray-500">
                                <td className="border px-1 md:px-4 py-2 text-center hidden md:table-cell">{table._id.slice(0, 10)}</td>
                                <td className="border px-1 md:px-4 py-2 text-center hidden md:table-cell">{timeSince(table.createdAt)}</td>
                                <td className="border px-1 md:px-4 py-2 text-center capitalize hidden md:table-cell">{table.player1}</td>
                                <td className="border px-1 md:px-4 py-2 text-center">{table.map}</td>
                                <td className="border px-1 md:px-4 py-2 text-center">{timeFormat(table.playerTime)}</td>
                                <td className="border px-1 md:px-4 py-2 text-center">{table.maxVal}</td>
                                <td className="border text-center md:px-4">
                                    {

                                        toJS(store.userDetail).name ?
                                            toJS(store.userDetail).name !== table.player1 ?
                                                table.isFull ?
                                                    <h2>
                                                        Table full
                                                    </h2>
                                                    :
                                                    <button
                                                        className="bg-transparent hover:bg-gray-700 text-gray-700 font-semibold hover:text-white m-1 md:m-4 py-2 px-1 md:px-4 border border-gray-700 hover:border-transparent rounded"
                                                        onClick={() => handleTableJoin(table._id, toJS(store.userDetail).name)}
                                                    >
                                                        Join
                                                    </button>
                                                :
                                                <button
                                                    className="bg-transparent hover:bg-gray-700 text-gray-700 font-semibold hover:text-white m-1 md:m-4 py-2 px-1 md:px-4 border border-gray-700 hover:border-transparent rounded"
                                                    onClick={() => store.handleTableDelete(table._id, true)}
                                                >
                                                    Delete
                                                </button>
                                            :
                                            "-"
                                    }
                                </td>
                            </tr>
                        );
                    }
                }
            } else {
                rows = [];
            }
            return rows;
        })
    }

    const CreateButton = () => {
        return useObserver(() => {
            if (toJS(store.userDetail) && toJS(store.userDetail).name) {
                if (toJS(store.userTable) && toJS(store.userTable).player1) {
                    return (
                        <button className="bg-gray-500 font-semibold text-white m-4 p-2 md:px-4 border border-transparent rounded opacity-50 cursor-not-allowed">
                            Create Table
                        </button>
                    );
                } else {
                    return (
                        <button onClick={createTable} className="bg-transparent hover:bg-gray-500 text-gray-600 font-semibold hover:text-white m-4 p-2 md:px-4 border border-gray-500 hover:border-transparent rounded">
                            Create Table
                        </button>
                    );
                }
            } else {
                return (
                    <div className="my-6">
                        <a href={store.loginLink} title="Hivesigner login" className="bg-transparent hover:bg-gray-500 text-gray-600 font-semibold hover:text-white m-4 py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                            Login
                        </a>
                    </div>
                )
            }
        })
    }

    return (
        <div className="min-h-screen flex flex-col h-screen items-center">
            <div id="tables" className="w-11/12 mt-6 min-h-screen">
                <div className="flex flex-row justify-start w-full">
                    <CreateButton />
                </div>
                <div className="flex flex-row">
                    <table className="table-auto w-full text-xs lg:text-base">
                        <thead>
                            <tr className="bg-gray-600">
                                <th className="border px-1 md:px-4 text-center hidden md:table-cell">Table ID</th>
                                <th className="border px-1 md:px-4 text-center hidden md:table-cell">Created</th>
                                <th className="border px-1 md:px-4 text-center hidden md:table-cell">Player</th>
                                <th className="border px-1 md:px-4 text-center">Map</th>
                                <th className="border px-1 md:px-4 text-center">Time Per Player</th>
                                <th className="border px-1 md:px-4 text-center">Max Army Value</th>
                                <th className="border px-1 md:px-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableLines />
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="warning" className="hidden h-screen/2 flex justify-center items-center my-10">
                <div className="border border-gray-900 bg-gray-600 rounded-lg m-10 p-10 sm:p-12 max-w-lg h-auto flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center m-2">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h1 className="font-bold">Warning</h1>
                    </div>
                    <p className="text-left text-sm sm:text-md my-2">Miniaturena is currently not optimized for touch screens and they would affect your gaming experience.</p>
                    <p className="text-left text-sm sm:text-md my-2 font-bold">Please use a cursor-friendly device such as a laptop or PC.</p>
                </div>
            </div>
        </div>
    )
};


export default Lobby;
