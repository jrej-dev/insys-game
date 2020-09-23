import React from 'react';
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D';
import { CustomMaterial } from '@babylonjs/materials';
import SceneComponent from './SceneComponent';

BABYLON.Animation.AllowMatricesInterpolation = true;

var publicURL = "";
if (process.env.NODE_ENV === "development") {
  publicURL = process.env.PUBLIC_URL;
}

const onSceneReady = (scene, gameInfo, gameUpdate, username, socket) => {
  const canvas = scene.getEngine().getRenderingCanvas();
  var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    "sceneUI"
  );

  advancedTexture.isForeground = true;
  var camera = new BABYLON.ArcRotateCamera("arcCamera",
    BABYLON.Tools.ToRadians(0),
    BABYLON.Tools.ToRadians(100),
    900, new BABYLON.Vector3(-60, 300, 0), scene
  );

  const user = {
    name: username,
    team: gameInfo.players.teamWhite.name === username ? "teamWhite" : "teamBlack"
  }

  var currentPlayer = {
    get team() { return gameInfo.currentPlayer.team },
    get name() { return gameInfo.players[this.team].name },
    get army() { return gameInfo.players[this.team].armyStats },
    get startActions() { return gameInfo.players[this.team].startActions },
    get turnActions() { return gameInfo.players[this.team].turnActions },
  };

  var enemyPlayer = {
    get team() { return gameInfo.currentPlayer.team === "teamWhite" ? "teamBlack" : "teamWhite" },
    get name() { return gameInfo.players[gameInfo.currentPlayer.team === "teamWhite" ? "teamBlack" : "teamWhite"].name },
    get army() { return gameInfo.players[gameInfo.currentPlayer.team === "teamWhite" ? "teamBlack" : "teamWhite"].armyStats }
  }

  //Setting up camera         
  camera.attachControl(canvas, true);
  camera.angularsensibility *= -1;
  camera.checkCollisions = true;
  camera.ellipsoid = new BABYLON.Vector3(1.5, 1, 1.5);

  if (user.team === "teamBlack") {
    camera.position = new BABYLON.Vector3(-900, 300, 0);
  } else {
    camera.position = new BABYLON.Vector3(900, 300, 0);
  }

  //Setting lights and shadows
  var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(75, 400, 150), scene);
  light.intensity = 0.5;
  light.range = 5000;

  var light2 = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 100, 0), scene);
  light2.intensity = 0.3;

  var light3 = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, -500, 0), scene);
  //Colored backlight => 
  light3.diffuse = new BABYLON.Color3(0.3, 0.2, 0.5);
  light3.intensity = 1;

  var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
  shadowGenerator.useExponentialShadowMap = false;
  //shadowGenerator.usePoissonSampling = true;

  var hl = new BABYLON.HighlightLayer("hl1", scene);
  hl.innerGlow = false;

  scene.autoClear = false; // Color buffer
  scene.autoClearDepthAndStencil = false; // Depth and stencil, obviously
  
  //Materials;
  var invisibleMaterial = new BABYLON.StandardMaterial("invisibleMaterial", scene);
  invisibleMaterial.alpha = 0;

  var transparentMaterial = new BABYLON.StandardMaterial("transparentMaterial", scene);
  transparentMaterial.alpha = 0.5;

  var skybox = BABYLON.MeshBuilder.CreateSphere("skyBox", { diameter: 5500, diameterX: 5500 }, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skybox.material = skyboxMaterial;
  skybox.receiveShadows = true;

  var background = BABYLON.MeshBuilder.CreateCylinder("background", { height: 1, diameter: 5000, tessellation: 5000 }, scene);
  var backgroundMaterial = new BABYLON.StandardMaterial("background", scene);
  backgroundMaterial.opacityTexture = new BABYLON.Texture(`${publicURL}/Textures/OpacityTemplate.png`, scene);
  backgroundMaterial.backFaceCulling = false;
  background.material = backgroundMaterial;
  background.translate(BABYLON.Axis.Y, -51, scene);
  background.visibility = 0.4;
  background.receiveShadows = true;

  var boardMaterial = new BABYLON.StandardMaterial("boardMaterial", scene);
  //Wood board
  boardMaterial.diffuseTexture = new BABYLON.Texture(`${publicURL}/Textures/Wood/Wood_021_basecolor.jpg`, scene);
  //boardMaterial.bumpTexture = new BABYLON.Texture(`${publicURL}/Textures/Wood/Wood_021_normal.jpg`, scene);
  //boardMaterial.ambientTexture = new BABYLON.Texture(`${publicURL}/Textures/Wood/Wood_021_ambientOcclusion.jpg`, scene);

  //Paper board
  var paperMaterial = new BABYLON.StandardMaterial("paperMaterial", scene);
  paperMaterial.diffuseTexture = new BABYLON.Texture(`${publicURL}/Textures/Paper/paper001_3K_Color.png`, scene);
  //paperMaterial.bumpTexture = new BABYLON.Texture(`${publicURL}/Textures/Paper/paper001_3K_norm.png`, scene);
  //paperMaterial.ambientTexture = new BABYLON.Texture(`${publicURL}/Textures/Paper/paper001_3K_roughness.png`, scene);

  //Asphalt ground
  var asphaltMaterial = new BABYLON.StandardMaterial("asphaltMaterial", scene);
  asphaltMaterial.diffuseTexture = new BABYLON.Texture(`${publicURL}/Textures/Asphalt/Asphalt_001_COLOR.jpg`, scene);
  //asphaltMaterial.bumpTexture = new BABYLON.Texture(`${publicURL}/Textures/Asphalt/Asphalt_001_NRM.jpg`, scene);
  //asphaltMaterial.specularTexture = new BABYLON.Texture(`${publicURL}/Textures/Asphalt/Asphalt_001_SPEC.jpg`, scene);
  //asphaltMaterial.ambientTexture = new BABYLON.Texture(`${publicURL}/Textures/Asphalt/Asphalt_001_OCC.jpg`, scene);


  //Grass ground
  var grassMaterial = new BABYLON.StandardMaterial("grassMaterial", scene);
  grassMaterial.diffuseTexture = new BABYLON.Texture(`${publicURL}/Textures/Grass/Ground037_2K_Color.jpg`, scene);
  //grassMaterial.bumpTexture = new BABYLON.Texture(`${publicURL}/Textures/Grass/Ground037_2K_Normal.jpg`, scene);
  //grassMaterial.specularTexture = new BABYLON.Texture(`${publicURL}/Textures/Grass/Ground037_2K_Roughness.jpg`, scene);
  //grassMaterial.ambientTexture = new BABYLON.Texture(`${publicURL}/Textures/Grass/Ground037_2K_AmbientOcclusion.jpg`, scene);
  //grassMaterial.bumpTexture.level = 1;


  var miniMaterial = new BABYLON.StandardMaterial("plasticMaterial", scene);
  miniMaterial.diffuseColor = new BABYLON.Color3(220 / 255, 220 / 255, 220 / 255);

  var tokenMaterialBlack = new BABYLON.StandardMaterial("tokenMaterial", scene);
  tokenMaterialBlack.diffuseTexture = new BABYLON.Texture(`${publicURL}/Textures/Token/Coin_low_Coin_material_BaseColor2.png`, scene);
  tokenMaterialBlack.bumpTexture = new BABYLON.Texture(`${publicURL}/Textures/Token/Coin_low_Coin_material_Normal.png`, scene);

  var tokenMaterialWhite = new BABYLON.StandardMaterial("tokenMaterial", scene);
  tokenMaterialWhite.diffuseTexture = new BABYLON.Texture(`${publicURL}/Textures/Token/Coin_low_Coin_material_BaseColor.png`, scene);
  tokenMaterialWhite.bumpTexture = new BABYLON.Texture(`${publicURL}/Textures/Token/Coin_low_Coin_material_Normal.png`, scene);

  var baseMaterialBlack = new BABYLON.StandardMaterial("baseMaterial", scene);
  baseMaterialBlack.diffuseColor = new BABYLON.Color3.Black();

  var baseMaterialWhite = new BABYLON.StandardMaterial("baseMaterial", scene);
  baseMaterialWhite.diffuseColor = new BABYLON.Color3.White();

  var diceMatWhite = new BABYLON.StandardMaterial("diceMatWhite", scene);
  diceMatWhite.diffuseColor = new BABYLON.Color3.White();

  var diceMatBlack = new BABYLON.StandardMaterial("diceMatBlack", scene);
  //diceMatBlack.diffuseColor = new BABYLON.Color3(55 / 255, 71 / 255, 79 / 255);
  diceMatBlack.diffuseColor = new BABYLON.Color3.Black();

  var diceMatRed = new BABYLON.StandardMaterial("diceMatRed", scene);
  diceMatRed.diffuseColor = new BABYLON.Color3(164 / 255, 27 / 255, 7 / 255);

  var gameAreaTemplate = 'if( vPositionW.z  < -300.){ discard; } if( vPositionW.z  > 300.){ discard; } if( vPositionW.x  > 475.){ discard; } if( vPositionW.x  < -475.){ discard; }';

  var moveAreaMat = new CustomMaterial("moveAreaMat", scene);
  moveAreaMat.alpha = 0.25;
  moveAreaMat.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightTransparency = 0.25;

  var lineOfSightMatW = new CustomMaterial("losMatSW", scene);
  lineOfSightMatW.alpha = lineOfSightTransparency;
  lineOfSightMatW.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightMMatW = new CustomMaterial("losMatMW", scene);
  lineOfSightMMatW.alpha = lineOfSightTransparency;
  lineOfSightMMatW.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightLMatW = new CustomMaterial("losMatLW", scene);
  lineOfSightLMatW.alpha = lineOfSightTransparency;
  lineOfSightLMatW.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightXLMatW = new CustomMaterial("losMatXLW", scene);
  lineOfSightXLMatW.alpha = lineOfSightTransparency;
  lineOfSightXLMatW.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightMatB = new CustomMaterial("losMatSB", scene);
  lineOfSightMatB.alpha = lineOfSightTransparency;
  lineOfSightMatB.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightMMatB = new CustomMaterial("losMatMB", scene);
  lineOfSightMMatB.alpha = lineOfSightTransparency;
  lineOfSightMMatB.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightLMatB = new CustomMaterial("losMatLB", scene);
  lineOfSightLMatB.alpha = lineOfSightTransparency;
  lineOfSightLMatB.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightXLMatB = new CustomMaterial("losMatXLB", scene);
  lineOfSightXLMatB.alpha = lineOfSightTransparency;
  lineOfSightXLMatB.Fragment_Custom_Diffuse(gameAreaTemplate);

  //Action managers  
  var mapActionManager = new BABYLON.ActionManager(scene);
  var moveActionManager = new BABYLON.ActionManager(scene);
  var teamBlackActionManager = new BABYLON.ActionManager(scene);
  var teamWhiteActionManager = new BABYLON.ActionManager(scene);

  var board;
  var map;
  BABYLON.SceneLoader.ImportMesh(
    "",
    `${publicURL}/Models/`,
    "setting.babylon",
    scene,
    function (newMeshes) {
      board = newMeshes[0];
      board.position = new BABYLON.Vector3(0, -30, 0)
      board.scaling = new BABYLON.Vector3(1380, 1225, 1000);
      board.material = boardMaterial;
      shadowGenerator.getShadowMap().renderList.push(board);

      let box = BABYLON.MeshBuilder.CreateBox("box", { width: 950, height: 600, depth: 49 }, scene);
      box.material = paperMaterial;
      box.receiveShadows = true;
      box.position = new BABYLON.Vector3(0, 0, 0);
      box.rotate(BABYLON.Axis.X, BABYLON.Tools.ToRadians(90), scene);

      let bottom = BABYLON.MeshBuilder.CreateBox("bottom", { width: 970, height: 620, depth: 2 }, scene);
      bottom.rotate(BABYLON.Axis.X, BABYLON.Tools.ToRadians(90), scene);
      bottom.position = new BABYLON.Vector3(0, -50, 0);
      bottom.material = paperMaterial;
      bottom.translate(BABYLON.Axis.Y, 25, scene);

      map = BABYLON.MeshBuilder.CreateBox("map", { width: 950, height: 600, depth: 1 }, scene);
      map.rotate(BABYLON.Axis.X, BABYLON.Tools.ToRadians(90), scene);
      map.position = new BABYLON.Vector3(0, 0, 0);
      map.material = asphaltMaterial;
      map.receiveShadows = true;
      map.translate(BABYLON.Axis.Y, 25, scene);
      map.actionManager = mapActionManager;
    }
  );
  //small board is 24 inch to 38 inch; (600x950)
  //medium board is 32 inch to 48 inch; (800x1200)
  //large board is 48 inch to 48 inch; (1200x1200)

  var actionToken;
  const importActionTokens = () => {
    BABYLON.SceneLoader.ImportMesh(
      "",
      `${publicURL}/Models/`,
      "token.babylon",
      scene,
      function (newMeshes) {
        actionToken = BABYLON.Mesh.MergeMeshes(newMeshes);
        actionToken.position = new BABYLON.Vector3(150, -68, 440);
        actionToken.scaling = new BABYLON.Vector3(800, 900, 800);
        actionToken.name = "token"
        actionToken.id = "token1"
        actionToken.material = currentPlayer.team === "teamWhite" ? tokenMaterialWhite : tokenMaterialBlack;

        var dx = actionToken.position.x;
        var NB_CLONES = currentPlayer.turnActions - 1;
        var actionClone;
        for (var nbclone = 0; nbclone < NB_CLONES; nbclone++) {
          actionClone = actionToken.clone(`token${nbclone + 2}`);
          actionClone.name = "token";
          let randomX = Math.floor(Math.random() * 40) + 50;
          actionClone.position.x = dx - randomX;
          actionClone.position.z = actionToken.position.z + Math.floor(Math.random() * 30) - 15;
          dx = dx - randomX;
        };
      }
    );
  }
  importActionTokens();

  var dice1;
  var dice2;
  var dice3;
  var dice4;
  var dice5;
  var dice6;
  var dice = [];
  BABYLON.SceneLoader.ImportMesh(
    "",
    `${publicURL}/Models/`,
    "dice.babylon",
    scene,
    function (newMeshes) {
      dice1 = BABYLON.Mesh.MergeMeshes(newMeshes);
      dice1.scaling = new BABYLON.Vector3(20, 20, 20);
      dice1.translate(BABYLON.Axis.Y, 32, scene);
      dice1.translate(BABYLON.Axis.X, 175, scene);
      dice1.translate(BABYLON.Axis.Z, 0, scene);
      dice1.id = "dice1";
      dice1.name = "dice";
      dice1.setEnabled(false);

      dice2 = dice1.clone("dice");
      dice2.id = "dice2";
      dice2.rotation.x = BABYLON.Tools.ToRadians(180);
      dice2.rotation.z = BABYLON.Tools.ToRadians(90);
      dice2.setEnabled(false);

      dice3 = dice1.clone("dice");
      dice3.id = "dice3";
      dice3.rotation.y = BABYLON.Tools.ToRadians(90);
      dice3.rotation.x = BABYLON.Tools.ToRadians(180);
      dice3.setEnabled(false);

      dice4 = dice1.clone("dice");
      dice4.id = "dice4";
      dice4.rotation.x = BABYLON.Tools.ToRadians(-90);
      dice4.setEnabled(false);

      dice5 = dice1.clone("dice");
      dice5.id = "dice5";
      dice5.rotation.z = BABYLON.Tools.ToRadians(90);
      dice5.rotation.y = BABYLON.Tools.ToRadians(180);
      dice5.setEnabled(false);

      dice6 = dice1.clone("dice");
      dice6.id = "dice6";
      dice6.rotation.y = BABYLON.Tools.ToRadians(90);
      dice6.rotation.x = BABYLON.Tools.ToRadians(90);
      dice6.setEnabled(false);

      shadowGenerator.getShadowMap().renderList.push(dice1, dice2, dice3, dice4, dice5, dice6);
      dice.push(dice1, dice2, dice3, dice4, dice5, dice6);
    }
  );

  var miniWidth = 25.25;

  var LOS = BABYLON.MeshBuilder.CreateCylinder("lineOfSights", { height: 0.1, diameter: 202 * 2 + miniWidth, tessellation: 256 }, scene);
  LOS.position = new BABYLON.Vector3(0, -100, 0);
  var LOSM = BABYLON.MeshBuilder.CreateCylinder("lineOfSightm", { height: 0.1, diameter: 404 * 2 + miniWidth, tessellation: 256 }, scene);
  var LOSL = BABYLON.MeshBuilder.CreateCylinder("lineOfSightl", { height: 0.1, diameter: 808 * 2 + miniWidth, tessellation: 256 }, scene);
  //var LOSXL = BABYLON.MeshBuilder.CreateCylinder("lineOfSight", { height: 0.1, diameter: 2424 + miniWidth, tessellation: 256 }, scene);
  /*LOSXL.parent =*/ LOSL.parent = LOSM.parent = LOS;

  var los = BABYLON.CSG.FromMesh(LOS);
  var losM = BABYLON.CSG.FromMesh(LOSM);
  var losL = BABYLON.CSG.FromMesh(LOSL);
  //var losXL = BABYLON.CSG.FromMesh(LOSXL);

  var slicer = BABYLON.MeshBuilder.CreateBox("LOSTemplate", { width: 2424, height: 2500, depth: 1 }, scene);
  slicer.rotate(BABYLON.Axis.X, BABYLON.Tools.ToRadians(90), scene);
  slicer.position = new BABYLON.Vector3(1212, -100, 0);
  slicer.visibility = 0;
  var slicerCSG = BABYLON.CSG.FromMesh(slicer);

  //losXL = losXL.subtract(slicerCSG).subtract(losL).subtract(losM).subtract(los);

  losL = losL.subtract(slicerCSG).subtract(losM).subtract(los);

  losM = losM.subtract(slicerCSG).subtract(los);

  los = los.subtract(slicerCSG);

  var lineOfSight = los.toMesh("lineOfSightS");
  var lineOfSightM = losM.toMesh("lineOfSightM");
  var lineOfSightL = losL.toMesh("lineOfSightL");
  //var lineOfSightXL = losXL.toMesh("lineOfSight");

  /*lineOfSightXL.parent =*/ lineOfSightL.parent = lineOfSightM.parent = lineOfSight;
  /*lineOfSightXL.isPickable =*/ lineOfSightL.isPickable = lineOfSightM.isPickable = lineOfSight.isPickable = false;

  lineOfSight.setEnabled(false);
  slicer.dispose();
  LOS.dispose();
  LOSM.dispose();
  LOSL.dispose();
  //LOSXL.dispose();


  const getLosColor = (unit, team, range) => {
    var losColorBad = new BABYLON.Color3(164 / 255, 27 / 255, 7 / 255); //red
    var losColorMalus = new BABYLON.Color3(215 / 255, 195 / 255, 58 / 255); //yellow
    var losColorZero = new BABYLON.Color3(7 / 255, 66 / 255, 164 / 255); //blue
    var losColorBonus = new BABYLON.Color3(7 / 255, 164 / 255, 27 / 255); //green

    if (gameInfo.players[team].armyStats.units[unit].range.mods[range] > 0) {
      return losColorBonus;
    } else if (gameInfo.players[team].armyStats.units[unit].range.mods[range] === 0) {
      return losColorZero;
    } else if (gameInfo.players[team].armyStats.units[unit].range.mods[range] === -1) {
      return losColorMalus;
    } else if (gameInfo.players[team].armyStats.units[unit].range.mods[range] <= -2) {
      return losColorBad;
    }
  }

  const getHeight = (mesh) => {
    return Math.abs(mesh.getBoundingInfo().boundingBox.extendSize.y * 2 * mesh.scaling.y);
  };

  const getWidth = (mesh) => {
    return Math.abs(mesh.getBoundingInfo().boundingBox.extendSize.x * 2 * mesh.scaling.x);
  };

  const getLength = (mesh) => {
    return Math.abs(mesh.getBoundingInfo().boundingBox.extendSize.z * 2 * mesh.scaling.z);
  };

  const getControlByName = (name) => {
    return advancedTexture._rootContainer._children.filter(control => control.name === name)[0]
  }

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  var shield;
  BABYLON.SceneLoader.ImportMesh(
    "",
    `${publicURL}/Models/`,
    "shield.babylon",
    scene,
    function (newMeshes) {
      shield = BABYLON.Mesh.MergeMeshes(newMeshes);
      shield.scaling = new BABYLON.Vector3(6, 5, 10);
      shield.translate(BABYLON.Axis.Y, 80, scene);
      shadowGenerator.getShadowMap().renderList.push(shield);
      shield.id = "shield";
      shield.name = "shield";

      shield.setEnabled(false);
    }
  );

  const createBase = (mini, team) => {
    let base = BABYLON.MeshBuilder.CreateCylinder(`${mini.id}Base`, { height: 2.5, diameter: 27, tessellation: 128 }, scene);
    base.material = new BABYLON.StandardMaterial(`baseMaterial${mini.id}`, scene);
    base.material.diffuseColor = team === "Black" ? new BABYLON.Color3.Black() : new BABYLON.Color3.White();
    base.position = new BABYLON.Vector3(0, 1.5, 0);
    base.parent = mini;
    return base;
  };

  const createLOS = (mini, team) => {
    var miniLOS = lineOfSight.clone();
    miniLOS.id = `${mini.id}lineOfSight`;
    miniLOS.name = `${mini.id}lineOfSight`;
    miniLOS.parent = mini;
    miniLOS.position = new BABYLON.Vector3(0, 3, 0);
    miniLOS.rotation.y = BABYLON.Tools.ToRadians(-90);
    miniLOS.setEnabled(false);
    miniLOS.material = team === "Black" ? lineOfSightMatB : lineOfSightMatW;
    miniLOS._children[0].material = team === "Black" ? lineOfSightMMatB : lineOfSightMMatW;
    miniLOS._children[1].material = team === "Black" ? lineOfSightLMatB : lineOfSightLMatW;
    //miniLOS._children[2].material = team === "Black" ? lineOfSightXLMatB : lineOfSightXLMatW;
    if (team === "Black") {
      mini.losMat = [lineOfSightMatB.name, lineOfSightMMatB.name, lineOfSightLMatB.name, lineOfSightXLMatB.name]
      lineOfSightMatB.diffuseColor = getLosColor(mini.unit, `team${team}`, "s"); //blue
      lineOfSightMMatB.diffuseColor = getLosColor(mini.unit, `team${team}`, "m"); //green
      lineOfSightLMatB.diffuseColor = getLosColor(mini.unit, `team${team}`, "l"); //yellow
      //lineOfSightXLMatB.diffuseColor = getLosColor(mini.unit, `team${team}`, "xl"); //yellow  
    } else {
      mini.losMat = [lineOfSightMatW.name, lineOfSightMMatW.name, lineOfSightLMatW.name, lineOfSightXLMatW.name]
      lineOfSightMatW.diffuseColor = getLosColor(mini.unit, `team${team}`, "s"); //blue
      lineOfSightMMatW.diffuseColor = getLosColor(mini.unit, `team${team}`, "m"); //green
      lineOfSightLMatW.diffuseColor = getLosColor(mini.unit, `team${team}`, "l"); //yellow
      //lineOfSightXLMatW.diffuseColor = getLosColor(mini.unit, `team${team}`, "xl"); //yellow
    }
    return miniLOS;
  };

  const createShield = (mini, team) => {
    let miniShield = shield.clone(`${mini.id}shield`);
    miniShield.material = new BABYLON.StandardMaterial(`shieldMaterial${mini.id}`, scene);
    miniShield.material.diffuseColor = team === "Black" ? new BABYLON.Color3.Black() : new BABYLON.Color3.White();
    miniShield.parent = mini;
    miniShield.position = new BABYLON.Vector3(0, 55, 0);
    miniShield.setEnabled(false);
    return miniShield;
  }
  var clonedMini;

  const createMoveArea = (mini) => {
    var moveArea = BABYLON.MeshBuilder.CreateCylinder(`${mini.id}moveArea`, { height: 0.25, diameter: miniWidth * 8, tessellation: 256 }, scene);
    moveArea.material = invisibleMaterial;
    moveArea.actionManager = moveActionManager;
    moveArea.setEnabled(false);
    moveArea.parent = mini;
    moveArea.position = new BABYLON.Vector3(0, 1, 0);


    var moveArea2 = BABYLON.MeshBuilder.CreateCylinder(`${mini.id}moveArea2`, { height: 0.25, diameter: miniWidth * 8 + miniWidth, tessellation: 256 }, scene);
    moveArea2.material = moveAreaMat;
    moveArea2.parent = moveArea;
  }

  var targetFurthestMini = (team) => {
    if (gameInfo.players[team].minis && gameInfo.players[team].minis.length > 0) {
      var miniPosition = gameInfo.players[team].minis.map(mini => mini.position.x);
      var furthestMiniIndex = team === "teamWhite" ? miniPosition.indexOf(Math.min(...miniPosition)) : miniPosition.indexOf(Math.max(...miniPosition));
      var furthestMini = gameInfo.players[team].minis[furthestMiniIndex];
      var furthestTarget = BABYLON.Mesh.CreateSphere("targetSphere", { size: 10 }, scene);
      furthestTarget.setEnabled(false);
      furthestTarget.position = new BABYLON.Vector3(furthestMini.position.x, furthestMini.position.y + 30, 0);
      camera.setTarget(furthestTarget);
      setTimeout(() => {
        furthestTarget.dispose();
      }, 1100)
    } else if (map) {
      camera.setTarget(map);
    }
  };

  const importMiniModel = (miniUnit, team, index, miniData) => {
    BABYLON.SceneLoader.ImportMesh(
      "",
      `${publicURL}/Models/`,
      `${miniUnit}.babylon`,
      scene,
      function (newMeshes) {
        let mini = BABYLON.Mesh.MergeMeshes(newMeshes);
        mini.team = `team${team}`;
        if (miniData) {
          mini.position = new BABYLON.Vector3(miniData.position.x, miniData.position.y, miniData.position.z);
          mini.rotation = new BABYLON.Vector3(miniData.rotation.x, miniData.rotation.y, miniData.rotation.z);
          mini.id = miniData.id;
          mini.name = miniData.name;
          if (miniData.name === "decor") {
            mini.isPickable = false;
          }
        } else {
          mini.translate(BABYLON.Axis.Y, 25, scene);
          mini.translate(BABYLON.Axis.X, team === "Black" ? -400 : 400, scene);
          mini.translate(BABYLON.Axis.Z, -200 + 200 * index, scene);
          mini.rotation.y = team === "Black" ? BABYLON.Tools.ToRadians(-90) : BABYLON.Tools.ToRadians(90);
          mini.id = `${team.toLowerCase()}Mini${index + 1}`;
          mini.name = gameInfo.players[mini.team].armyStats.units[miniUnit].name;
        }
        mini.unit = miniUnit;
        mini.class = gameInfo.players[mini.team].armyStats.units[miniUnit].class;
        mini.material = miniMaterial;
        mini.actionManager = team === "Black" ? teamBlackActionManager : teamWhiteActionManager;
        mini.enablePointerMoveEvents = true;

        mini.width = getWidth(mini);
        mini.height = getHeight(mini);

        createBase(mini, team);
        createLOS(mini, team);
        createShield(mini, team);
        createMoveArea(mini);
        //createTextPlane(mini);

        shadowGenerator.getShadowMap().renderList.push(mini);
        gameUpdate.addImportedMini(mini, `team${team}`, miniData);

        if (user.team === "teamWhite" && gameInfo.players.teamWhite.minis && gameInfo.players.teamWhite.minis.length > 0) {
          targetFurthestMini("teamWhite");
        } else if (user.team === "teamBlack" && gameInfo.players.teamBlack.minis && gameInfo.players.teamBlack.minis.length > 0) {
          targetFurthestMini("teamBlack");
        } else if (map) {
          camera.setTarget(map);
        }
      }
    );
  }

  const importAllModels = () => {
    if (gameInfo.players.teamBlack.miniData.length > 0) {
      gameInfo.players.teamBlack.miniData.forEach((mini, index) => importMiniModel(mini.unit, "Black", index, mini))
    } else {
      gameInfo.players.teamBlack.units.forEach((miniName, index) => importMiniModel(miniName, "Black", index))
    }
    if (gameInfo.players.teamWhite.miniData.length > 0) {
      gameInfo.players.teamWhite.miniData.forEach((mini, index) => importMiniModel(mini.unit, "White", index, mini))
    } else {
      gameInfo.players.teamWhite.units.forEach((miniName, index) => importMiniModel(miniName, "White", index))
    }
  }
  importAllModels();

  var obstacles = [];
  var ladders = [];
  BABYLON.SceneLoader.ImportMesh(
    "",
    `${publicURL}/Models/Terrain/`,
    "suburbia_map.babylon",
    scene,
    function (newMeshes) {
      newMeshes.forEach(mesh => {
        mesh.translate(BABYLON.Axis.Y, 26, scene);
        mesh.width = getWidth(mesh);
        mesh.length = getLength(mesh);
        mesh.height = getHeight(mesh);
        mesh.freezeWorldMatrix();
        mesh.material.freeze();
        mesh.doNotSyncBoundingInfo = true;
        //mesh.convertToUnIndexedMesh();
        if (mesh.id.includes("grass")) {
          mesh.dispose();
        } else if (mesh.id.includes("ladder")) {
          ladders.push(mesh)
        } else if (!mesh.id.includes("decor")) {
          obstacles.push(mesh);
          mesh.name = "obstacle";
          shadowGenerator.getShadowMap().renderList.push(mesh);
          mesh.receiveShadows = true;
        }
      })
      /*var container = BABYLON.Mesh.MergeMeshes(newMeshes);

      //container.material = diceMaterial;
      container.scaling = new BABYLON.Vector3(2, 2, 2);
      container.id = "obstacle1";
      container.name = "obstacle";
      container.receiveShadows = true;
      container.width = getWidth(container);
      container.length = getLength(container);
      container.height = getHeight(container);
  
      var redMat = new BABYLON.StandardMaterial(scene);
      redMat.diffuseColor = new BABYLON.Color3(0.518, 0.271, 0.267);
    
      var greyMat = new BABYLON.StandardMaterial(scene);
      greyMat.diffuseColor = new BABYLON.Color3(0.671, 0.663, 0.733);
  
      var greenMat = new BABYLON.StandardMaterial(scene);
      greenMat.diffuseColor = new BABYLON.Color3(0.318, 0.502, 0.43);
  
      var container0 = container.clone("obstacle")
      container0.position = new BABYLON.Vector3(22, 0, 2.5);
      var container2 = container.clone("obstacle")
      container2.position = new BABYLON.Vector3(-22, 0, 2.5);
  
      var container02 = BABYLON.Mesh.MergeMeshes([container0, container2]);
      container02.material = redMat;
      container02.name = container02.id = "obstacle";
      container02.position = new BABYLON.Vector3(180, 50, 125);
      container0.dispose();
      container2.dispose();
  
      var container3 = container.clone("obstacle")
      container3.position = new BABYLON.Vector3(100, 50, -125);
      container3.material = redMat;
  
      var container4 = container.clone("obstacle")
      container4.position = new BABYLON.Vector3(150, 50, -125);
  
      var container5 = container.clone("obstacle")
      container5.position = new BABYLON.Vector3(-100, 50, 125);
  
      var container6 = container.clone("obstacle")
      container6.position = new BABYLON.Vector3(-150, 50, 125);
      container6.material = redMat;
  
      var container7 = container.clone("obstacle")
      container7.position = new BABYLON.Vector3(22, 0, 2.5);
  
      var container8 = container.clone("obstacle")
      container8.position = new BABYLON.Vector3(-22, 0, 2.5);
  
      var container78 = BABYLON.Mesh.MergeMeshes([container7, container8]);
      container78.material = greenMat;
      container78.name = container78.id = "obstacle";
      container78.position = new BABYLON.Vector3(-180, 50, -125);
      container7.dispose();
      container8.dispose();
  
      var container9 = container.clone("obstacle")
      container9.position = new BABYLON.Vector3(-180, 100, -150);
      container9.scaling.z = 1;
  
      var container10 = container.clone("obstacle")
      container10.position = new BABYLON.Vector3(180, 100, 100);
      container10.scaling.z = 1;
      container10.material = greyMat;
  
      var container11 = container.clone("obstacle")
      container11.position = new BABYLON.Vector3(250, 38, 150);
      container11.scaling.z = 1;
      container11.scaling.y = 1;
      container11.material = greenMat;
  
      var container12 = container.clone("obstacle")
      container12.position = new BABYLON.Vector3(-250, 38, -100);
      container12.scaling.z = 1;
      container12.scaling.y = 1;
      container12.material = redMat;
  
      shadowGenerator.getShadowMap().renderList.push(container02, container3, container4, container5, container6, container78, container9, container10, container11, container12);
      obstacles.push(container02, container3, container4, container5, container6, container78, container9, container10, container11, container12);
  
      container.setEnabled(false);*/
    }
  );

  //Should import action tokens after switching Player
  var switchPlayer = () => {
    if (currentPlayer.team === "teamWhite") {
      gameUpdate.setCurrentPlayer({ name: enemyPlayer.name, team: "teamBlack" });
      //camera.position = new BABYLON.Vector3(-700, 300, 0);
      //targetFurthestMini(currentPlayer.team);
    } else if (currentPlayer.team === "teamBlack") {
      gameUpdate.setCurrentPlayer({ name: enemyPlayer.name, team: "teamWhite" });
      //camera.position = new BABYLON.Vector3(700, 300, 0);
      //targetFurthestMini(currentPlayer.team);
    }
  };

  //Mini selected by player1;
  var selected = "";
  var targets = [];
  var inAttack = false;
  var rotate = false;
  var previous = {
    position: null,
    rotation: null
  };

  const fragmentMesh = (mini, mesh, obstacle) => {
    if (obstacle && obstacle.name.includes("obstacle")) {
      let obstacleTemplateArea = `if( vPositionW.z < ${Math.round(obstacle.position.z - getLength(obstacle) / 2)}.){ discard; } if( vPositionW.z  > ${Math.round(obstacle.position.z + getLength(obstacle) / 2)}.){ discard; } if( vPositionW.x  > ${Math.round(obstacle.position.x + getWidth(obstacle) / 2)}.){ discard; } if( vPositionW.x  < ${Math.round(obstacle.position.x - getWidth(obstacle) / 2)}.){ discard; }`;
      let highMat = new CustomMaterial("highMat", scene);
      highMat.alpha = 0.25;
      highMat.Fragment_Custom_Diffuse(obstacleTemplateArea);
      mesh.material = highMat;
      if (mesh.id.includes("lineOfSight")) {
        highMat.diffuseColor = scene.getMaterialByName(mini.losMat[0]).diffuseColor;
        mesh._children.forEach((los, index) => {
          los.material = new CustomMaterial(`highMat${index}`, scene);
          los.material.alpha = 0.25;
          los.material.Fragment_Custom_Diffuse(obstacleTemplateArea);
          los.material.diffuseColor = scene.getMaterialByName(mini.losMat[index + 1]).diffuseColor;
        });
      }
    } else {
      if (mesh.id.includes("lineOfSight")) {
        lineOfSight.material = scene.getMaterialByName(mini.losMat[0]);
        lineOfSight._children.forEach((los, index) => los.material = scene.getMaterialByName(mini.losMat[index + 1]));
      } else if (mesh.id.includes("moveArea")) {
        mesh.material = invisibleMaterial;
      }
    };
  }

  const showMoveArea = (mini) => {
    let moveArea = scene.getMeshByName(`${mini.id}moveArea`);
    let moveArea2 = scene.getMeshByName(`${mini.id}moveArea2`);
    //if miniature is higher up lower moveArea to the ground
    if (whatIsUnderneath(mini) && whatIsUnderneath(mini)[0].name.includes("obstacle")) {
      //should be highest obstacle underneath
      let heightArray = whatIsUnderneath(mini).map(obstacle => getHeight(obstacle)/2 + obstacle.position.y - 26);
      let highestHeight = Math.max(...heightArray);
      moveArea.position.y = 3 - highestHeight;
    } else {
      //overwise keep it at ground level;
      moveArea.position.y = 1;
    }
    //display moveArea
    moveArea.setEnabled(true);

    //Go through obstacles 
    obstacles.forEach(obstacle => {
      if (isAccessible(mini, obstacle)) {
        //clone movearea and fragment to obstacle. Fragment function here
        if (scene.getMeshByName(`${obstacle.id}moveArea`)){
          scene.getMeshByName(`${obstacle.id}moveArea`).dispose();
        } else {
          moveArea2.clone(`${obstacle.id}moveArea`);
          let distanceToTop = (obstacle.position.y + getHeight(obstacle) / 2 - 24)
          scene.getMeshByName(`${obstacle.id}moveArea`).translate(BABYLON.Axis.Y, distanceToTop, scene);
          fragmentMesh(selected, scene.getMeshByName(`${obstacle.id}moveArea`), obstacle);
        }
      }
    })
  }

  const hideMoveArea = (mini) => {
    let moveArea = scene.getMeshByName(`${mini.id}moveArea`);
    moveArea.setEnabled(false);
    //disposeGroundMesh(mini, moveArea)
    obstacles.forEach(obstacle => {
      if (scene.getMeshByName(`${obstacle.id}moveArea`)) {
        scene.getMeshByName(`${obstacle.id}moveArea`).dispose();
      }
    })
  }

  const showLineOfSight = (mini) => {
    let lineOfSight = scene.getMeshByName(`${mini.id}lineOfSight`);
    createGroundMesh(mini, lineOfSight);
    if (whatIsUnderneath(mini) && whatIsUnderneath(mini)[0]) {
      fragmentMesh(mini, lineOfSight, whatIsUnderneath(mini)[0]);
    }
    lineOfSight.setEnabled(true);
  }

  const hideLineOfSight = (mini) => {
    let lineOfSight = scene.getMeshByName(`${mini.id}lineOfSight`);
    lineOfSight.setEnabled(false);
    lineOfSight.material = scene.getMaterialByName(mini.losMat[0]);
    lineOfSight._children.forEach((los, index) => los.material = scene.getMaterialByName(mini.losMat[index + 1]));
    disposeGroundMesh(mini, lineOfSight);
  }


  const cancelTargeting = (socketCB) => {
    if (!socketCB) {
      socket.emit("cancelTargeting", gameInfo.tableNumber, selected.id, targets.map(target => target.id));
      advancedTexture.removeControl(rollButton);
    }
    targets.forEach(target => {
      hl.removeMesh(target);
      if (scene.getMeshByName(`${selected.id}To${target.id}`)) {
        scene.removeMesh(scene.getMeshByName(`${selected.id}To${target.id}`));
      }
    });
    targets = [];
    gameInfo.players[enemyPlayer.team].minis.forEach(mini => {
      if (scene.getMeshByName(`${mini.id}To${selected.id}`)) {
        scene.removeMesh(scene.getMeshByName(`${mini.id}To${selected.id}`));
      }
      removeDiceStat(mini);
      mini.diceAssigned = 0;
    })
  }

  const createGroundMesh = (mini, mesh) => {
    if (whatIsUnderneath(mini) && whatIsUnderneath(mini)[0].name.includes("obstacle")) {
      if (scene.getMeshByName(mesh.id + mini.id + "Ground")) {
        scene.getMeshByName(mesh.id + mini.id + "Ground").position.y = - mini.position.y + 28;
        scene.getMeshByName(mesh.id + mini.id + "Ground").setEnabled(true);
      } else {
        mesh.clone(mesh.id + mini.id + "Ground").position.y = - mini.position.y + 28;
        if (mesh.id.includes("lineOfSight")) {
          scene.getMeshByName(mesh.id + mini.id + "Ground").material = scene.getMaterialByName(mini.losMat[0]);
          scene.getMeshByName(mesh.id + mini.id + "Ground")._children.forEach((los, index) => los.material = scene.getMaterialByName(mini.losMat[index + 1]));
        } else if (mesh.id.includes("moveArea")) {
          scene.getMeshByName(mesh.id + mini.id + "Ground").material = invisibleMaterial;
          scene.getMeshByName(mesh.id + mini.id + "Ground")._children[0].material = moveAreaMat;
        }
      }
    } else {
      disposeGroundMesh(mini, mesh);
    }
  }

  const disposeGroundMesh = (mini, mesh) => {
    if (scene.getMeshByName(mesh.id + mini.id + "Ground")) {
      scene.getMeshByName(mesh.id + mini.id + "Ground").dispose();
    }
  }

  const isAccessible = (mini, obstacle) => {
    const isNotMap = obstacle.id !== map.id;
    //if distance mini to obstacle is smaller than move area
    const isCloseEnough = BABYLON.Vector3.Distance(mini.position, obstacle.position) < getWidth(mini) * 8;
    //and obstacle width > half base mini 
    const isThickEnough = getWidth(obstacle) > getWidth(mini) / 2 && getLength(obstacle) > getWidth(mini) / 2;
    const isNotABarricade = !obstacle.id.includes("barricade");
    //and accessible (height smaller than mini)
    const isLowEnough = getHeight(obstacle) + obstacle.position.y < getHeight(mini) + mini.position.y;

    //Higher obstacle can be reached with ladder
    const isAtReach = closeLadder(mini) || isLowEnough;

    if (isCloseEnough && isThickEnough && isNotMap && isNotABarricade && isAtReach) {
      return true;
    } else {
      return false;
    }
  };

  var selection = function (currentMesh, socketCB) {
    if (selected === currentMesh) {
      if (targets.length === 0 && !socketCB) {
        moveAction({ skip: true });
      }
    } else if (currentMesh.id.includes("Mini")) {
      if (selected) {
        hl.removeMesh(selected);
      }
      if (currentPlayer.turnActions > 0) {
        hl.addMesh(currentMesh, BABYLON.Color3.White());
        selected = currentMesh;
        cancelTargeting();
        previous.position = selected.position;
        if (!socketCB) {
          socket.emit("selection", gameInfo.tableNumber, currentMesh.id);
          showMoveArea(selected);
        }
      }
    }
  }

  var cancelSelection = (socketCB) => {
    if (selected) {
      if (!socketCB) {
        socket.emit("cancelSelection", gameInfo.tableNumber);
      }
      if (rotate && !inAttack) {
        if (previous.position) {
          selected.position = previous.position;
          selected.rotation = previous.rotation;

          showMoveArea(selected);
          hideLineOfSight(selected);
        }
        canvas.removeEventListener("mousemove", rotateOnMouseMove);
        rotate = false;
      } else if (!rotate) {
        hideMoveArea(selected);

        hl.removeMesh(selected);
        cancelTargeting();
        scene.removeMesh(clonedMini);

        hideLineOfSight(selected);
        if (user.team === currentPlayer.team) {
          targetFurthestMini(currentPlayer.team);
        }
        selected = "";
        scene.hoverCursor = "pointer";
        if (clonedMini) {
          clonedMini.dispose();
        }
      }
    }
  }

  const noObstacle = (mini1, mini2) => {
    let origin = new BABYLON.Vector3(mini1.position.x, mini1.position.y + mini1.height * 0.75, mini1.position.z);

    let targetLeft = new BABYLON.Vector3(mini2.position.x, mini2.position.y + mini2.height * 0.75, mini2.position.z - mini2.width / 2 + mini2.width * 0.25);
    let targetRight = new BABYLON.Vector3(mini2.position.x, mini2.position.y + mini2.height * 0.75, mini2.position.z + mini2.width / 2 - mini2.width * 0.25);

    let directionLeft = targetLeft.subtract(origin);
    directionLeft = BABYLON.Vector3.Normalize(directionLeft);

    let directionRight = targetRight.subtract(origin);
    directionRight = BABYLON.Vector3.Normalize(directionRight);

    let length = BABYLON.Vector3.Distance(mini1.position, mini2.position) - mini2.width / 2;

    let rayLeft = new BABYLON.Ray(origin, directionLeft, length);
    let rayRight = new BABYLON.Ray(origin, directionRight, length);

    //let rayHelperLeft = new BABYLON.RayHelper(rayLeft);
    //let rayHelperRight = new BABYLON.RayHelper(rayRight);
    //rayHelperLeft.show(scene);
    //rayHelperRight.show(scene);

    let hitsLeft = scene.multiPickWithRay(rayLeft);
    let hitsRight = scene.multiPickWithRay(rayRight);

    if (hitsLeft.some(hit => hit.pickedMesh.name.includes("obstacle")) && hitsRight.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      return false;
    } else {
      return true;
    }
  }

  const isInCover = (mini1, mini2) => {
    let originLeft = new BABYLON.Vector3(mini1.position.x, mini1.position.y + 5, mini1.position.z - mini1.width / 2);
    let originRight = new BABYLON.Vector3(mini1.position.x, mini1.position.y + 5, mini1.position.z + mini1.width / 2);

    let target = new BABYLON.Vector3(mini2.position.x, mini2.position.y + 5, mini2.position.z);

    let directionLeft = target.subtract(originLeft);
    directionLeft = BABYLON.Vector3.Normalize(directionLeft);

    let directionRight = target.subtract(originRight);
    directionRight = BABYLON.Vector3.Normalize(directionRight);

    let length = mini1.width / 2 + mini1.width;

    let rayLeft = new BABYLON.Ray(originLeft, directionLeft, length);
    let rayRight = new BABYLON.Ray(originRight, directionRight, length);

    //let rayHelperLeft = new BABYLON.RayHelper(rayLeft);
    //let rayHelperRight = new BABYLON.RayHelper(rayRight);
    //rayHelperLeft.show(scene);
    //rayHelperRight.show(scene);

    let hitsLeft = scene.multiPickWithRay(rayLeft);
    let hitsRight = scene.multiPickWithRay(rayRight);

    if (hitsLeft.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      return true;
    } else if (hitsRight.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      return true;
    } else {
      return false;
    }
  }

  const isInAngle = (mini1, mini2) => {
    //Check here if angle forward and target < 90deg
    let forward = forwardDirection(mini1);

    let origin = new BABYLON.Vector3(mini1.position.x, 55, mini1.position.z);

    let target = new BABYLON.Vector3(mini2.position.x, 55, mini2.position.z);

    let directionTarget = target.subtract(origin);
    directionTarget = BABYLON.Vector3.Normalize(directionTarget);

    if (Math.acos(BABYLON.Vector3.Dot(forward, directionTarget)) * 180 / Math.PI > 90) {
      return false;
    } else {
      return true;
    };
  };

  const closeLadder = (mini) => {
    let currentLadder;
    ladders.forEach(ladder => {
      let ladderBottom = new BABYLON.Vector2(ladder.position.x, ladder.position.z);
      let miniBottom = new BABYLON.Vector2(mini.position.x, mini.position.z);
      let distance = BABYLON.Vector2.Distance(ladderBottom, miniBottom);
      if (distance < 25) {
        console.log(ladder.id);
        currentLadder = ladder;
      }
    })
    return currentLadder;
  }

  const isHigher = (mini1, mini2) => {
    if (mini1.position.y > mini2.position.y + mini2.height) {
      return true;
    } else {
      return false;
    };
  };

  const whatIsUnderneath = (mini) => {
    let origin = new BABYLON.Vector3(mini.position.x, mini.position.y, mini.position.z + mini.width / 2);
    let origin2 = new BABYLON.Vector3(mini.position.x, mini.position.y, mini.position.z - mini.width / 2);
    let origin3 = new BABYLON.Vector3(mini.position.x + mini.width / 2, mini.position.y, mini.position.z);
    let origin4 = new BABYLON.Vector3(mini.position.x - mini.width / 2, mini.position.y, mini.position.z);

    let direction = new BABYLON.Vector3(0, -1, 0);

    let length = mini.height / 2;

    let ray = new BABYLON.Ray(origin, direction, length);
    let ray2 = new BABYLON.Ray(origin2, direction, length);
    let ray3 = new BABYLON.Ray(origin3, direction, length);
    let ray4 = new BABYLON.Ray(origin4, direction, length);

    let hits = scene.multiPickWithRay(ray);
    let hits2 = scene.multiPickWithRay(ray2);
    let hits3 = scene.multiPickWithRay(ray3);
    let hits4 = scene.multiPickWithRay(ray4);

    if (hits.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      return hits.filter(hit => hit.pickedMesh.name.includes("obstacle")).map(hit => hit.pickedMesh)
    } else if (hits2.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      return hits2.filter(hit => hit.pickedMesh.name.includes("obstacle")).map(hit => hit.pickedMesh)
    } else if (hits3.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      return hits3.filter(hit => hit.pickedMesh.name.includes("obstacle")).map(hit => hit.pickedMesh)
    } else if (hits4.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      return hits4.filter(hit => hit.pickedMesh.name.includes("obstacle")).map(hit => hit.pickedMesh)
    } else if (hits.some(hit => hit.pickedMesh.name.includes("map"))) {
      return hits.filter(hit => hit.pickedMesh.name.includes("map")).map(hit => hit.pickedMesh)
    }
  };

  var handleCoverLogo = (mini1, mini2) => {
    if (isInCover(mini1, mini2)) {
      scene.getMeshByName(`${mini1.id}shield`).setEnabled(true);
    } else {
      if (scene.getMeshByName(`${mini1.id}shield`)) {
        scene.getMeshByName(`${mini1.id}shield`).setEnabled(false);
      }
    }
    if (isInCover(mini2, mini1)) {
      scene.getMeshByName(`${mini2.id}shield`).setEnabled(true);
    } else {
      if (scene.getMeshByName(`${mini2.id}shield`)) {
        scene.getMeshByName(`${mini2.id}shield`).setEnabled(false);
      }
    }
  };

  var removeCoverLogo = (mini) => {
    if (scene.getMeshByName(`${mini.id}shield`)) {
      scene.getMeshByName(`${mini.id}shield`).setEnabled(false);
    }
  }

  var handleLineOfSight = (ev) => {
    var enemyTarget = ev.meshUnderPointer;
    if (selected && rangeToTarget(selected, enemyTarget) && calculateSuccess(selected, enemyTarget) <= 6) {
      handleCoverLogo(selected, enemyTarget);
      if (enemyTarget.intersectsMesh(selected, false)) {
        //Melee position
        //scene.hoverCursor = "url('./Cursors/melee.cur') 10 10, auto";

      } else if (rangeToTarget(selected, enemyTarget)) {
        showLineOfSight(selected);
        hideMoveArea(selected);

        //In range position
        //scene.hoverCursor = "url('./Cursors/aim.cur'), auto";
      } else if (!enemyTarget.intersectsMesh(selected, false) && !rangeToTarget(selected, enemyTarget)) {
        //scene.hoverCursor = "url('./Cursors/unavailable.cur') 15 15, auto";
        hideMoveArea(selected);
        showLineOfSight(selected);
      } 
    }
  }

  var cancelLineOfSight = () => {
    if (selected) {
      hideLineOfSight(selected);
      scene.getMeshByName(`${selected.id}shield`).setEnabled(false);
      gameInfo.players[enemyPlayer.team].minis.forEach(mini => hideLineOfSight(mini));

      if (!rotate && targets.length === 0 && !scene.getMeshByName(`${selected.id}moveArea`)._isEnabled) {
        showMoveArea(selected);
      }
      removeCoverLogo(selected);
      gameInfo.players[enemyPlayer.team].minis.forEach(mini => {
        removeCoverLogo(mini);
      })
    }
    scene.hoverCursor = "pointer";
  }

  var diceRoll = (rolls) => {
    let arrayResult = [];
    for (let i = 0; i < rolls; i++) {
      arrayResult.push(Math.floor(Math.random() * 6) + 1)
    }

    return arrayResult;
  }

  var cloneDice = (rolls, miniTeam, miniPosition, delay, save, socketCB) => {
    if (!socketCB) {
      socket.emit('cloneDice', gameInfo.tableNumber, rolls, miniTeam, miniPosition, delay, save);
    }
    var dicePosition1 = new BABYLON.Vector3(miniPosition.x + 10, miniPosition.y + 7, miniPosition.z + 30)
    var dicePosition2 = new BABYLON.Vector3(miniPosition.x + 10, miniPosition.y + 7, miniPosition.z + 45)
    var dicePosition3 = new BABYLON.Vector3(miniPosition.x + -5, miniPosition.y + 7, miniPosition.z + 30)
    var diceOddPosition3 = new BABYLON.Vector3(miniPosition.x + -5, miniPosition.y + 7, miniPosition.z + 37.5)

    var dicePosition4 = new BABYLON.Vector3(miniPosition.x + -5, miniPosition.y + 7, miniPosition.z + 45)
    var dicePosition5 = new BABYLON.Vector3(miniPosition.x + -20, miniPosition.y + 7, miniPosition.z + 30)
    var diceOddPosition5 = new BABYLON.Vector3(miniPosition.x + -20, miniPosition.y + 7, miniPosition.z + 37.5)

    var dicePosition6 = new BABYLON.Vector3(miniPosition.x + -20, miniPosition.y + 7, miniPosition.z + 45)

    var dicePositions = [dicePosition1, dicePosition2, dicePosition3, dicePosition4, dicePosition5, dicePosition6];

    for (let i = 0; i < rolls.length; i++) {
      var diceIndex = i + 1
      if (save) {
        dice[rolls[i] - 1].material = diceMatRed;
      } else if (miniTeam.includes("White")) {
        dice[rolls[i] - 1].material = diceMatWhite;
      } else if (miniTeam.includes("Black")) {
        dice[rolls[i] - 1].material = diceMatBlack;
      }

      if (rolls.length === 3 && diceIndex === 3) {
        dice[rolls[i] - 1].clone(`diceClone${i}`).position = diceOddPosition3;
      } else if (rolls.length === 5 && diceIndex === 5) {
        dice[rolls[i] - 1].clone(`diceClone${i}`).position = diceOddPosition5;
      } else {
        dice[rolls[i] - 1].clone(`diceClone${i}`).position = dicePositions[i];
      }

      setTimeout(function () {
        scene.removeMesh(scene.getMeshByName(`diceClone${i}`));
      }, delay)
    }
  }

  var compareRolls = (mini1, mini1Rolls, mini1Mod, mini2, mini2Rolls, mini2Mod) => {
    //check if rolls successful, remove any unsuccessful rolls
    var mini1Success = mini1Rolls.filter(roll => roll + mini1Mod >= gameInfo.players[mini1.team].armyStats.units[mini1.unit].range.success);
    var mini2Success = mini2Rolls.filter(roll => roll + mini2Mod >= gameInfo.players[mini2.team].armyStats.units[mini2.unit].defense.success);

    gameUpdate.log(`${currentPlayer.name} rolls ${mini1Rolls.toString()} with ${mini1Mod === 0 ? 'no' : mini1Mod > 0 ? `a + ${mini1Mod}` : `a ${mini1Mod}`} modifier to dice roll.`);

    if (mini1Success.length > 0) {
      gameUpdate.log(`${currentPlayer.name}'s success ${mini1Success.length > 1 ? 'rolls are' : 'roll is'} ${mini1Success.toString()}.`);
    } else {
      gameUpdate.log(`${currentPlayer.name} has no successful rolls.`);
    }

    gameUpdate.log(`${enemyPlayer.name} rolls ${mini2Rolls.toString()} with ${mini2Mod === 0 ? 'no' : mini2Mod > 0 ? `a + ${mini2Mod}` : `a ${mini2Mod}`} modifier to dice roll.`);

    if (mini2Success.length > 0) {
      gameUpdate.log(`${enemyPlayer.name}'s success ${mini2Success.length > 1 ? 'rolls are' : 'roll is'} ${mini2Success.toString()}.`);
    } else {
      gameUpdate.log(`${enemyPlayer.name} has no successful rolls.`);
    }

    //check if duplicates, remove duplicates player enemy
    for (let i = 0; i < mini1Success.length; i++) {
      for (let j = 0; j < mini2Success.length; j++) {
        if (mini1Success[i] === mini2Success[j]) {
          mini1Success.splice(i, 1);
          mini2Success.splice(j, 1)
        }
      }
    }

    if (Math.max(...mini1Success) > Math.max(...mini2Success)) {
      //player with the highest numbers win.   
      gameUpdate.log(`${currentPlayer.name} wins with a higher roll!`);
      return mini1.id;
    } else if (Math.max(...mini2Success) > Math.max(...mini1Success)) {
      gameUpdate.log(`${enemyPlayer.name} wins with a higher roll!`);
      return mini2.id;
    } else {
      //if no result left or equal, both miss.
      return null
    }
  }

  var rangeToTarget = (mini1, mini2) => {
    let rangeResult;

    let distance = BABYLON.Vector3.Distance(mini1.position, mini2.position) - mini2.width / 2;
    let mini1MaxRange = gameInfo.players[mini1.team].armyStats.units[mini1.unit].maxRange
    //close combat if minis base are within 1 inch
    if (distance <= mini1.width / 2 + mini2.width / 2) {
      rangeResult = "c";
      //8 inches
    } else if (distance <= 202) {
      rangeResult = "s";
      // between 8 and 16 inches
    } else if (distance > 202 && distance <= 404) {
      rangeResult = "m";
      // between 16 and 32 inches
    } else if (distance > 404 && distance <= 808) {
      rangeResult = "l";
      // between 32 and max range
    } else if (distance > 808 && distance <= mini1MaxRange) {
      rangeResult = "xl";
    } else if (distance > mini1MaxRange) {
      rangeResult = null
    }

    //check if obstacles between minis;
    //check if angle between mini1 front and mini2 is < 90deg
    if (noObstacle(mini1, mini2) && isInAngle(mini1, mini2)) {
      return rangeResult;
    } else {
      return null;
    }
  }

  var isTheGameOver = () => {
    let winner = "";
    if (gameInfo.players.teamBlack.startActions === 0 && gameInfo.players.teamWhite.startActions === 0) {
      winner = "tie";
      gameUpdate.log(`Game Over. It's a tie! No Winners this time.`);
      gameUpdate.gameOver({ name: "none", team: "none" }, true);
    } else if (gameInfo.players.teamBlack.startActions === 0) {
      winner = "Team White";
      gameUpdate.log(`Game Over. ${gameInfo.players.teamWhite.name} wins!`);
      gameUpdate.gameOver({ name: gameInfo.players.teamWhite.name, team: "teamWhite" }, true);
    } else if (gameInfo.players.teamWhite.startActions === 0) {
      winner = "Team Black";
      gameUpdate.log(`Game Over. ${gameInfo.players.teamBlack.name} wins!`);
      gameUpdate.gameOver({ name: gameInfo.players.teamBlack.name, team: "teamBlack" }, true);
    } else {
      winner = undefined;
    }

    return winner;
  }

  var getMods = (mini1, mini2) => {
    let range = rangeToTarget(mini1, mini2);
    let higherMod = isHigher(mini1, mini2) ? 1 : 0;
    let coverMod = isInCover(mini2, mini1) ? -1 : 0;
    let mods = coverMod + higherMod + gameInfo.players[mini1.team].armyStats.units[mini1.unit].range.mods[range];
    return mods;
  }

  var onAttack = (mini1, mini2, response) => {
    let winner = "";
    if (mini1) {
      let range = rangeToTarget(mini1, mini2);
      let mini1CoverMod = isInCover(mini1, mini2) ? 1 : 0;
      let mini1Mods = getMods(mini1, mini2);

      let mini2CoverMod = isInCover(mini2, mini1) ? 1 : 0;
      let mini2Mods = getMods(mini2, mini1);

      if (range && isInAngle(mini1, mini2)) {
        if (mini2.intersectsMesh(mini1, false) || range === "c") {
          //Melee attack
          gameUpdate.log(`Melee attack of the ${mini1.name} on the ${mini2.name}.`);
          gameUpdate.log(`${currentPlayer.name}'s target roll is ${currentPlayer.army.units[mini1.unit].melee.success}+.`);
          let meleeRoll = diceRoll(currentPlayer.army.units[mini1.unit].melee.roll);

          //Generate Dice
          cloneDice(meleeRoll, mini1.team, mini1.position, 1250);

          gameUpdate.log(`${enemyPlayer.name}'s target roll is ${enemyPlayer.army.units[mini2.unit].melee.success}+.`);
          let mini2MeleeRoll = diceRoll(1);
          //Generate Dice
          cloneDice(mini2MeleeRoll, mini2.team, mini2.position, 1250);

          winner = compareRolls(mini1, meleeRoll, 0, mini2, mini2MeleeRoll, 0);

        } else {
          //Range attack
          var mini1Rolls = [];
          var modedRolls = [];
          var mini2Rolls = [];

          gameUpdate.log(`${gameInfo.players[mini1.team].name} is shooting the ${mini2.name}${response ? ' in response' : ""} with the ${mini1.name} at range ${range.toUpperCase()}.`);
          gameUpdate.log(`${gameInfo.players[mini1.team].name}'s target roll is ${response ? enemyPlayer.army.units[mini1.unit].range.success : currentPlayer.army.units[mini1.unit].range.success}+.`);

          // Check for enemy roll (Should be enemy line of sight when rotation is implemented!)
          if (!response) {
            mini1Rolls = diceRoll(mini2.diceAssigned);
          } else {
            mini1Rolls = diceRoll(1);
          }

          //Generate Dice
          cloneDice(mini1Rolls, mini1.team, mini1.position, 1250);

          modedRolls = mini1Rolls.map(roll => roll + mini1Mods);

          //Enemy Target Response
          if (rangeToTarget(mini2, mini1) && !response) {
            gameUpdate.log(`${enemyPlayer.name}'s target roll is ${enemyPlayer.army.units[mini2.unit].defense.success}+.`);

            mini2Rolls = diceRoll(1);
            //Generate Dice
            cloneDice(mini2Rolls, mini2.team, mini2.position, 1250);

            winner = compareRolls(mini1, mini1Rolls, mini1Mods, mini2, mini2Rolls, mini2Mods);
          }

          //No response from enemy (range difference || angle || one way response)
          if (!winner) {
            if (modedRolls.some(roll => roll >= response ? enemyPlayer.army.units[mini1.unit].range.success : currentPlayer.army.units[mini1.unit].range.success)) {
              if (!response) {
                gameUpdate.log(`${currentPlayer.name} rolls ${mini1Rolls.toString()}. Success! You shot your opponent's ${mini2.name}!`);
              } else {
                gameUpdate.log(`${enemyPlayer.name} rolls ${mini1Rolls.toString()}. Hot damn! The ${mini2.name} got shot!`);
              }
              winner = mini1.id;
            }
          }
        }

        //Defense Roll
        if (winner === mini1.id) {
          gameUpdate.log(`${gameInfo.players[mini2.team].name}'s ${mini2.name} is hit. Defense roll target is ${gameInfo.players[mini2.team].armyStats.units[mini2.unit].defense.success}+`);

          if (mini2CoverMod > 0) {
            gameUpdate.log(`${gameInfo.players[mini2.team].name} has +1 to dice roll for ${mini2.id} as it is in cover.`);
          }
          let defenseRoll = diceRoll(gameInfo.players[mini2.team].armyStats.units[mini2.unit].defense.roll)
          gameUpdate.log(`${gameInfo.players[mini2.team].name} rolls ${defenseRoll.toString()}.`);

          setTimeout(function () {
            cloneDice(defenseRoll, mini2.team, mini2.position, 1500, true);
          }, 1500);
          //Cover modifiers to add here
          if (defenseRoll.some(roll => roll + mini2CoverMod >= gameInfo.players[mini2.team].armyStats.units[mini2.unit].defense.success)) {
            gameUpdate.log(`Defense roll successful. The ${mini2.name} is saved!`);
          } else {
            setTimeout(function () {
              gameUpdate.log(`The ${mini2.name} is killed!`);
              if (mini2.team.includes("White")) {
                mini2.position = new BABYLON.Vector3(Math.floor(Math.random() * 250), -49, -440 + Math.floor(Math.random() * 30) - 15);
                gameUpdate.movePlayerMini(mini2.id, mini2.team, mini2.position, mini2.rotation, true);
              } else {
                mini2.position = new BABYLON.Vector3(- Math.floor(Math.random() * 250), -49, -440 + Math.floor(Math.random() * 30) - 15);
                gameUpdate.movePlayerMini(mini2.id, mini2.team, mini2.position, mini2.rotation, true);
              }
              mini2.name = "decor";
              mini2.isPickable = false;
              if (scene.getMeshByName(`${mini2.id}To${mini1.id}`)) {
                scene.removeMesh(scene.getMeshByName(`${mini2.id}To${mini1.id}`));
              }
              gameUpdate.removePlayerMini(mini2.id, mini2.team);
              removeCoverLogo(mini2);
              clearTarget(mini2.id, selected.id);
              if (response) {
                cancelSelection();
              }
            }, 2500);
          }
        } else if (winner === mini2.id) {
          gameUpdate.log(`${gameInfo.players[mini1.team].name}'s ${mini1.name} is hit. Defense roll target is ${gameInfo.players[mini2.team].armyStats.units[mini2.unit].defense.success}+`);
          if (mini1CoverMod > 0) {
            gameUpdate.log(`${gameInfo.players[mini1.team].name} has +1 to dice roll for the ${mini1.name} as it is in cover.`);
          }
          let defenseRoll = diceRoll(gameInfo.players[mini1.team].armyStats.units[mini1.unit].defense.roll, null, true, mini1);
          gameUpdate.log(`${gameInfo.players[mini1.team].name} rolls ${defenseRoll.toString()}.`);

          setTimeout(function () {
            cloneDice(defenseRoll, mini1.team, mini1.position, 1500, true);
          }, 1500);
          if (defenseRoll.some(roll => roll + mini1CoverMod >= gameInfo.players[mini1.team].armyStats.units[mini1.unit].defense.success)) {
            gameUpdate.log(`Defense roll successful. The ${mini1.name} is saved!`);

          } else {
            gameUpdate.log(`The ${mini1.name} is killed!`);
            setTimeout(function () {
              if (mini1.team.includes("White")) {
                mini1.position = new BABYLON.Vector3(Math.floor(Math.random() * 250), -49, -440 + Math.floor(Math.random() * 30) - 15);
                gameUpdate.movePlayerMini(mini1.id, mini1.team, mini1.position, mini1.rotation, true);
              } else {
                mini1.position = new BABYLON.Vector3(- Math.floor(Math.random() * 250), -49, -440 + Math.floor(Math.random() * 30) - 15);
                gameUpdate.movePlayerMini(mini1.id, mini1.team, mini1.position, mini1.rotation, true);
              }
              mini1.name = "decor";
              mini1.isPickable = false;
              clearTarget(mini2.id, mini1.id)
              gameUpdate.removePlayerMini(mini1.id, mini1.team);
              removeCoverLogo(mini1);
              cancelSelection();
            }, 2500);
          }
        } else {
          gameUpdate.log("No winners! Try again.");
        }
      }
    }
  }

  const attackTargets = async () => {
    inAttack = true;
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    if (selected && targets && targets.length > 0) {
      let enemyResponse = gameInfo.players[enemyPlayer.team].minis.filter(mini =>
        enemyPlayer.army.units[mini.unit].range.mods[rangeToTarget(mini, selected)] >= 0
      );
      let onWayResponse = enemyResponse.filter(enemy => !targets.some(target => target === enemy));

      await asyncForEach(targets, async (target) => {
        if (selected) {
          onAttack(selected, target);
        }
        await waitFor(3000);
      });
      if (onWayResponse) {
        await asyncForEach(onWayResponse, async (enemy) => {
          if (selected) {
            onAttack(enemy, selected, true);
          }
          await waitFor(3000);
        });
      }
      gameUpdate.removeTurnAction(currentPlayer.team);
      scene.removeMesh(scene.getMeshByName("token"));
      socket.emit("removeMesh", gameInfo.tableNumber, "token");
      cancelLineOfSight();
      cancelSelection();
      isTheGameOver();
      inAttack = false;

      if (gameInfo.players[currentPlayer.team].turnActions === 0) {
        setTimeout(function () {
          switchPlayer();
          gameUpdate.resetTurnActions(currentPlayer.team);
          importActionTokens();
          socket.emit("importActionTokens", gameInfo.tableNumber);
        }, 3500);
      }
    }
  }

  var rollButton = GUI.Button.CreateSimpleButton("rollButton", "Roll Dice");
  rollButton.width = "120px"
  rollButton.height = "60px";
  rollButton.color = "white";
  rollButton.left = "40%";
  rollButton.top = "30%";
  rollButton.cornerRadius = 20;
  rollButton.background = "black";
  rollButton.zIndex = 2000;
  rollButton.onPointerClickObservable.add(function () {
    if (!inAttack) {
      attackTargets();
    }
  });

  var moveAction = ({ skip }) => {
    if (selected) {
      if (!skip) {
        previous.position = selected.position;
        selected.position = clonedMini.position;
      }
      hideMoveArea(selected);
      showLineOfSight(selected);

      previous.rotation = selected.rotation.clone();
      rotate = true;
    }
  }

  var forwardDirection = (mini) => {
    let forward = new BABYLON.Vector3(0, 0, -1);
    let direction = mini.getDirection(forward);
    direction.normalize();
    return direction;
  }

  var rotateOnMouseMove = (evt) => {
    evt.preventDefault();
    if (selected && getGroundPosition(evt)) {
      var diffX = selected.position.x - getGroundPosition(evt).x;
      var diffY = selected.position.z - getGroundPosition(evt).z;
      selected.rotation.y = Math.atan2(diffX, diffY);
    }
  }

  var rotateAction = (evt) => {
    if (evt.which === 1 || evt.sourceEvent.which === 1) {
      if (selected && rotate) {
        gameUpdate.removeTurnAction(currentPlayer.team);
        scene.removeMesh(scene.getMeshByName("token"));
        socket.emit("removeMesh", gameInfo.tableNumber, "token");
        rotate = false;
        previous.position = null;
        previous.rotation = null;
        // Here movement completed - sending position & rotation to opponent;
        gameUpdate.movePlayerMini(selected.id, currentPlayer.team, selected.position, selected.rotation);
        cancelSelection();

        if (gameInfo.players[currentPlayer.team].turnActions === 0) {
          setTimeout(function () {
            switchPlayer();
            gameUpdate.resetTurnActions(currentPlayer.team);
            importActionTokens();
            socket.emit("importActionTokens", gameInfo.tableNumber);
          }, 1000);
        }
      }
    }
  }

  var onMouseMove = function (evt) {
    evt.preventDefault();
    if (selected && getGroundPosition(evt)) {
      let otherMinis = [...gameInfo.players[enemyPlayer.team].minis, ...gameInfo.players[currentPlayer.team].minis.filter(mini => mini.id !== selected.id)];
      //Miniature collision
      if (!otherMinis.some(mini =>
        getGroundPosition(evt).x < mini.position.x + getWidth(mini) - 2 &&
        getGroundPosition(evt).x > mini.position.x - getWidth(mini) + 2 &&
        getGroundPosition(evt).z < mini.position.z + getWidth(mini) - 2 &&
        getGroundPosition(evt).z > mini.position.z - getWidth(mini) + 2
      )) {
        //Obstacle collision
        if (
          closeLadder(selected) ? true :
            !obstacles.filter(obstacle => getHeight(obstacle) + obstacle.position.y - (getHeight(obstacle) / 2) > getHeight(selected) + selected.position.y).some(obstacle =>
              getGroundPosition(evt).x < obstacle.position.x + getWidth(obstacle) / 2 + getWidth(selected) / 3 &&
              getGroundPosition(evt).x > obstacle.position.x - getWidth(obstacle) / 2 - getWidth(selected) / 3 &&
              getGroundPosition(evt).z < obstacle.position.z + getLength(obstacle) / 2 + getWidth(selected) / 3 &&
              getGroundPosition(evt).z > obstacle.position.z - getLength(obstacle) / 2 - getWidth(selected) / 3
            )
        ) {
          //game area limits
          if (getGroundPosition(evt).x > -475 && getGroundPosition(evt).x < 475 && getGroundPosition(evt).z > -300 && getGroundPosition(evt).z < 300) {
            //Filtering out obstacles shorter than mini size. Allows vertical move.
            var currentObstacle;
            if (closeLadder(selected)) {
              currentObstacle = obstacles.filter(obstacle =>
                getGroundPosition(evt).x < obstacle.position.x + getWidth(obstacle) / 2 + getWidth(selected) / 2 &&
                getGroundPosition(evt).x > obstacle.position.x - getWidth(obstacle) / 2 - getWidth(selected) / 2 &&
                getGroundPosition(evt).z < obstacle.position.z + getLength(obstacle) / 2 + getWidth(selected) / 2 &&
                getGroundPosition(evt).z > obstacle.position.z - getLength(obstacle) / 2 - getWidth(selected) / 2
              );
            } else {
              currentObstacle = obstacles.filter(obstacle => getHeight(obstacle) < getHeight(selected) + selected.position.y - 25).filter(obstacle =>
                getGroundPosition(evt).x < obstacle.position.x + getWidth(obstacle) / 2 + getWidth(selected) / 2 &&
                getGroundPosition(evt).x > obstacle.position.x - getWidth(obstacle) / 2 - getWidth(selected) / 2 &&
                getGroundPosition(evt).z < obstacle.position.z + getLength(obstacle) / 2 + getWidth(selected) / 2 &&
                getGroundPosition(evt).z > obstacle.position.z - getLength(obstacle) / 2 - getWidth(selected) / 2
              );
            }
            if (currentObstacle && currentObstacle.length > 0) {
              //Vertical move
              let heightArray = currentObstacle.filter(obstacle => !obstacle.id.includes("barricade")).map(obstacle => (obstacle.height / 2) + obstacle.position.y);
              let highestHeight = Math.max(...heightArray);
              clonedMini.position = new BABYLON.Vector3(getGroundPosition(evt).x, highestHeight, getGroundPosition(evt).z);
            } else {
              //Regular move
              clonedMini.position = new BABYLON.Vector3(getGroundPosition(evt).x, 25, getGroundPosition(evt).z);
            }
          }
        }
      }
    }
  }

  var getGroundPosition = function () {
    // Use a predicate to get position on the ground
    var pickinfo = scene.pick(scene.pointerX, scene.pointerY);
    //pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh === map});
    if (pickinfo.hit) {
      return pickinfo.pickedPoint;
    } else {
      return null;
    }
  }

  const addTarget = (enemyTargetId, socketCB) => {
    let enemyTarget = scene.getMeshByID(enemyTargetId);
    if (!socketCB) {
      advancedTexture.addControl(rollButton);
    }
    updateDiceStat();
    let targetColor = new BABYLON.Color3.Black();
    if (selected && !targets.some(target => target.id === enemyTarget.id)) {
      if (getLosColor(selected.unit, currentPlayer.team, rangeToTarget(selected, enemyTarget))) {
        targetColor = getLosColor(selected.unit, currentPlayer.team, rangeToTarget(selected, enemyTarget));
      }
      hl.addMesh(enemyTarget, targetColor);
      targets.push(enemyTarget);
      // create direct line of sight
      if (rangeToTarget(selected, enemyTarget) !== "c") {
        createDirectLOS(selected, enemyTarget, false);
      }
      createDiceStat(enemyTarget);
      targetResponse();
    }
  }

  const clearTarget = (targetId, selectedId, socketCB) => {
    let target = scene.getMeshByID(targetId);
    if (!socketCB) {
      socket.emit("clearTarget", gameInfo.tableNumber, targetId, selectedId);
    }
    if (target) {
      target.diceAssigned = 0;
    }
    // Removed any target from the targets array with 0 dice assigned
    targets.forEach((target, index) => {
      if (target.diceAssigned === 0) {
        targets.splice(index, 1);
        hl.removeMesh(target);
        removeDiceStat(target);
        scene.removeMesh(scene.getMeshByName(`${selectedId}To${target.id}`));
        scene.removeMesh(scene.getMeshByName(`${target.id}To${selectedId}`));
      }
    });
  }

  const calculateSuccess = (mini1, mini2) => {
    let mods;
    let success;
    if (rangeToTarget(mini1, mini2) === "c") {
      success = currentPlayer.army.units[mini1.unit].melee.success;
    } else {
      mods = getMods(mini1, mini2);
      success = currentPlayer.army.units[mini1.unit].range.success - mods
    }
    return success
  }

  const createDiceStat = (enemyTarget) => {
    if (selected) {
      let roll = enemyTarget.diceAssigned;
      let success = calculateSuccess(selected, enemyTarget)
      let diceStat = new GUI.TextBlock(`${enemyTarget.id}diceStat`);
      diceStat.text = `${roll}d${success}+`;
      diceStat.color = "white";
      diceStat.fontFamily = "Arial";
      diceStat.fontSize = "15px";
      advancedTexture.addControl(diceStat);

      diceStat.linkWithMesh(enemyTarget);
      diceStat.linkOffsetY = -40;
    }
  };

  const removeDiceStat = (enemyTarget) => {
    if (getControlByName(`${enemyTarget.id}diceStat`)) {
      getControlByName(`${enemyTarget.id}diceStat`).dispose();
    }
  };

  const updateDiceStat = () => {
    if (targets && targets.length > 0) {
      targets.forEach(target => {
        removeDiceStat(target);
        createDiceStat(target);
      });
    }
  }

  const assignTarget = (enemyTargetId, socketCB) => {
    var enemyTarget = scene.getMeshByID(enemyTargetId);
    if (!socketCB) {
      socket.emit("assignTarget", gameInfo.tableNumber, enemyTargetId);
    }

    var whoHasMoreDice = targets.map(target => target.diceAssigned).indexOf(Math.max(...targets.filter(target => target.id !== enemyTarget.id).map(target => target.diceAssigned)));
    if (selected && enemyTarget && enemyTarget.id.includes("Mini") && rangeToTarget(selected, enemyTarget) && calculateSuccess(selected, enemyTarget) <= 6) {
      hideMoveArea(selected);
      if (targets.length === 0) {
        enemyTarget.diceAssigned = currentPlayer.army.units[selected.unit].range.roll;
        addTarget(enemyTarget.id, socketCB);
      } else if (whoHasMoreDice >= 0 && targets.reduce((acc, target) => acc + target.diceAssigned, 0) === currentPlayer.army.units[selected.unit].range.roll && targets.filter(target => target.id !== enemyTarget.id).every(target => target.diceAssigned >= 1)) {
        enemyTarget.diceAssigned ? enemyTarget.diceAssigned += 1 : enemyTarget.diceAssigned = 1;
        targets[whoHasMoreDice].diceAssigned -= 1;
        addTarget(enemyTarget.id, socketCB);
        if (!socketCB) {
          clearTarget(null, selected.id);
        }
      } else {
        if (targets.length > 1 && targets.every(target => target.diceAssigned === 1)) {
          let removedTarget = targets.splice(targets.indexOf(targets[whoHasMoreDice]), 1)[0];
          if (!socketCB) {
            clearTarget(removedTarget.id, selected.id);
          }
          enemyTarget.diceAssigned ? enemyTarget.diceAssigned += 1 : enemyTarget.diceAssigned = 1;
          addTarget(enemyTarget.id, socketCB);
        }
        if (enemyTarget.diceAssigned === currentPlayer.army.units[selected.unit].range.roll) {
          if (!socketCB) {
            clearTarget(enemyTarget.id, selected.id);
            cancelTargeting();
          }
        }
      }
    }
  }

  const createDirectLOS = (mini1, mini2, response) => {
    let origin;
    let target;
    if (response) {
      origin = new BABYLON.Vector3(mini1.position.x, mini1.position.y + mini1.height * 0.70, mini1.position.z);
      target = new BABYLON.Vector3(mini2.position.x, mini2.position.y + mini2.height * 0.70, mini2.position.z);
      let colorArray1 = [new BABYLON.Color4(215 / 255, 195 / 255, 58 / 255, 1), new BABYLON.Color4(0, 0, 0, 0)];
      BABYLON.MeshBuilder.CreateLines(`${mini1.id}To${mini2.id}`, { points: [origin, target], colors: colorArray1, updatable: true }, scene);
    } else {
      origin = new BABYLON.Vector3(mini1.position.x, mini1.position.y + mini1.height * 0.80, mini1.position.z);
      target = new BABYLON.Vector3(mini2.position.x, mini2.position.y + mini2.height * 0.80, mini2.position.z);
      let colorArray2 = [new BABYLON.Color4(1, 1, 1, 1), new BABYLON.Color4(0, 0, 0, 0)]
      BABYLON.MeshBuilder.CreateLines(`${mini1.id}To${mini2.id}`, { points: [origin, target], colors: colorArray2, updatable: true }, scene);
    }
  }

  const targetResponse = () => {
    if (selected && targets) {
      gameInfo.players[enemyPlayer.team].minis.forEach(mini => {
        if (!scene.getMeshByName(`${mini.id}To${selected.id}`)) {
          if (enemyPlayer.army.units[mini.unit].range.mods[rangeToTarget(mini, selected)] >= 0 || scene.getMeshByName(`${selected.id}To${mini.id}`)) {
            createDirectLOS(mini, selected, true);
          }
        }
      })
    }
  }

  socket.on("moveMini", function (data) {
    gameUpdate.setMiniPosition(data);
  });

  socket.on("removeTurn", function (team) {
    gameUpdate.removeTurnAction(team, true);
  });

  socket.on("currentPlayer", function (currentPlayer) {
    gameUpdate.setCurrentPlayer(currentPlayer, true);
  });

  socket.on("resetTurn", function (team) {
    gameUpdate.resetTurnActions(team, true);
  });

  socket.on("removeMini", function (id, team) {
    gameUpdate.removePlayerMini(id, team, true);
  });

  socket.on("historyLog", function (string) {
    gameUpdate.log(string, true);
  });

  socket.on("removeToken", function (name) {
    scene.removeMesh(scene.getMeshByName(name));
  });

  socket.on("importTokens", function () {
    importActionTokens();
  });

  socket.on("cloneMesh", function (rolls, miniTeam, miniPosition, delay, save) {
    cloneDice(rolls, miniTeam, miniPosition, delay, save, true);
  });

  socket.on("select", function (meshId) {
    selection(scene.getMeshByID(meshId), true);
  });

  socket.on("cancelSelect", function () {
    cancelSelection(true);
  });

  socket.on("assigningTarget", function (meshId) {
    assignTarget(meshId, true);
  });

  socket.on("cancelTargets", function () {
    cancelTargeting(true);
  });

  socket.on("clearingTarget", function (meshId, selectedId) {
    clearTarget(meshId, selectedId, true);
  });


  moveActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
      if (selected) {
        clonedMini = selected.clone();
        clonedMini.position = selected.position;
        clonedMini.isPickable = false;
        clonedMini._children.forEach(child => child.setEnabled(false));

        clonedMini.material = transparentMaterial;
      }
      canvas.addEventListener("mousemove", onMouseMove, false);
      canvas.addEventListener("click", moveAction, false);
    })
  );

  moveActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
      if (clonedMini) {
        clonedMini.dispose();
      }
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", moveAction);
    })
  );

  mapActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
      if (selected && rotate) {
        showLineOfSight(selected);
      }
      if (rotate) {
        canvas.addEventListener("mousemove", rotateOnMouseMove, false);
        canvas.addEventListener("click", rotateAction, false);
      }
    })
  );

  mapActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
      if (selected && !rotate) {
        hideLineOfSight(selected);
      }
      canvas.removeEventListener("mousemove", rotateOnMouseMove);
      canvas.removeEventListener("click", rotateAction);
    })
  );

  //Select current player mini
  teamBlackActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function (ev) {
      if (currentPlayer.team === "teamBlack" && user.team === "teamBlack" && !inAttack) {
        if (rotate) {
          rotateAction(ev);
        } else {
          if (ev.sourceEvent.which === 1) {
            let currentMesh = ev.meshUnderPointer;
            scene.hoverCursor = "pointer";
            selection(currentMesh);
          }
        }
      }
    })
  );
  //Attack opposite team
  teamBlackActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function (ev) {
      if (currentPlayer.team === "teamWhite" && user.team === "teamWhite" && !rotate && !inAttack) {
        assignTarget(ev.meshUnderPointer.id);
      }
    })
  );

  //LOS on opposite team
  teamBlackActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
      if (currentPlayer.team === "teamWhite" && user.team === "teamWhite" && !inAttack) {
        handleLineOfSight(ev);
      }
    })
  );

  teamBlackActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
      if (currentPlayer.team === "teamWhite" && user.team === "teamWhite") {
        cancelLineOfSight();
      }
    })
  );


  //Select current player mini
  teamWhiteActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function (ev) {
      if (currentPlayer.team === "teamWhite" && user.team === "teamWhite" && !inAttack) {
        if (rotate) {
          rotateAction(ev);
        } else {
          //left click
          if (ev.sourceEvent.which === 1) {
            let currentMesh = ev.meshUnderPointer;
            scene.hoverCursor = "pointer";
            selection(currentMesh);
          }
        }
      }
    })
  );
  //Attack opposite team
  teamWhiteActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function (ev) {
      if (currentPlayer.team === "teamBlack" && user.team === "teamBlack" && !rotate && !inAttack) {
        assignTarget(ev.meshUnderPointer.id);
      }
    })
  );

  //LOS on opposite team
  teamWhiteActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
      if (currentPlayer.team === "teamBlack" && user.team === "teamBlack" && !inAttack) {
        handleLineOfSight(ev);
      }
    })
  );

  teamWhiteActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
      if (currentPlayer.team === "teamBlack" && user.team === "teamBlack") {
        cancelLineOfSight();
      }
    })
  );

  canvas.addEventListener('contextmenu', cancelSelection, false);
  scene.onDispose = function () {
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("contextmenu", cancelSelection);
  }
}

export default (props) => (
  <div>
    <SceneComponent id='my-canvas' className="w-full h-full" antialias onSceneReady={onSceneReady} />
  </div>
)