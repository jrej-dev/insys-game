import React from 'react';
import { useLocalStore } from 'mobx-react';
import { runInAction } from 'mobx';
import { armies } from '../gameStats/armies';

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

var api = new hivesigner.Client({
    app: 'insys-game',
    callbackURL: 'http://localhost:3000/insys-game',
    accessToken: 'access_token',
    scope: ['vote', 'posting'],
});

export function StoreProvider({ children }) {
    const store = useLocalStore(() => ({
        // State Variables
        userDetail: {},
        loginLink: "",
        fullScreen: false,
        toggleFullScreen: () => {
            store.fullScreen = !store.fullScreen;
        },
        gameInfo: {
            tableNumber: 1,
            currentPlayer: {
                get name() { return store.gameInfo.players[this.team].player },
                team: "teamWhite",
            },
            players: {
                teamWhite: {
                    player: "Jrej",
                    army: "rebels",
                    get armyStats() { return armies[this.army] },
                    units: ["OTTMK", "OTTMK", "OTTMK"],
                    minis: [],
                    startActions: 6,
                    turnActions: 6,
                    //Army value would be calculated at the time of unit selection
                    //get armyValue() { return this.units.reduce((acc, value) => { return acc + this.armyStats.units[value]["cost"] }, 0) }
                },
                teamBlack: {
                    player: "Inkito",
                    army: "tabForces",
                    get armyStats() { return armies[this.army] },
                    units: ["STLRW", "STLRW", "STLRW"],
                    minis: [],
                    startActions: 6,
                    turnActions: 6,
                    //Army value would be calculated at the time of unit selection
                    //get armyValue() { return this.units.reduce((acc, value) => { return acc + this.armyStats["units"][value]["cost"] }, 0) }
                }
            }
        },
        gameUpdate: {
            setCurrentPlayer: (currentPlayer) => {
                store.gameInfo.currentPlayer = currentPlayer;
            },
            addImportedMini : (mini, team) => {
                store.gameInfo.players[team].minis.push(mini);
            },
            removeTurnAction: (team) => {
                store.gameInfo.players[team].turnActions -= 1;
            },
            resetTurnActions : (team) => {
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
                        })
                    }
                    if (err) {
                        console.log(err);
                    }
                })
            }
        },
    }));
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export default StoreContext;