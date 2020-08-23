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

const onSceneReady = (scene, players, gameUpdate) => {
  const canvas = scene.getEngine().getRenderingCanvas();
  var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    "sceneUI"
  );
  advancedTexture.isForeground = true;
  var camera = new BABYLON.ArcRotateCamera("arcCamera",
    BABYLON.Tools.ToRadians(0),
    BABYLON.Tools.ToRadians(100),
    780, new BABYLON.Vector3(-60, 400, 0), scene
  );
  //Setting up camera         
  camera.attachControl(canvas, true);
  camera.angularsensibility *= -1;
  camera.checkCollisions = true;
  camera.ellipsoid = new BABYLON.Vector3(1.5, 1, 1.5);

  //Setting lights and shadows
  var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(75, 400, 150), scene);
  light.intensity = 1;
  light.range = 5000;

  var light2 = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, -4900, 0), scene);
  //Colored backlight => 
  //light2.diffuse = new BABYLON.Color3(0.3, 0.2, 0.9);
  light2.intensity = 0.7;

  var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
  shadowGenerator.usePoissonSampling = true;

  var hl = new BABYLON.HighlightLayer("hl1", scene);
  hl.innerGlow = false;

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
  backgroundMaterial.opacityTexture = new BABYLON.Texture(`.${publicURL}/Textures/OpacityTemplate.png`, scene);
  backgroundMaterial.backFaceCulling = false;
  background.material = backgroundMaterial;
  background.translate(BABYLON.Axis.Y, -1, scene);
  background.visibility = 0.4;
  background.receiveShadows = true;

  var boardMaterial = new BABYLON.StandardMaterial("boardMaterial", scene);
  boardMaterial.diffuseTexture = new BABYLON.Texture(`.${publicURL}/Textures/Wood/Wood_021_basecolor.jpg`, scene);
  boardMaterial.bumpTexture = new BABYLON.Texture(`.${publicURL}/Textures/Wood/Wood_021_normal.jpg`, scene);
  boardMaterial.ambientTexture = new BABYLON.Texture(`.${publicURL}/Textures/Wood/Wood_021_ambientOcclusion.jpg`, scene);

  var groundMaterial = new BABYLON.StandardMaterial("asphaltMaterial", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture(`.${publicURL}/Textures/Asphalt/Asphalt_001_COLOR.jpg`, scene);
  groundMaterial.bumpTexture = new BABYLON.Texture(`.${publicURL}/Textures/Asphalt/Asphalt_001_NRM.jpg`, scene);
  groundMaterial.specularTexture = new BABYLON.Texture(`.${publicURL}/Textures/Asphalt/Asphalt_001_SPEC.jpg`, scene);
  groundMaterial.ambientTexture = new BABYLON.Texture(`.${publicURL}/Textures/Asphalt/Asphalt_001_OCC.jpg`, scene);

  var miniMaterial = new BABYLON.StandardMaterial("plasticMaterial", scene);
  miniMaterial.diffuseColor = new BABYLON.Color3(220 / 255, 220 / 255, 220 / 255);

  var tokenMaterialBlack = new BABYLON.StandardMaterial("tokenMaterial", scene);
  tokenMaterialBlack.diffuseTexture = new BABYLON.Texture(`.${publicURL}/Textures/Token/Coin_low_Coin_material_BaseColor2.png`, scene);
  tokenMaterialBlack.bumpTexture = new BABYLON.Texture(`.${publicURL}/Textures/Token/Coin_low_Coin_material_Normal.png`, scene);

  var tokenMaterialWhite = new BABYLON.StandardMaterial("tokenMaterial", scene);
  tokenMaterialWhite.diffuseTexture = new BABYLON.Texture(`.${publicURL}/Textures/Token/Coin_low_Coin_material_BaseColor.png`, scene);
  tokenMaterialWhite.bumpTexture = new BABYLON.Texture(`.${publicURL}/Textures/Token/Coin_low_Coin_material_Normal.png`, scene);

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

  var gameAreaTemplate = 'if( vPositionW.z  < -340.){ discard; } if( vPositionW.z  > 340.){ discard; } if( vPositionW.x  > 450.){ discard; } if( vPositionW.x  < -450.){ discard; }';

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

  //Game initiation
  // Associate Users with teams (teamWhite || teamBlack);
  // example: teamWhite.player = "@jrej";
  // example: teamBlack.player = "@inkito";
  // Proceed to initiative roll to decide currentPlayer;
  var currentPlayer = {
    team: "teamWhite",
    get player() { return players[this.team].player },
    get army() { return players[this.team].armyStats },
    get startActions() { return players[this.team].startActions },
    get turnActions() { return players[this.team].turnActions },
  };

  var enemyPlayer = {
    get team() { return currentPlayer.team === "teamWhite" ? "teamBlack" : "teamWhite" },
    get player() { return players[currentPlayer.team === "teamWhite" ? "teamBlack" : "teamWhite"].player },
    get army() { return players[currentPlayer.team === "teamWhite" ? "teamBlack" : "teamWhite"].armyStats }
  }

  //Action managers  
  var mapActionManager = new BABYLON.ActionManager(scene);
  var moveActionManager = new BABYLON.ActionManager(scene);
  var teamBlackActionManager = new BABYLON.ActionManager(scene);
  var teamWhiteActionManager = new BABYLON.ActionManager(scene);

  var actionToken;

  const importActionTokens = () => {
    BABYLON.SceneLoader.ImportMesh(
      "",
      `.${publicURL}/Models/`,
      "token.babylon",
      scene,
      function (newMeshes) {
        actionToken = BABYLON.Mesh.MergeMeshes(newMeshes);
        actionToken.position = new BABYLON.Vector3(150, -18, 440);
        actionToken.scaling = new BABYLON.Vector3(800, 900, 800);
        actionToken.name = "token"
        actionToken.id = "token1"
        actionToken.material = currentPlayer.team === "teamWhite" ? tokenMaterialWhite : tokenMaterialBlack;

        var dx = actionToken.position.x;
        var NB_CLONES = currentPlayer.startActions - 1;
        var actionClone;
        for (var nbclone = 0; nbclone < NB_CLONES; nbclone++) {
          actionClone = actionToken.clone(`token${nbclone + 2}`);
          actionClone.name = "token";
          let randomX = Math.floor(Math.random() * 40) + 50;
          actionClone.position.x = dx - randomX;
          actionClone.position.z = actionToken.position.z + Math.floor(Math.random() * 30) - 15;
          dx = dx - randomX;
        };
        gameUpdate.resetTurnActions(currentPlayer.team);
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
    `.${publicURL}/Models/`,
    "dice.babylon",
    scene,
    function (newMeshes) {
      dice1 = BABYLON.Mesh.MergeMeshes(newMeshes);
      dice1.scaling = new BABYLON.Vector3(20, 20, 20);
      dice1.translate(BABYLON.Axis.Y, 30, scene);
      dice1.translate(BABYLON.Axis.X, 175, scene);
      dice1.translate(BABYLON.Axis.Z, 50, scene);
      shadowGenerator.getShadowMap().renderList.push(dice1);
      dice1.id = "dice1";
      dice1.name = "dice";
      dice1.checkCollisions = true;
      dice1.collisionGroup = 1;
      dice1.collisionMask = 1;

      dice1.setEnabled(false);
      dice.push(dice1);
    }
  );

  BABYLON.SceneLoader.ImportMesh(
    "",
    `.${publicURL}/Models/`,
    "dice2.babylon",
    scene,
    function (newMeshes) {
      dice2 = BABYLON.Mesh.MergeMeshes(newMeshes);
      dice2.scaling = new BABYLON.Vector3(20, 20, 20);
      dice2.translate(BABYLON.Axis.Y, 33, scene);
      dice2.translate(BABYLON.Axis.X, 175, scene);
      dice2.translate(BABYLON.Axis.Z, 50, scene);
      shadowGenerator.getShadowMap().renderList.push(dice2);
      dice2.id = "dice2";
      dice2.name = "dice";
      dice2.checkCollisions = true;
      dice2.collisionGroup = 1;
      dice2.collisionMask = 1;

      dice2.setEnabled(false);
      dice.push(dice2);
    }
  );

  BABYLON.SceneLoader.ImportMesh(
    "",
    `.${publicURL}/Models/`,
    "dice3.babylon",
    scene,
    function (newMeshes) {
      dice3 = BABYLON.Mesh.MergeMeshes(newMeshes);
      dice3.scaling = new BABYLON.Vector3(20, 20, 20);
      dice3.translate(BABYLON.Axis.Y, 33, scene);
      dice3.translate(BABYLON.Axis.X, 175, scene);
      dice3.translate(BABYLON.Axis.Z, 50, scene);
      shadowGenerator.getShadowMap().renderList.push(dice3);
      dice3.id = "dice3";
      dice3.name = "dice";
      dice3.checkCollisions = true;
      dice3.collisionGroup = 1;
      dice3.collisionMask = 1;

      dice3.setEnabled(false);
      dice.push(dice3);
    }
  );

  BABYLON.SceneLoader.ImportMesh(
    "",
    `.${publicURL}/Models/`,
    "dice4.babylon",
    scene,
    function (newMeshes) {
      dice4 = BABYLON.Mesh.MergeMeshes(newMeshes);
      dice4.scaling = new BABYLON.Vector3(20, 20, 20);
      dice4.translate(BABYLON.Axis.Y, 33, scene);
      dice4.translate(BABYLON.Axis.X, 175, scene);
      dice4.translate(BABYLON.Axis.Z, 50, scene);
      shadowGenerator.getShadowMap().renderList.push(dice4);
      dice4.id = "dice4";
      dice4.name = "dice";
      dice4.checkCollisions = true;
      dice4.collisionGroup = 1;
      dice4.collisionMask = 1;

      dice4.setEnabled(false);
      dice.push(dice4);
    }
  );

  BABYLON.SceneLoader.ImportMesh(
    "",
    `.${publicURL}/Models/`,
    "dice5.babylon",
    scene,
    function (newMeshes) {
      dice5 = BABYLON.Mesh.MergeMeshes(newMeshes);
      dice5.scaling = new BABYLON.Vector3(20, 20, 20);
      dice5.translate(BABYLON.Axis.Y, 33, scene);
      dice5.translate(BABYLON.Axis.X, 175, scene);
      dice5.translate(BABYLON.Axis.Z, 50, scene);
      shadowGenerator.getShadowMap().renderList.push(dice5);
      dice5.id = "dice5";
      dice5.name = "dice";
      dice5.checkCollisions = true;
      dice5.collisionGroup = 1;
      dice5.collisionMask = 1;

      dice5.setEnabled(false);
      dice.push(dice5);
    }
  );

  BABYLON.SceneLoader.ImportMesh(
    "",
    `.${publicURL}/Models/`,
    "dice6.babylon",
    scene,
    function (newMeshes) {
      dice6 = BABYLON.Mesh.MergeMeshes(newMeshes);
      dice6.scaling = new BABYLON.Vector3(20, 20, 20);
      dice6.translate(BABYLON.Axis.Y, 33, scene);
      dice6.translate(BABYLON.Axis.X, 175, scene);
      dice6.translate(BABYLON.Axis.Z, 50, scene);
      dice6.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(90), scene);
      shadowGenerator.getShadowMap().renderList.push(dice6);
      dice6.id = "dice6";
      dice6.name = "dice";
      dice6.checkCollisions = true;
      dice6.collisionGroup = 1;
      dice6.collisionMask = 1;

      dice6.setEnabled(false);
      dice.push(dice6);
    }
  );

  var miniWidth = 25.25;

  var LOS = BABYLON.MeshBuilder.CreateCylinder("lineOfSights", { height: 0.1, diameter: 202 * 2 + miniWidth, tessellation: 256 }, scene);
  LOS.position = new BABYLON.Vector3(0, -100, 0);
  var LOSM = BABYLON.MeshBuilder.CreateCylinder("lineOfSightm", { height: 0.1, diameter: 404 * 2 + miniWidth, tessellation: 256 }, scene);
  var LOSL = BABYLON.MeshBuilder.CreateCylinder("lineOfSightl", { height: 0.1, diameter: 808 * 2 + miniWidth, tessellation: 256 }, scene);
  //var LOSXL = BABYLON.MeshBuilder.CreateCylinder("lineOfSight", { height: 0.1, diameter: players[currentPlayer.team].armyStats.units.soldier.maxRange * 2 + miniWidth, tessellation: 256 }, scene);
  /*LOSXL.parent =*/ LOSL.parent = LOSM.parent = LOS;

  var los = BABYLON.CSG.FromMesh(LOS);
  var losM = BABYLON.CSG.FromMesh(LOSM);
  var losL = BABYLON.CSG.FromMesh(LOSL);
  //var losXL = BABYLON.CSG.FromMesh(LOSXL);

  var slicer = BABYLON.MeshBuilder.CreateBox("LOSTemplate", { width: players[currentPlayer.team].armyStats.units.soldier.maxRange * 2, height: 2500, depth: 1 }, scene);
  slicer.rotate(BABYLON.Axis.X, BABYLON.Tools.ToRadians(90), scene);
  slicer.position = new BABYLON.Vector3(players[currentPlayer.team].armyStats.units.soldier.maxRange, -100, 0);
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

    if (players[team].armyStats.units[unit].range.mods[range] > 0) {
      return losColorBonus;
    } else if (players[team].armyStats.units[unit].range.mods[range] === 0) {
      return losColorZero;
    } else if (players[team].armyStats.units[unit].range.mods[range] === -1) {
      return losColorMalus;
    } else if (players[team].armyStats.units[unit].range.mods[range] <= -2) {
      return losColorBad;
    }
  }

  const getHeight = (mesh) => {
    return mesh.getBoundingInfo().boundingBox.extendSize.y * 2 * mesh.scaling.y
  };

  const getWidth = (mesh) => {
    return mesh.getBoundingInfo().boundingBox.extendSize.x * 2 * mesh.scaling.x
  };

  const getLength = (mesh) => {
    return mesh.getBoundingInfo().boundingBox.extendSize.z * 2 * mesh.scaling.z
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
    `.${publicURL}/Models/`,
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

  /*const createTextPlane = (mini) => {
    let miniPlane = new BABYLON.Mesh.CreatePlane(`${mini.id}TextPlane`, 150, scene, true);
    miniPlane.material = new BABYLON.StandardMaterial(`${mini.id}TextMat`, scene);
    miniPlane.material.diffuseTexture = new BABYLON.DynamicTexture(`${mini.id}DynamicTexture`, { width: 100, height: 100 }, scene);
    miniPlane.material.diffuseTexture.hasAlpha = true;
    miniPlane.position = new BABYLON.Vector3(0, 40, 0);
    miniPlane.parent = mini;
    return miniPlane;
  };*/

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
    miniLOS.position = new BABYLON.Vector3(0, 1, 0);
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
  //STLRW

  var targetFurthestMini = () => {
    if (players[currentPlayer.team].minis && players[currentPlayer.team].minis.length > 0) {
      var miniPosition = players[currentPlayer.team].minis.map(mini => mini.position.x);
      var furthestMiniIndex = currentPlayer.team === "teamWhite" ? miniPosition.indexOf(Math.min(...miniPosition)) : miniPosition.indexOf(Math.max(...miniPosition));
      var furthestMini = players[currentPlayer.team].minis[furthestMiniIndex];
      var furthestTarget = BABYLON.Mesh.CreateSphere("targetSphere", { size: 10 }, scene);
      furthestTarget.setEnabled(false);
      furthestTarget.position = new BABYLON.Vector3(furthestMini.position.x, furthestMini.position.y + 30, 0);
      camera.setTarget(furthestTarget);
      setTimeout(() => {
        furthestTarget.dispose();
      }, 1100)
    }
  };

  const importMiniModel = (miniName, team, index) => {
    BABYLON.SceneLoader.ImportMesh(
      "",
      `.${publicURL}/Models/`,
      `${miniName}.babylon`,
      scene,
      function (newMeshes) {
        let mini = BABYLON.Mesh.MergeMeshes(newMeshes);
        mini.translate(BABYLON.Axis.Y, 25, scene);
        mini.translate(BABYLON.Axis.X, team === "Black" ? -300 : 300, scene);
        mini.translate(BABYLON.Axis.Z, -200 + 200 * index, scene);
        mini.name = `${team.toLowerCase()}Mini`;
        mini.id = `${team.toLowerCase()}Mini${index + 1}`;
        mini.unit = "soldier";
        mini.team = `team${team}`;
        mini.rotation.y = team === "Black" ? BABYLON.Tools.ToRadians(-90) : BABYLON.Tools.ToRadians(90);
        mini.material = miniMaterial;
        mini.actionManager = team === "Black" ? teamBlackActionManager : teamWhiteActionManager;
        mini.enablePointerMoveEvents = true;

        mini.width = getWidth(mini);
        mini.height = getHeight(mini);

        createBase(mini, team);
        createLOS(mini, team);
        createShield(mini, team);
        //createTextPlane(mini);

        shadowGenerator.getShadowMap().renderList.push(mini);
        gameUpdate.addImportedMini(mini,`team${team}`);
        if (players.teamWhite.minis && players.teamWhite.minis.length === players.teamWhite.units.length) {
          targetFurthestMini();
        }
      }
    );
  }

  const importAllModels = () => {
    players.teamBlack.units.forEach((miniName, index) => importMiniModel(miniName, "Black", index))
    players.teamWhite.units.forEach((miniName, index) => importMiniModel(miniName, "White", index))
  }
  importAllModels();

  var obstacles = [];
  BABYLON.SceneLoader.ImportMesh(
    "",
    `.${publicURL}/Models/`,
    "container.babylon",
    scene,
    function (newMeshes) {
      var container = BABYLON.Mesh.MergeMeshes(newMeshes);

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

      container.setEnabled(false);
    }
  );

  var moveArea = BABYLON.MeshBuilder.CreateCylinder("moveArea", { height: 0.25, diameter: miniWidth * 8, tessellation: 256 }, scene);
  moveArea.material = invisibleMaterial;
  moveArea.actionManager = moveActionManager;
  moveArea.setEnabled(false);
  moveArea.position = new BABYLON.Vector3(0, 26, 0);

  var moveArea2 = BABYLON.MeshBuilder.CreateCylinder("moveArea", { height: 0.25, diameter: miniWidth * 8 + miniWidth, tessellation: 256 }, scene);
  moveArea2.material = moveAreaMat;
  moveArea2.parent = moveArea;

  var board;
  var map;
  BABYLON.SceneLoader.ImportMesh(
    "",
    "",
    `.${publicURL}/Models/setting.babylon`,
    scene,
    function (newMeshes) {
      board = newMeshes[0];
      board.scaling = new BABYLON.Vector3(1150, 1200, 1000);
      board.material = boardMaterial;
      shadowGenerator.getShadowMap().renderList.push(board);

      map = BABYLON.MeshBuilder.CreateBox("map", { width: 808, height: 606, depth: 1 }, scene);
      map.rotate(BABYLON.Axis.X, BABYLON.Tools.ToRadians(90), scene);
      map.material = groundMaterial;
      map.receiveShadows = true;
      map.translate(BABYLON.Axis.Y, 25, scene);
      map.actionManager = mapActionManager;
    }
  );
  //board is 24 inch to 32 inch;

  //Should import action tokens after switching Player
  var switchPlayer = () => {
    if (currentPlayer.team === "teamWhite") {
      currentPlayer.team = "teamBlack";
      camera.position = new BABYLON.Vector3(-700, 300, 0);
      targetFurthestMini();
    } else if (currentPlayer.team === "teamBlack") {
      currentPlayer.team = "teamWhite";
      camera.position = new BABYLON.Vector3(700, 300, 0);
      targetFurthestMini();
    }
    importActionTokens();
    gameUpdate.setCurrentPlayer({name: currentPlayer.player, team: currentPlayer.team });
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

  const cancelTargeting = () => {
    targets.forEach(target => {
      hl.removeMesh(target);
      if (scene.getMeshByName(`${selected.id}To${target.id}`)) {
        scene.removeMesh(scene.getMeshByName(`${selected.id}To${target.id}`));
      }
    });
    targets = [];
    if (scene.getMeshByName("directLOS")) {
      scene.getMeshByName("directLOS").dispose();
    }
    players[enemyPlayer.team].minis.forEach(mini => {
      if (scene.getMeshByName(`${mini.id}To${selected.id}`)) {
        scene.removeMesh(scene.getMeshByName(`${mini.id}To${selected.id}`));
      }
      removeDiceStat(mini);
      mini.diceAssigned = 0;
    })
    advancedTexture.removeControl(rollButton);
  }

  var selection = function (evt) {
    //left click
    if (evt.sourceEvent.which === 1) {
      let currentMesh = evt.meshUnderPointer;
      scene.hoverCursor = "pointer";
      if (selected === currentMesh) {
        if (targets.length === 0) {
          moveAction({ skip: true });
        }
        //camera.setTarget(board);
      } else if (currentMesh.name.includes("Mini")) {
        if (selected) {
          hl.removeMesh(selected);
        }
        if (currentPlayer.turnActions > 0) {
          cancelTargeting();
          hl.addMesh(currentMesh, BABYLON.Color3.White());
          hl.addMesh(moveArea, BABYLON.Color3.White());
          selected = currentMesh;
          previous.position = selected.position;
          moveArea.position = new BABYLON.Vector3(currentMesh.position.x, 26, currentMesh.position.z)
          moveArea.setEnabled(true);
        }
      }
    }
  }

  var cancelSelection = () => {
    if (selected && rotate && !inAttack) {
      if (previous.position) {
        selected.position = previous.position;
        selected.rotation = previous.rotation;
        moveArea.setEnabled(true);
        moveArea.position = new BABYLON.Vector3(previous.position.x, 26, previous.position.z);
        scene.getMeshByName(`${selected.id}lineOfSight`).setEnabled(false);
        if (scene.getMeshByName(`groundLOS${selected.id}`)) {
          scene.getMeshByName(`groundLOS${selected.id}`).setEnabled(false);
        }
      }
      canvas.removeEventListener("mousemove", rotateOnMouseMove);
      rotate = false;
    } else if (selected && !rotate) {
      moveArea.setEnabled(false);
      hl.removeMesh(selected);
      hl.removeMesh(moveArea);
      cancelTargeting();
      scene.removeMesh(clonedMini);
      scene.getMeshByName(`${selected.id}lineOfSight`).setEnabled(false);
      if (scene.getMeshByName(`groundLOS${selected.id}`)) {
        scene.getMeshByName(`groundLOS${selected.id}`).setEnabled(false);
      }
      targetFurthestMini();
      selected = "";
      scene.hoverCursor = "pointer";
      if (clonedMini) {
        clonedMini.dispose();
      }
    }
  }

  const noObstacle = (mini1, mini2) => {
    let origin = new BABYLON.Vector3(mini1.position.x, mini1.position.y + getHeight(mini1) * 0.75, mini1.position.z);

    let targetLeft = new BABYLON.Vector3(mini2.position.x, mini2.position.y + getHeight(mini2) * 0.75, mini2.position.z - mini2.width / 2 + mini2.width * 0.25);
    let targetRight = new BABYLON.Vector3(mini2.position.x, mini2.position.y + getHeight(mini2) * 0.75, mini2.position.z + mini2.width / 2 - mini2.width * 0.25);

    let directionLeft = targetLeft.subtract(origin);
    directionLeft = BABYLON.Vector3.Normalize(directionLeft);

    let directionRight = targetRight.subtract(origin);
    directionRight = BABYLON.Vector3.Normalize(directionRight);

    let length = BABYLON.Vector3.Distance(mini1.position, mini2.position) - getWidth(mini2) / 2;

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

    let length = getWidth(mini1) / 2 + getWidth(mini1);

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

  const isHigher = (mini1, mini2) => {
    if (mini1.position.y > mini2.position.y + getHeight(mini2)) {
      return true;
    } else {
      return false;
    };
  };

  const whatIsUnderneath = (mini) => {
    let origin = new BABYLON.Vector3(mini.position.x, mini.position.y, mini.position.z + getWidth(mini) / 2);
    let origin2 = new BABYLON.Vector3(mini.position.x, mini.position.y, mini.position.z - getWidth(mini) / 2);
    let origin3 = new BABYLON.Vector3(mini.position.x + getWidth(mini) / 2, mini.position.y, mini.position.z);
    let origin4 = new BABYLON.Vector3(mini.position.x - getWidth(mini) / 2, mini.position.y, mini.position.z);

    let direction = new BABYLON.Vector3(0, -1, 0);

    let length = getHeight(mini) / 2;

    let ray = new BABYLON.Ray(origin, direction, length);
    let ray2 = new BABYLON.Ray(origin2, direction, length);
    let ray3 = new BABYLON.Ray(origin3, direction, length);
    let ray4 = new BABYLON.Ray(origin4, direction, length);

    let hits = scene.multiPickWithRay(ray);
    let hits2 = scene.multiPickWithRay(ray2);
    let hits3 = scene.multiPickWithRay(ray3);
    let hits4 = scene.multiPickWithRay(ray4);

    if (hits.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      return hits.filter(hit => hit.pickedMesh.name.includes("obstacle")).map(hit => hit.pickedMesh)[0]
    } else if (hits2.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      return hits2.filter(hit => hit.pickedMesh.name.includes("obstacle")).map(hit => hit.pickedMesh)[0]
    } else if (hits3.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      return hits3.filter(hit => hit.pickedMesh.name.includes("obstacle")).map(hit => hit.pickedMesh)[0]
    } else if (hits4.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      return hits4.filter(hit => hit.pickedMesh.name.includes("obstacle")).map(hit => hit.pickedMesh)[0]
    } else if (hits.some(hit => hit.pickedMesh.name.includes("map"))) {
      return hits.filter(hit => hit.pickedMesh.name.includes("map")).map(hit => hit.pickedMesh)[0]
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
        scene.getMeshByName(`${selected.id}lineOfSight`).setEnabled(true)
        if (scene.getMeshByName(`groundLOS${selected.id}`)) {
          scene.getMeshByName(`groundLOS${selected.id}`).setEnabled(true);
        }
        moveArea.setEnabled(false);

        //In range position
        //scene.hoverCursor = "url('./Cursors/aim.cur'), auto";
      } else if (!enemyTarget.intersectsMesh(selected, false) && !rangeToTarget(selected, enemyTarget)) {
        //scene.hoverCursor = "url('./Cursors/unavailable.cur') 15 15, auto";
        moveArea.setEnabled(false);
        scene.getMeshByName(`${selected.id}lineOfSight`).setEnabled(true)
        if (scene.getMeshByName(`groundLOS${selected.id}`)) {
          scene.getMeshByName(`groundLOS${selected.id}`).setEnabled(true);
        }
      }
    }
  }

  var cancelLineOfSight = () => {
    if (selected) {
      scene.getMeshByName(`${selected.id}lineOfSight`).setEnabled(false);
      scene.getMeshByName(`${selected.id}shield`).setEnabled(false);
      players[enemyPlayer.team].minis.forEach(mini => scene.getMeshByName(`${mini.id}lineOfSight`).setEnabled(false));
      if (scene.getMeshByName(`groundLOS${selected.id}`)) {
        scene.getMeshByName(`groundLOS${selected.id}`).setEnabled(false);
      }
      if (!rotate && targets.length === 0) {
        moveArea.setEnabled(true);
      }
      removeCoverLogo(selected);
      players[enemyPlayer.team].minis.forEach(mini => {
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

  var cloneDice = (rolls, mini, delay, save) => {
    var dicePosition1 = new BABYLON.Vector3(mini.position.x + 10, mini.position.y + 7, mini.position.z + 30)
    var dicePosition2 = new BABYLON.Vector3(mini.position.x + 10, mini.position.y + 7, mini.position.z + 45)
    var dicePosition3 = new BABYLON.Vector3(mini.position.x + -5, mini.position.y + 7, mini.position.z + 30)
    var diceOddPosition3 = new BABYLON.Vector3(mini.position.x + -5, mini.position.y + 7, mini.position.z + 37.5)

    var dicePosition4 = new BABYLON.Vector3(mini.position.x + -5, mini.position.y + 7, mini.position.z + 45)
    var dicePosition5 = new BABYLON.Vector3(mini.position.x + -20, mini.position.y + 7, mini.position.z + 30)
    var diceOddPosition5 = new BABYLON.Vector3(mini.position.x + -20, mini.position.y + 7, mini.position.z + 37.5)

    var dicePosition6 = new BABYLON.Vector3(mini.position.x + -20, mini.position.y + 7, mini.position.z + 45)

    var dicePositions = [dicePosition1, dicePosition2, dicePosition3, dicePosition4, dicePosition5, dicePosition6];

    for (let i = 0; i < rolls.length; i++) {
      var diceIndex = i + 1
      if (save) {
        dice[rolls[i] - 1].material = diceMatRed;
      } else if (mini.name.includes("white")) {
        dice[rolls[i] - 1].material = diceMatWhite;
      } else if (mini.name.includes("black")) {
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
    var mini1Success = mini1Rolls.filter(roll => roll + mini1Mod >= players[mini1.team].armyStats.units.soldier.range.success);
    var mini2Success = mini2Rolls.filter(roll => roll + mini2Mod >= players[mini2.team].armyStats.units.soldier.defense.success);

    console.log("Player rolls:");
    console.log(mini1Rolls);
    console.log("He has a " + mini1Mod + " modifier to dice roll");


    console.log("Enemy rolls:");
    console.log(mini2Rolls);
    console.log("He has a " + mini2Mod + " modifier to dice roll");

    console.log("Player success rolls:")
    console.log(mini1Success);

    console.log("Enemy Success rolls:")
    console.log(mini2Success);

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
      console.log(`${mini1.id} wins with a higher roll!`);
      return mini1.name;
    } else if (Math.max(...mini2Success) > Math.max(...mini1Success)) {
      console.log(`${mini2.id} wins with a higher roll!`);
      return mini2.name;
    } else {
      //if no result left or equal, both miss.
      return null
    }
  }

  var rangeToTarget = (mini1, mini2) => {
    let rangeResult;

    let distance = BABYLON.Vector3.Distance(mini1.position, mini2.position) - mini2.width / 2;
    let mini1Team = mini1.name === "whiteMini" ? "teamWhite" : "teamBlack";
    let mini1MaxRange = players[mini1Team].armyStats.units[mini1.unit].maxRange
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
    if (players.teamBlack.startActions === 0 && players.teamWhite.startActions === 0) {
      console.log("tie")
      winner = null;
      console.log("Game Over. No Winners this time.")
    } else if (players.teamBlack.startActions === 0) {
      winner = "Team White";
      console.log(`Game Over. ${winner} wins!`)
    } else if (players.teamWhite.startActions === 0) {
      winner = "Team Black";
      console.log(`Game Over. ${winner} wins!`)
    } else {
      winner = undefined;
    }

    return winner;
  }

  var getMods = (mini1, mini2) => {
    let team = mini1.name.includes("white") ? "teamWhite" : "teamBlack";
    let range = rangeToTarget(mini1, mini2);
    let higherMod = isHigher(mini1, mini2) ? 1 : 0;
    let coverMod = isInCover(mini2, mini1) ? -1 : 0;
    let mods = coverMod + higherMod + players[team].armyStats.units[mini1.unit].range.mods[range];
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
          console.log('Stabbing ' + mini2.id + " with " + mini1.id)
          console.log("Player target roll: " + currentPlayer.army.units[mini1.unit].melee.success + "+")
          let meleeRoll = diceRoll(currentPlayer.army.units[mini1.unit].melee.roll);

          //Generate Dice
          cloneDice(meleeRoll, mini1, 1000);

          console.log("Enemy target roll: " + enemyPlayer.army.units[mini1.unit].melee.success + "+")
          let mini2MeleeRoll = diceRoll(1);
          //Generate Dice
          cloneDice(mini2MeleeRoll, mini2, 1000);

          winner = compareRolls(mini1, meleeRoll, 0, mini2, mini2MeleeRoll, 0);

        } else {
          //Range attack
          var mini1rolls = [];
          var modedRolls = [];
          var mini2Rolls = [];

          console.log(`Shooting ${mini2.id} with ${mini1.id} at range ${range}.`)
          // Check for enemy roll (Should be enemy line of sight when rotation is implemented!)
          console.log(mini1.id + " target roll: " + currentPlayer.army.units[mini1.unit].range.success + "+")

          if (!response) {
            mini1rolls = diceRoll(mini2.diceAssigned);
          } else {
            mini1rolls = diceRoll(1);
          }

          //Generate Dice
          cloneDice(mini1rolls, mini1, 1000);

          modedRolls = mini1rolls.map(roll => roll + mini1Mods);

          //Enemy Target Response
          if (rangeToTarget(mini2, mini1) && !response) {
            console.log(mini2.id + " target roll: " + enemyPlayer.army.units[mini2.unit].range.success + "+")

            mini2Rolls = diceRoll(1);
            //Generate Dice
            cloneDice(mini2Rolls, mini2, 1000);

            winner = compareRolls(mini1, mini1rolls, mini1Mods, mini2, mini2Rolls, mini2Mods);
          }

          //No response from enemy (range difference || angle || one way response)
          if (!winner) {
            if (modedRolls.some(roll => roll >= currentPlayer.army.units[mini1.unit].range.success)) {
              if (!response) {
                console.log("Player rolled:")
                console.log(mini1rolls);
                console.log("Success! You shot him!");
              } else {
                console.log("Enemy rolled:")
                console.log(mini1rolls);
                console.log("Hot damn! You got shot!");
              }
              winner = mini1.name;
            }
          }
        }

        //Defense Roll
        if (winner === mini1.name) {
          console.log(mini2.id + " is hit. Defense roll target: " + players[mini2.team].armyStats.units[mini2.unit].defense.success + "+");
          if (mini2CoverMod > 0) {
            console.log(mini2.id + " has +1 to dice roll as he is in cover.")
          }
          let defenseRoll = diceRoll(players[mini2.team].armyStats.units[mini2.unit].defense.roll)
          console.log(mini2.team + " player rolls : ");
          console.log(defenseRoll);
          setTimeout(function () {
            cloneDice(defenseRoll, mini2, 1250, true);
          }, 1250);
          //Cover modifiers to add here
          if (defenseRoll.some(roll => roll + mini2CoverMod >= players[mini2.team].armyStats.units[mini2.unit].defense.success)) {
            console.log("Defense roll successful. " + mini2.id + " saved!");
          } else {
            console.log(mini2.id + " killed!");
            setTimeout(function () {
              mini2.position = new BABYLON.Vector3(Math.floor(Math.random() * 190) - 200, 0, -440 + Math.floor(Math.random() * 30) - 15);
              mini2.name = "decor";
              mini2.isPickable = false;
              if (scene.getMeshByName(`${mini2.id}To${mini1.id}`)) {
                scene.removeMesh(scene.getMeshByName(`${mini2.id}To${mini1.id}`));
              }
              gameUpdate.removePlayerMini(mini2.id, mini2.team);
              removeCoverLogo(mini2);
              clearTarget(mini2);
              if (response) {
                cancelSelection();
              }
            }, 2500);
          }
        } else if (winner === mini2.name) {
          console.log(mini1.id + " is hit. Defense roll target: " + players[mini1.team].armyStats.units[mini1.unit].defense.success + "+")
          if (mini1CoverMod > 0) {
            console.log(mini1.id + " has +1 to dice roll as he is in cover.")
          }
          let defenseRoll = diceRoll(players[mini1.team].armyStats.units[mini1.unit].defense.roll, null, true, mini1);
          console.log(mini1.team + " player rolls : ");
          console.log(defenseRoll);
          setTimeout(function () {
            cloneDice(defenseRoll, mini1, 1250, true);
          }, 1250);
          if (defenseRoll.some(roll => roll + mini1CoverMod >= players[mini1.team].armyStats.units[mini1.unit].defense.success)) {
            console.log("Defense roll successful. " + mini1.id + " saved!");
          } else {
            console.log(mini1.id + " killed!");
            setTimeout(function () {
              camera.target = map;
              mini1.position = new BABYLON.Vector3(200 - Math.floor(Math.random() * 190), 0, -440 + Math.floor(Math.random() * 30) - 15);
              mini1.name = "decor";
              mini1.isPickable = false
              gameUpdate.removePlayerMini(mini1.id, mini1.team);
              removeCoverLogo(mini1);
              cancelSelection();
            }, 2500);
          }
        } else {
          console.log("No winners! Try again.")
        }
      }
    }
  }

  const attackTargets = async () => {
    inAttack = true;
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    if (selected && targets && targets.length > 0) {
      let enemyResponse = players[enemyPlayer.team].minis.filter(mini =>
        enemyPlayer.army.units[mini.unit].range.mods[rangeToTarget(mini, selected)] >= 0
      );
      let onWayResponse = enemyResponse.filter(enemy => !targets.some(target => target === enemy));

      await asyncForEach(targets, async (target) => {
        console.log(`Init attack on ${target.id}!`)
        if (selected) {
          onAttack(selected, target);
        }
        await waitFor(3000);
        console.log(`Attack on ${target.id} completed!`)
      });
      if (onWayResponse) {
        await asyncForEach(onWayResponse, async (enemy) => {
          console.log(`Init one way attack from ${enemy.id}!`)
          if (selected) {
            onAttack(enemy, selected, true);
          }
          await waitFor(3000);
          console.log(`One way attack from ${enemy.id} completed!`)
        });
      }
      console.log('Done with attacks.');
      gameUpdate.removeTurnAction(currentPlayer.team);
      scene.removeMesh(scene.getMeshByName("token"));
      cancelLineOfSight();
      cancelSelection();
      isTheGameOver();
      inAttack = false;

      if (players[currentPlayer.team].turnActions === 0) {
        setTimeout(function () {
          switchPlayer();
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
      moveArea.position = new BABYLON.Vector3(selected.position.x, 26, selected.position.z);
      moveArea.setEnabled(false);
      scene.getMeshByName(`${selected.id}lineOfSight`).setEnabled(true);

      //Fragment diffuse on main LOS and creating ground LOS clone
      if (whatIsUnderneath(selected) && whatIsUnderneath(selected).name.includes("obstacle")) {
        if (scene.getMeshByName(`groundLOS${selected.id}`)) {
          scene.getMeshByName(`groundLOS${selected.id}`).position.y = - selected.position.y + 26;
          scene.getMeshByName(`groundLOS${selected.id}`).setEnabled(true);
        } else {
          scene.getMeshByName(`${selected.id}lineOfSight`).clone(`groundLOS${selected.id}`).position.y = - selected.position.y + 26;
        }

        if (scene.getMeshByName("groundMoveArea")) {
          scene.getMeshByName("groundMoveArea").position.y = selected.position.y - getHeight(selected) / 2 - 5;
        } else {
          moveArea.clone("groundMoveArea");
          scene.getMeshByName("groundMoveArea").parent = moveArea;
          scene.getMeshByName("groundMoveArea").position = new BABYLON.Vector3(0, selected.position.y - getHeight(selected) / 2 - 5, 0);
        }

        let obstacleTemplateArea = `if( vPositionW.z  < ${Math.round(whatIsUnderneath(selected).position.z - getLength(whatIsUnderneath(selected)) / 2)}.){ discard; } if( vPositionW.z  > ${Math.round(whatIsUnderneath(selected).position.z + getLength(whatIsUnderneath(selected)) / 2)}.){ discard; } if( vPositionW.x  > ${Math.round(whatIsUnderneath(selected).position.x + getWidth(whatIsUnderneath(selected)) / 2)}.){ discard; } if( vPositionW.x  < ${Math.round(whatIsUnderneath(selected).position.x - getWidth(whatIsUnderneath(selected)) / 2)}.){ discard; }`;
        let highMat = new CustomMaterial("highMat", scene);
        highMat.alpha = 0.25;
        highMat.Fragment_Custom_Diffuse(obstacleTemplateArea);
        highMat.diffuseColor = scene.getMaterialByName(selected.losMat[0]).diffuseColor;

        scene.getMeshByName(`${selected.id}lineOfSight`).material = highMat;
        scene.getMeshByName(`${selected.id}lineOfSight`)._children.forEach((los, index) => {
          los.material = new CustomMaterial(`highMat${index}`, scene);
          los.material.alpha = 0.25;
          los.material.Fragment_Custom_Diffuse(obstacleTemplateArea);
          los.material.diffuseColor = scene.getMaterialByName(selected.losMat[index + 1]).diffuseColor;
        });
        scene.getMeshByName("groundMoveArea").material = new CustomMaterial(`highMoveMat`, scene);
        scene.getMeshByName("groundMoveArea").material.alpha = 0.25;
        scene.getMeshByName("groundMoveArea").material.Fragment_Custom_Diffuse(obstacleTemplateArea);
        scene.getMeshByName("groundMoveArea")._children.forEach(child => child.setEnabled(false));
      } else {
        scene.getMeshByName(`${selected.id}lineOfSight`).material = scene.getMaterialByName(selected.losMat[0]);
        scene.getMeshByName(`${selected.id}lineOfSight`)._children.forEach((los, index) => los.material = scene.getMaterialByName(selected.losMat[index + 1]));
        moveArea2.material = moveAreaMat;
        if (scene.getMeshByName(`groundLOS${selected.id}`)) {
          scene.getMeshByName(`groundLOS${selected.id}`).dispose();
        }
        if (scene.getMeshByName("groundMoveArea")) {
          scene.getMeshByName("groundMoveArea").dispose();
        }
      };

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
        rotate = false;
        previous.position = null;
        previous.rotation = null;
        cancelSelection();

        if (players[currentPlayer.team].turnActions === 0) {
          setTimeout(function () {
            switchPlayer();
          }, 1000);
        }
      }
    }
  }

  var onMouseMove = function (evt) {
    evt.preventDefault();
    if (selected && getGroundPosition(evt)) {
      let otherMinis = [...players[enemyPlayer.team].minis, ...players[currentPlayer.team].minis.filter(mini => mini.id !== selected.id)];
      //Miniature collision
      if (!otherMinis.some(mini =>
        getGroundPosition(evt).x < mini.position.x + getWidth(mini) - 2 &&
        getGroundPosition(evt).x > mini.position.x - getWidth(mini) + 2 &&
        getGroundPosition(evt).z < mini.position.z + getWidth(mini) - 2 &&
        getGroundPosition(evt).z > mini.position.z - getWidth(mini) + 2
      )) {
        //Obstacle collision
        if (
          !obstacles.filter(obstacle => getHeight(obstacle) + obstacle.position.y - (getHeight(obstacle) / 2) > getHeight(selected) + selected.position.y).some(obstacle =>
            getGroundPosition(evt).x < obstacle.position.x + getWidth(obstacle) / 2 + getWidth(selected) / 2 &&
            getGroundPosition(evt).x > obstacle.position.x - getWidth(obstacle) / 2 - getWidth(selected) / 2 &&
            getGroundPosition(evt).z < obstacle.position.z + getLength(obstacle) / 2 + getWidth(selected) / 2 &&
            getGroundPosition(evt).z > obstacle.position.z - getLength(obstacle) / 2 - getWidth(selected) / 2
          )
        ) {
          //game area limits
          if (getGroundPosition(evt).x > -388 && getGroundPosition(evt).x < 388 && getGroundPosition(evt).z > -285 && getGroundPosition(evt).z < 285) {
            //Filtering out obstacles shorter than mini size. Allows vertical move.
            var currentObstacle = obstacles.filter(obstacle => getHeight(obstacle) < getHeight(selected) + selected.position.y - 25).filter(obstacle =>
              getGroundPosition(evt).x < obstacle.position.x + getWidth(obstacle) / 2 + getWidth(selected) / 2 &&
              getGroundPosition(evt).x > obstacle.position.x - getWidth(obstacle) / 2 - getWidth(selected) / 2 &&
              getGroundPosition(evt).z < obstacle.position.z + getLength(obstacle) / 2 + getWidth(selected) / 2 &&
              getGroundPosition(evt).z > obstacle.position.z - getLength(obstacle) / 2 - getWidth(selected) / 2
            );
            if (currentObstacle && currentObstacle.length > 0) {
              //Vertical move
              clonedMini.position = new BABYLON.Vector3(getGroundPosition(evt).x, getHeight(currentObstacle[0]) + 26, getGroundPosition(evt).z);
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
    var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh === map; });
    if (pickinfo.hit) {
      return pickinfo.pickedPoint;
    }

    return null;
  }

  const addTarget = (enemyTarget) => {
    advancedTexture.addControl(rollButton);
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

  const clearTarget = (target) => {
    if (target) {
      target.diceAssigned = 0;
    }
    // Removed any target from the targets array with 0 dice assigned
    targets.forEach((target, index) => {
      if (target.diceAssigned === 0) {
        targets.splice(index, 1);
        hl.removeMesh(target);
        removeDiceStat(target);
        scene.removeMesh(scene.getMeshByName(`${selected.id}To${target.id}`));
      }
    });
  }

  const calculateSuccess = (mini1, mini2) => {
    let mods;
    let success;
    if (rangeToTarget(mini1, mini2) === "c") {
      success = currentPlayer.army.units.soldier.melee.success;
    } else {
      mods = getMods(mini1, mini2);
      success = currentPlayer.army.units.soldier.range.success - mods
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

  const assignTarget = (ev) => {
    let enemyTarget = ev.meshUnderPointer;

    var whoHasMoreDice = targets.map(target => target.diceAssigned).indexOf(Math.max(...targets.filter(target => target.id !== enemyTarget.id).map(target => target.diceAssigned)));
    if (selected && enemyTarget && enemyTarget.name.includes("Mini") && rangeToTarget(selected, enemyTarget) && calculateSuccess(selected, enemyTarget) <= 6) {
      moveArea.setEnabled(false);
      if (targets.length === 0) {
        enemyTarget.diceAssigned = currentPlayer.army.units[selected.unit].range.roll;
        addTarget(enemyTarget);
      } else if (whoHasMoreDice >= 0 && targets.reduce((acc, target) => acc + target.diceAssigned, 0) === currentPlayer.army.units[selected.unit].range.roll && targets.filter(target => target.id !== enemyTarget.id).every(target => target.diceAssigned >= 1)) {
        enemyTarget.diceAssigned ? enemyTarget.diceAssigned += 1 : enemyTarget.diceAssigned = 1;
        targets[whoHasMoreDice].diceAssigned -= 1;
        addTarget(enemyTarget);
        clearTarget();
      } else {
        if (targets.length > 1 && targets.every(target => target.diceAssigned === 1)) {
          let removedTarget = targets.splice(targets.indexOf(targets[whoHasMoreDice]), 1)[0];
          clearTarget(removedTarget);
          enemyTarget.diceAssigned ? enemyTarget.diceAssigned += 1 : enemyTarget.diceAssigned = 1;
          addTarget(enemyTarget);
        }
        if (enemyTarget.diceAssigned === currentPlayer.army.units[selected.unit].range.roll) {
          clearTarget(enemyTarget);
          cancelTargeting();
        }
      }
    }
  }

  const createDirectLOS = (mini1, mini2, response) => {
    let origin;
    let target;
    if (response) {
      origin = new BABYLON.Vector3(mini1.position.x, mini1.position.y + getHeight(mini1) * 0.70, mini1.position.z);
      target = new BABYLON.Vector3(mini2.position.x, mini2.position.y + getHeight(mini2) * 0.70, mini2.position.z);
      let colorArray1 = [new BABYLON.Color4(215 / 255, 195 / 255, 58 / 255, 1), new BABYLON.Color4(0, 0, 0, 0)];
      BABYLON.MeshBuilder.CreateLines(`${mini1.id}To${mini2.id}`, { points: [origin, target], colors: colorArray1, updatable: true }, scene);
    } else {
      origin = new BABYLON.Vector3(mini1.position.x, mini1.position.y + getHeight(mini1) * 0.80, mini1.position.z);
      target = new BABYLON.Vector3(mini2.position.x, mini2.position.y + getHeight(mini2) * 0.80, mini2.position.z);
      let colorArray2 = [new BABYLON.Color4(1, 1, 1, 1), new BABYLON.Color4(0, 0, 0, 0)]
      BABYLON.MeshBuilder.CreateLines(`${mini1.id}To${mini2.id}`, { points: [origin, target], colors: colorArray2, updatable: true }, scene);
    }
  }

  const targetResponse = () => {
    if (selected && targets) {
      players[enemyPlayer.team].minis.forEach(mini => {
        if (!scene.getMeshByName(`${mini.id}To${selected.id}`)) {
          if (enemyPlayer.army.units[mini.unit].range.mods[rangeToTarget(mini, selected)] >= 0 || scene.getMeshByName(`${selected.id}To${mini.id}`)) {
            createDirectLOS(mini, selected, true);
          }
        }
      })
    }
  }

  moveActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
      clonedMini = selected.clone();
      clonedMini.position = selected.position;
      clonedMini.isPickable = false;
      clonedMini._children.forEach(child => child.setEnabled(false));

      clonedMini.material = transparentMaterial;
      canvas.addEventListener("mousemove", onMouseMove, false);
      canvas.addEventListener("click", moveAction, false);
    })
  );

  moveActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
      clonedMini.dispose();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", moveAction);
    })
  );

  mapActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
      if (selected && rotate) {
        scene.getMeshByName(`${selected.id}lineOfSight`).setEnabled(true)
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
        scene.getMeshByName(`${selected.id}lineOfSight`).setEnabled(false);
        if (scene.getMeshByName(`groundLOS${selected.id}`)) {
          scene.getMeshByName(`groundLOS${selected.id}`).setEnabled(false);
        }
      }
      canvas.removeEventListener("mousemove", rotateOnMouseMove);
      canvas.removeEventListener("click", rotateAction);
    })
  );

  //Select current player mini
  teamBlackActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function (ev) {
      if (currentPlayer.team === "teamBlack" && !inAttack) {
        if (rotate) {
          rotateAction(ev);
        } else {
          selection(ev);
        }
      }
    })
  );
  //Attack opposite team
  teamBlackActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function (ev) {
      if (currentPlayer.team === "teamWhite" && !rotate && !inAttack) {
        //onAttack(ev);
        assignTarget(ev);
      }
    })
  );

  //LOS on opposite team
  teamBlackActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
      if (currentPlayer.team === "teamWhite" && !inAttack) {
        handleLineOfSight(ev);
      }
    })
  );

  teamBlackActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
      if (currentPlayer.team === "teamWhite") {
        cancelLineOfSight();
      }
    })
  );


  //Select current player mini
  teamWhiteActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function (ev) {
      if (currentPlayer.team === "teamWhite" && !inAttack) {
        if (rotate) {
          rotateAction(ev);
        } else {
          selection(ev);
        }
      }
    })
  );
  //Attack opposite team
  teamWhiteActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function (ev) {
      if (currentPlayer.team === "teamBlack" && !rotate) {
        //onAttack(ev);
        assignTarget(ev);
      }
    })
  );

  //LOS on opposite team
  teamWhiteActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
      if (currentPlayer.team === "teamBlack" && !inAttack) {
        handleLineOfSight(ev);
      }
    })
  );

  teamWhiteActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
      if (currentPlayer.team === "teamBlack") {
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