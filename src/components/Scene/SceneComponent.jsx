import { Engine, Scene } from '@babylonjs/core';
import React, { useEffect, useRef, useState } from 'react';
import StoreContext from '../../store/AppStore';

export default (props) => {
    const store = React.useContext(StoreContext);
    const reactCanvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;
    const [loaded, setLoaded] = useState(false);
    const [scene, setScene] = useState(null);

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
    }, [scene]);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            const engine = new Engine(reactCanvas.current, true, { stencil: true });
            const scene = new Scene(engine, sceneOptions);
            setScene(scene);
            if (scene.isReady()) {
                props.onSceneReady(scene, store.gameInfo.players, store.gameUpdate)
            } else {
                scene.onReadyObservable.addOnce(scene => props.onSceneReady(scene, store.gameInfo.players, store.gameUpdate));
            }

            engine.runRenderLoop(() => {
                if (typeof onRender === 'function') {
                    onRender(scene);
                }
                scene.render();
            })
        }
        reactCanvas.current.onwheel = function(event){
            event.preventDefault();
        };
        
        reactCanvas.current.onmousewheel = function(event){
            event.preventDefault();
        };
        store.setCanvasHeight(reactCanvas.current.height);
        
        return () => {
            if (scene !== null) {
                scene.dispose();
            }
        }
    }, [loaded, sceneOptions, props, onRender, scene, store, store.gameInfo.players, store.gameUpdate])


    return (
        <canvas id="canvas" tabIndex="1" ref={reactCanvas} {...rest} />
    );
}