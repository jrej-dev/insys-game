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

var publicURL = "https://miniaturena.com/";
if (process.env.NODE_ENV === "development") {
  publicURL = "http://localhost:3000/";
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
        socket: socketIOClient("https://insys-node.herokuapp.com/"),
        canvasHeight: 400,
        userDetail: {},
        userTable: {},
        loginLink: "",
        fullScreen: false,
        generateTableNumber: () => {
            return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
        },
        setTimer: () => {
            setInterval(function () {
                store.gameInfo.players[store.gameInfo.currentPlayer.team].timeLeft -= 1;
            }, 1000);
        },
        setCanvasHeight: (height) => {
            store.canvasHeight = height;
        },
        toggleFullScreen: () => {
            store.fullScreen = !store.fullScreen;
        },
        gameInfo: {
            get tableNumber() { return store.generateTableNumber() },
            currentPlayer: {
                get name() { return store.gameInfo.players[this.team].name },
                team: "teamWhite",
            },
            history: [],
            players: {
                teamWhite: {
                    name: "Jrej",
                    army: "rebels",
                    get armyStats() { return armies[this.army] },
                    units: ["OTTMK", "OTTMK", "OTTMK"],
                    minis: [],
                    startActions: 6,
                    turnActions: 6,
                    timeLeft: 1500,
                    //Army value would be calculated at the time of unit selection
                    //get armyValue() { return this.units.reduce((acc, value) => { return acc + this.armyStats.units[value]["cost"] }, 0) }
                },
                teamBlack: {
                    name: "Inkito",
                    army: "tabForces",
                    get armyStats() { return armies[this.army] },
                    units: ["STLRW", "STLRW", "STLRW"],
                    minis: [],
                    startActions: 6,
                    turnActions: 6,
                    timeLeft: 1500,
                    //Army value would be calculated at the time of unit selection
                    //get armyValue() { return this.units.reduce((acc, value) => { return acc + this.armyStats["units"][value]["cost"] }, 0) }
                }
            }
        },
        gameUpdate: {
            setCurrentPlayer: (currentPlayer) => {
                store.gameInfo.currentPlayer = currentPlayer;
            },
            log: (string) => {
                store.gameInfo.history.push(string);
            },
            addImportedMini: (mini, team) => {
                store.gameInfo.players[team].minis.push(mini);
            },
            removeTurnAction: (team) => {
                store.gameInfo.players[team].turnActions -= 1;
            },
            resetTurnActions: (team) => {
                store.gameInfo.players[team].turnActions = store.gameInfo.players[team].startActions;
            },
            removePlayerMini: (id, team) => {
                //Remove mini from mini array.
                //Remove 2 actions from start actions.
                store.gameInfo.players[team].minis = store.gameInfo.players[team].minis.filter(mini => mini.id !== id)
                store.gameInfo.players[team].startActions -= 2;
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
                            store.getUserTable();
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
                        if (response && response.openTables) {
                            runInAction(() => {
                                store.userTable = response.openTables.filter(table => table.player1 === store.userDetail.name)[0];
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })                
            }
        },
    }));
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export default StoreContext;
