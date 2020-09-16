import React from 'react';
import { useLocalStore } from 'mobx-react';
import { runInAction } from 'mobx';
import { armies } from '../gameStats/armies';
import socketIOClient from "socket.io-client";
const StoreContext = React.createContext();

//Steem API
//const { Client } = require('dsteem');
let opts = {};
//connect to production server
opts.addressPrefix = 'STM';
opts.chainId =
    '0000000000000000000000000000000000000000000000000000000000000000';
//connect to server which is connected to the network/production
//const client = new Client('https://anyx.io/');

//Hivesigner
var hivesigner = require('hivesigner');

var ENDPOINT = "https://insys-node.herokuapp.com/";
var publicURL = "https://miniaturena.com/";
if (process.env.NODE_ENV === "development") {
  publicURL = "http://localhost:3000/";
  ENDPOINT = "http://localhost:5000/";
}

var api = new hivesigner.Client({
    app: 'miniaturena',
    callbackURL: publicURL,
    accessToken: 'access_token',
    scope: [],
});

export function StoreProvider({ children }) {
    const store = useLocalStore(() => ({
        // State Variables
        socket: socketIOClient(ENDPOINT),
        canvasHeight: 400,
        userDetail: {},
        userTable: {},
        gameInfo: {},
        battleReport: false,
        get unitStats() {
            var units = {}; 
            for (let unit of Object.values(armies).map(object => object.units)){ 
                units[Object.keys(unit)[0]] = Object.values(unit)[0]
            }; 
            return units;
        },
        userMinis: ["OTTMK","OTTMK","OTTMK","SKNCK","SKNCK","SKNCK","STLRW","STLRW","STLRW"],
        loginLink: "",
        fullScreen: false,
        setTimer: () => {
            if (store.gameInfo && store.gameInfo.players) {
                store.interval = setInterval(function () {
                    store.gameInfo.players[store.gameInfo.currentPlayer.team].timeLeft -= 1;
                }, 1000);
            }
        }, 
        clearTimer: () => {
            clearInterval(store.interval);
        },
        resetGame: () =>  {
            store.battleReport = false;
            if (store.gameInfo && store.gameInfo.players) {
                //store.gameInfo.players.teamWhite.timeLeft = 1500;
                //store.gameInfo.players.teamBlack.timeLeft = 1500;
                store.gameInfo = {};
                store.getUserTable();
            }
        },    
        setCanvasHeight: (height) => {
            store.canvasHeight = height;
        },
        toggleFullScreen: () => {
            store.fullScreen = !store.fullScreen;
        },
        setInitRoll: (player, num) => {
            if (store.userTable.player1 === player) {
                store.userTable.player1InitRoll = num;
            } else if (store.userTable.player2 === player) {
                store.userTable.player2InitRoll = num;
            }
        },
        setInitWinner: (winner) => {
            store.userTable.initWinner = winner;
        },
        setGameInfo: async(tableId) => {
            await store.getTableById(tableId);
            if (store.userTable && store.userTable._id === tableId) {
                var whitePlayer = store.userTable.teamWhite;
                var blackPlayer = store.userTable.teamBlack;

                store.gameInfo = {
                    tableNumber: store.userTable._id,
                    currentPlayer: store.userTable.currentPlayer,
                    history: store.userTable.history,
                    winner: {},
                    maxVal: store.userTable.maxVal,
                    players: {
                        teamWhite: {
                            name: store.userTable[whitePlayer],
                            army: store.userTable[`${whitePlayer}Army`],
                            armyStats: armies[store.userTable[`${whitePlayer}Army`]],
                            units: store.userTable[`${whitePlayer}Units`],
                            miniData: store.userTable[`${whitePlayer}Minis`],
                            minis: [],
                            startActions: store.userTable[`${whitePlayer}StartActions`],
                            turnActions: store.userTable[`${whitePlayer}TurnActions`],
                            timeLeft: store.userTable.playerTime,
                        },
                        teamBlack: {
                            name: store.userTable[blackPlayer],
                            army: store.userTable[`${blackPlayer}Army`],
                            armyStats: armies[store.userTable[`${blackPlayer}Army`]],
                            units: store.userTable[`${blackPlayer}Units`],
                            miniData: store.userTable[`${blackPlayer}Minis`],
                            minis: [],
                            startActions: store.userTable[`${blackPlayer}StartActions`],
                            turnActions: store.userTable[`${blackPlayer}TurnActions`],
                            timeLeft: store.userTable.playerTime,
                        }
                    }

                }

                return store.gameInfo;
            }
        },
        gameUpdate: {
            setCurrentPlayer: (currentPlayer, socketCB) => {
                store.gameInfo.currentPlayer = currentPlayer;
                if (!socketCB){
                    store.socket.emit('setCurrentPlayer', store.gameInfo.tableNumber, currentPlayer);
                }
            },
            log: (string, socketCB) => {
                store.gameInfo.history.push(string);
                if (!socketCB){
                    store.socket.emit('log', store.gameInfo.tableNumber, string);
                }
            },
            addImportedMini: (mini, team, socketCB) => {
                if (store.gameInfo && store.gameInfo.players) {
                    if (mini.name !== "decor") {
                        if (!store.gameInfo.players[team].minis.some(object => object.id === mini.id)){
                            store.gameInfo.players[team].minis.push(mini);
                        }
                    }
                    if (!socketCB) {
                        store.socket.emit('addImportedMini', store.gameInfo.tableNumber, team, {id: mini.id, name: mini.name, unit: mini.unit, team: mini.team, position: mini.position, rotation: mini.rotation});
                    }
                }   
            },
            removeTurnAction: (team, socketCB) => {
                store.gameInfo.players[team].turnActions -= 1;
                if (!socketCB){
                    store.socket.emit('removeTurnAction', store.gameInfo.tableNumber, team);
                }
            },
            resetTurnActions: (team, socketCB) => {
                store.gameInfo.players[team].turnActions = store.gameInfo.players[team].startActions;
                if (!socketCB){
                    store.socket.emit('resetTurnActions', store.gameInfo.tableNumber, team);
                }
            },
            removePlayerMini: (id, team, socketCB) => {
                //Remove mini from mini array.
                //Remove 2 actions from start actions.¨
                store.gameInfo.players[team].minis = store.gameInfo.players[team].minis.filter(mini => mini.id !== id)
                store.gameInfo.players[team].startActions = store.gameInfo.players[team].minis.length * 2;
                if (!socketCB){
                    store.socket.emit('removePlayerMini', store.gameInfo.tableNumber, id, team);
                }
            },
            movePlayerMini: (id, team, position, rotation, decor) => {
                store.socket.emit('movePlayerMini', store.gameInfo.tableNumber, id, team, position, rotation, decor);
            },
            setMiniPosition : (data) => {
                const {miniId, team, position, rotation} = data;
                if (position && rotation) {
                    let mini = store.gameInfo.players[team].minis.filter(mini => mini.id === miniId)[0];
                    if (mini) {
                        mini.position = position;
                        mini.rotation = rotation;
                    }
                }
            },
            gameOver: (winner, noRedirect, socketCB) => {
                //display winner pop up
                store.gameInfo.winner = winner;
                let tableId = store.userTable._id || store.gameInfo.tableNumber
                if (socketCB) {
                    store.battleReport = true;
                } else {
                    setTimeout(()=> {
                        store.battleReport = true;
                        store.socket.emit('gameOver', tableId, winner, noRedirect);
                        store.handleTableDelete(tableId, noRedirect);
                    },1000)
                }
                //record player stats to database
                //delete table on server
            }
        },
        //Temporal
        temporalLogin: async () => {
            var requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: 'jrej', app: "inkito" })
            };
            const response = await fetch('https://inkito-ipfs.herokuapp.com/login', requestOptions).then(res => res.text());
            runInAction(() => {
                if (response === "success") {
                    store.ipfsState = true;
                } else {
                    store.ipfsState = false;
                }
            })
        },
        logOut: () => {
            api.revokeToken(function (err, res) {
                if (res && res.success) {
                    store.userDetail = {};
                    document.location.href = '/';
                }
                localStorage.setItem('access-token', "");
                localStorage.setItem('users', "");
                store.userDetail = {};
                if (err) {
                    console.log(err);
                }
            });
            return false;
        },
        initHSLogin: () => {
            let link = api.getLoginURL();
            runInAction(() => {
                store.loginLink = link;
            })
        },
        login: (user) => {
            let params = { username: user };

            api.login(params, function (err, token) {
                if (token) {
                    store.getUserDetail(token, user)
                } else if (err) {
                    console.log(err);
                }
            })
        },
        getUserDetail: (localAccess, localUser) => {
            store.userDetail = {};

            if (localAccess && localUser) {
                var access_token = localAccess;
                var username = localUser;

            } else {
                access_token = new URLSearchParams(document.location.search).get('access_token');
                username = new URLSearchParams(document.location.search).get('username');
            }

            if (access_token) {
                // set access token after login
                api.setAccessToken(access_token);

                api.me((err, res) => {
                    if (res) {
                        runInAction(() => {
                            store.userDetail = res;                         
                            if (access_token) {
                                localStorage.setItem('access-token', JSON.stringify(access_token));
                            }
                            if (username) {
                                localStorage.setItem('users', JSON.stringify(username));
                            }
                            if (!store.userTable || !store.userTable.players) {
                                store.getUserTable();
                            }
                        })
                    }
                    if (err) {
                        console.log(err);
                    }
                })
            }
        },
        getUserTable: () => {
            store.userTable = {};
            if (store.userDetail && store.userDetail.name) {
                fetch(`${ENDPOINT}table/?player=${store.userDetail.name}`, {
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
                        if (response) {
                            runInAction(() => {
                                store.userTable = response;
                                if (response._id) {
                                    store.socket.emit('checkJoin', response._id);
                                }
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })                
            }
        },
        getTableById: async (tableId) => {
            store.userTable = {};
            if (tableId) {
                await fetch(`${ENDPOINT}table/?tableId=${tableId}`, {
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
                        if (response) {
                            runInAction(() => {
                                store.userTable = response;
                                store.socket.emit('checkJoin', tableId);
                            })
                            return response
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })                
            }
        },
        handleTableDelete: (tableId, noRedirect) => {
            fetch(`${ENDPOINT}table/delete`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tableId: tableId
                })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.msg) {
                        throw Error(response.msg);
                    }
                    store.socket.emit('deleteTable', response, noRedirect);
                    return response
                })
                .catch(err => {
                    console.log(err);
                })
        },
    }));
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export default StoreContext;
