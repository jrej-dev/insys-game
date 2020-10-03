import { Engine, Scene } from '@babylonjs/core';
import React, { useEffect, useRef, useState } from 'react';
import StoreContext from '../../store/appstore';
import { toJS, autorun } from 'mobx';

export default (props) => {
    const store = React.useContext(StoreContext);
    const reactCanvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;
    const [loaded, setLoaded] = useState(false);
    const [scene, setScene] = useState(null);
    const tableId = new URLSearchParams(document.location.search).get('table');

    useEffect(() => {
        if (window) {
            const resize = () => {
                if (scene) {
                    scene.getEngine().resize();
                }
            }
            window.addEventListener('resize', resize);

            return () => {
                window.removeEventListener('resize', resize);
            }
        }
    }, [scene, store]);

    const setGame = (gameInfo, username) => {
        if (!loaded && gameInfo && username) {
            setLoaded(true);
            const engine = new Engine(reactCanvas.current, true, { stencil: true });
            const scene = new Scene(engine, sceneOptions);
            setScene(scene);
            if (scene.isReady()) {
                props.onSceneReady(scene, gameInfo, store.gameUpdate, username, store.socket)
            } else {
                scene.onReadyObservable.addOnce(scene => props.onSceneReady(scene, gameInfo, store.gameUpdate, username), store.socket);
            }

            engine.runRenderLoop(() => {
                if (typeof onRender === 'function') {
                    onRender(scene);
                }
                scene.render();
            })
        }
        reactCanvas.current.onwheel = function (event) {
            event.preventDefault();
        };

        reactCanvas.current.onmousewheel = function (event) {
            event.preventDefault();
        };
        store.setCanvasHeight(reactCanvas.current.height);
    }

    useEffect(() =>
        autorun((reaction) => {
            if (!toJS(store.gameInfo).players) {
                store.setGameInfo(tableId);
            }
            if (store.gameInfo && store.gameInfo.players && toJS(store.userDetail).name) {
                setGame(store.gameInfo, toJS(store.userDetail).name);
                reaction.dispose()
            }
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [store, tableId],
    )

    return (
        <canvas id="canvas" tabIndex="1" ref={reactCanvas} {...rest} />
    );
}