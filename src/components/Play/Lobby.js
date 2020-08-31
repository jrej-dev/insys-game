import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { useObserver } from 'mobx-react';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from '../../store/AppStore';
//import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";

const Lobby = () => {
    const store = React.useContext(StoreContext);
    const [tables, setTables] = useState([]);
    const ENDPOINT = "https://insys-node.herokuapp.com/";
    const socket = socketIOClient(ENDPOINT);

    useEffect(() => {
        fetchOpenTables();
    }, [])

    useEffect(() => {
        socket.on("createdTable", function (data) {
            if (data) {
                setTables([...tables, data]);
            }
        })

        socket.on("deletedTable", function (data) {
            if (data) {
                setTables(tables.filter(table => table._id !== data._id));
            }
        })

        return () => {
            socket.disconnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tables])

    const fetchOpenTables = () => {
        console.log("fetching tables!")
        fetch("https://insys-node.herokuapp.com/table", {
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
                setTables(response.openTables);
                return response
            })
            .catch(err => {
                console.log(err);
            })
    };

    const createTable = () => {
        if (toJS(store.userDetail) && toJS(store.userDetail).name) {
            let user = toJS(store.userDetail);
            fetch("https://insys-node.herokuapp.com/table/create", {
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
                    socket.emit('createTable', response.newTable);
                    console.log(response.newTable);
                    return response
                })
                .catch(err => {
                    alert(err);
                })
        } else {
            console.log("Please sign in before creating table.")
        }
    };

    const handleTableDelete = (player) => {
        fetch("https://insys-node.herokuapp.com/table/delete", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player: player
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.msg) {
                    throw Error(response.msg);
                }
                socket.emit('deleteTable', response.deletedTable[0]);
                return response
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleTableJoin = (tableID) => {
        console.log(`join table ${tableID}`)
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
                            <tr key={table._id} className="bg-gray-500 z-0">
                                <td className="border px-4 py-2 text-center">{table._id}</td>
                                <td className="border px-4 py-2 text-center">{timeSince(table.createdAt)}</td>
                                <td className="border px-4 py-2 text-center capitalize">{table.player1}</td>
                                <td className="border px-4 py-2 text-center">{table.map}</td>
                                <td className="border px-4 py-2 text-center">{timeFormat(table.playerTime)}</td>
                                <td className="border px-4 py-2 text-center">{table.maxVal}</td>
                                <td className="border text-center">
                                    {
                                        toJS(store.userDetail).name ?
                                            toJS(store.userDetail).name !== table.player1 ?
                                                <button className="bg-transparent hover:bg-gray-700 text-gray-700 font-semibold hover:text-white m-4 py-2 px-4 border border-gray-700 hover:border-transparent rounded" onClick={handleTableJoin}>
                                                    Join
                                    </button>
                                                :
                                                <button className="bg-transparent hover:bg-gray-700 text-gray-700 font-semibold hover:text-white m-4 py-2 px-4 border border-gray-700 hover:border-transparent rounded" onClick={() => handleTableDelete(toJS(store.userDetail).name)}>
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

    const CreateTable = () => {
        return useObserver(() => {
            if (toJS(store.userDetail) && toJS(store.userDetail).name) {
                return (
                    <button onClick={createTable} className="bg-transparent hover:bg-gray-500 text-gray-600 font-semibold hover:text-white m-4 py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                        Create Table
                    </button>
                );
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
        <div className="min-h-screen flex flex-col h-screen/2 items-center">
            <div className="w-11/12 mt-6">
                <div className="flex flex-row justify-start w-full">
                    <CreateTable />
                </div>
                <div className="flex flex-row">
                    <table className="table-auto w-full z-0">
                        <thead>
                            <tr className="bg-gray-600">
                                <th className="border px-4 text-center">Table ID</th>
                                <th className="border px-4 text-center">Created</th>
                                <th className="border px-4 text-center">Player</th>
                                <th className="border px-4 text-center">Map</th>
                                <th className="border px-4 text-center">Time Per Player</th>
                                <th className="border px-4 text-center">Max Army Value</th>
                                <th className="border px-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableLines />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};


export default Lobby;
