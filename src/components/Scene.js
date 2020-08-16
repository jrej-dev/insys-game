import React from 'react';
import * as BABYLON from '@babylonjs/core/Legacy/legacy';
//import * as BABYLON from 'babylonjs';
//import * as Materials from 'babylonjs-materials';
import SceneComponent from './SceneComponent';
import { armies } from './armies';
import '../App.css';

BABYLON.Animation.AllowMatricesInterpolation = true;

const onSceneReady = scene => {
  const canvas = scene.getEngine().getRenderingCanvas();

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
  backgroundMaterial.opacityTexture = new BABYLON.Texture("./Textures/OpacityTemplate.png", scene);
  backgroundMaterial.backFaceCulling = false;
  background.material = backgroundMaterial;
  background.translate(BABYLON.Axis.Y, -1, scene);
  background.visibility = 0.4;
  background.receiveShadows = true;

  var boardMaterial = new BABYLON.StandardMaterial("boardMaterial", scene);
  boardMaterial.diffuseTexture = new BABYLON.Texture("./Textures/Wood/Wood_021_basecolor.jpg", scene);
  boardMaterial.bumpTexture = new BABYLON.Texture("./Textures/Wood/Wood_021_normal.jpg", scene);
  boardMaterial.ambientTexture = new BABYLON.Texture("./Textures/Wood/Wood_021_ambientOcclusion.jpg", scene);

  var groundMaterial = new BABYLON.StandardMaterial("asphaltMaterial", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("./Textures/Asphalt/Asphalt_001_COLOR.jpg", scene);
  groundMaterial.bumpTexture = new BABYLON.Texture("./Textures/Asphalt/Asphalt_001_NRM.jpg", scene);
  groundMaterial.specularTexture = new BABYLON.Texture("./Textures/Asphalt/Asphalt_001_SPEC.jpg", scene);
  groundMaterial.ambientTexture = new BABYLON.Texture("./Textures/Asphalt/Asphalt_001_OCC.jpg", scene);

  var miniMaterial = new BABYLON.StandardMaterial("plasticMaterial", scene);
  miniMaterial.diffuseColor = new BABYLON.Color3(220 / 255, 220 / 255, 220 / 255);

  var tokenMaterialBlack = new BABYLON.StandardMaterial("tokenMaterial", scene);
  tokenMaterialBlack.diffuseTexture = new BABYLON.Texture("./Textures/Token/Coin_low_Coin_material_BaseColor2.png", scene);
  tokenMaterialBlack.bumpTexture = new BABYLON.Texture("./Textures/Token/Coin_low_Coin_material_Normal.png", scene);

  var tokenMaterialWhite = new BABYLON.StandardMaterial("tokenMaterial", scene);
  tokenMaterialWhite.diffuseTexture = new BABYLON.Texture("./Textures/Token/Coin_low_Coin_material_BaseColor.png", scene);
  tokenMaterialWhite.bumpTexture = new BABYLON.Texture("./Textures/Token/Coin_low_Coin_material_Normal.png", scene);

  var baseMaterialBlack = new BABYLON.StandardMaterial("baseMaterial", scene);
  baseMaterialBlack.diffuseColor = new BABYLON.Color3.Black();

  var baseMaterialWhite = new BABYLON.StandardMaterial("baseMaterial", scene);
  baseMaterialWhite.diffuseColor = new BABYLON.Color3.White();

  var diceMatWhite = new BABYLON.StandardMaterial("diceMatWhite", scene);
  diceMatWhite.diffuseColor = new BABYLON.Color3.White();

  var diceMatBlack = new BABYLON.StandardMaterial("diceMatBlack", scene);
  diceMatBlack.diffuseColor = new BABYLON.Color3(55 / 255, 71 / 255, 79 / 255);

  //var gameAreaTemplate = 'if( vPositionW.z  < -340.){ discard; } if( vPositionW.z  > 340.){ discard; } if( vPositionW.x  > 450.){ discard; } if( vPositionW.x  < -450.){ discard; }';

  var moveAreaMat = new BABYLON.StandardMaterial("moveAreaMat", scene);
  moveAreaMat.alpha = 0.25;
  //moveAreaMat.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightTransparency = 0.25;

  var lineOfSightMatW = new BABYLON.StandardMaterial("losMatSW", scene);
  lineOfSightMatW.alpha = lineOfSightTransparency;
  //lineOfSightMatW.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightMMatW = new BABYLON.StandardMaterial("losMatMW", scene);
  lineOfSightMMatW.alpha = lineOfSightTransparency;
  //lineOfSightMMatW.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightLMatW = new BABYLON.StandardMaterial("losMatLW", scene);
  lineOfSightLMatW.alpha = lineOfSightTransparency;
  //lineOfSightLMatW.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightXLMatW = new BABYLON.StandardMaterial("losMatXLW", scene);
  lineOfSightXLMatW.alpha = lineOfSightTransparency;
  //lineOfSightXLMatW.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightMatB = new BABYLON.StandardMaterial("losMatSB", scene);
  lineOfSightMatB.alpha = lineOfSightTransparency;
  //lineOfSightMatB.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightMMatB = new BABYLON.StandardMaterial("losMatMB", scene);
  lineOfSightMMatB.alpha = lineOfSightTransparency;
  //lineOfSightMMatB.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightLMatB = new BABYLON.StandardMaterial("losMatLB", scene);
  lineOfSightLMatB.alpha = lineOfSightTransparency;
  //lineOfSightLMatB.Fragment_Custom_Diffuse(gameAreaTemplate);

  var lineOfSightXLMatB = new BABYLON.StandardMaterial("losMatXLB", scene);
  lineOfSightXLMatB.alpha = lineOfSightTransparency;
  //lineOfSightXLMatB.Fragment_Custom_Diffuse(gameAreaTemplate);

  //Game initiation
  // Associate Users with teams (teamWhite || teamBlack);
  // example: teamWhite.player = "@jrej";
  // example: teamBlack.player = "@inkito";

  var players = {
    teamWhite: {
      player: "@jrej",
      army: "outerRing",
      get armyStats() { return armies[this.army] },
      units: ["soldier", "soldier", "soldier"],
      minis: [],
      startActions: 6,
      turnActions: 6,
      //Army value would be calculated at the time of unit selection
      get armyValue() { return this.units.reduce((acc, value) => { return acc + this.armyStats["units"][value]["cost"] }, 0) }
    },
    teamBlack: {
      player: "@inkito",
      army: "tabForces",
      get armyStats() { return armies[this.army] },
      units: ["soldier", "soldier", "soldier"],
      minis: [],
      startActions: 6,
      turnActions: 6,
      //Army value would be calculated at the time of unit selection
      get armyValue() { return this.units.reduce((acc, value) => { return acc + this.armyStats["units"][value]["cost"] }, 0) }
    }
  };

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
      "./Models/",
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
        players[currentPlayer.team].turnActions = players[currentPlayer.team].startActions;
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
    "./Models/",
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
    "./Models/",
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
    "./Models/",
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
    "./Models/",
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
    "./Models/",
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
    "./Models/",
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
  LOS.position = new BABYLON.Vector3(0, 100, 0);
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
  slicer.position = new BABYLON.Vector3(players[currentPlayer.team].armyStats.units.soldier.maxRange, 100, 0);
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
  /*lineOfSightXL.isPickable =*/ lineOfSightL.isPickable = lineOfSightM.isPickable = false;

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

  var getHeight = (mesh) => {
    return mesh.getBoundingInfo().boundingBox.extendSize.y * 2 * mesh.scaling.y
  };

  var getWidth = (mesh) => {
    return mesh.getBoundingInfo().boundingBox.extendSize.x * 2 * mesh.scaling.x
  };

  var getLength = (mesh) => {
    return mesh.getBoundingInfo().boundingBox.extendSize.z * 2 * mesh.scaling.z
  };

  var blackMini1;
  var blackMini2;
  var blackMini3;
  var blackMini1LOS
  var blackMini2LOS
  var blackMini3LOS
  BABYLON.SceneLoader.ImportMesh(
    "",
    "./Models/",
    "STLRW.babylon",
    scene,
    function (newMeshes) {
      let blackBase1 = BABYLON.MeshBuilder.CreateCylinder("whiteBase", { height: 5.5, diameter: 27, tessellation: 128 }, scene);
      blackBase1.material = baseMaterialBlack;
      blackBase1.translate(BABYLON.Axis.Y, 25, scene);
      blackBase1.translate(BABYLON.Axis.X, -300, scene);

      blackMini1 = newMeshes[0];
      blackMini1.translate(BABYLON.Axis.Y, 25, scene);
      blackMini1.translate(BABYLON.Axis.X, -300, scene);
      blackMini1.name = "blackMini";
      blackMini1.id = "blackMini1";
      blackMini1.unit = "soldier";
      blackMini1.rotation.y = BABYLON.Tools.ToRadians(-90);
      blackMini1.material = miniMaterial;
      blackMini1.actionManager = teamBlackActionManager;
      blackMini1.enablePointerMoveEvents = true;

      blackMini1.addChild(blackBase1);

      blackMini1.width = getWidth(blackMini1);
      blackMini1.height = getHeight(blackMini1);
      blackMini1.checkCollisions = true;
      blackMini1.collisionGroup = 1;
      blackMini1.collisionMask = 1;


      blackMini1LOS = lineOfSight.clone();
      blackMini1LOS.parent = blackMini1;
      blackMini1LOS.position = new BABYLON.Vector3(0, 1, 0);
      blackMini1LOS.rotation.y = BABYLON.Tools.ToRadians(-90);
      blackMini1LOS.setEnabled(false);
      blackMini1LOS.material = lineOfSightMatB;
      blackMini1LOS._children[0].material = lineOfSightMMatB;
      blackMini1LOS._children[1].material = lineOfSightLMatB
      //blackMini1LOS._children[2].material = lineOfSightXLMatB

      lineOfSightMatB.diffuseColor = getLosColor(blackMini1.unit, "teamBlack", "s"); //blue
      lineOfSightMMatB.diffuseColor = getLosColor(blackMini1.unit, "teamBlack", "m"); //green
      lineOfSightLMatB.diffuseColor = getLosColor(blackMini1.unit, "teamBlack", "l"); //yellow
      //lineOfSightXLMatB.diffuseColor = getLosColor(blackMini1.unit, "teamBlack", "xl"); //yellow

      blackMini2 = blackMini1.clone();
      blackMini2.name = "blackMini";
      blackMini2.id = "blackMini2";
      blackMini2.unit = "soldier";
      blackMini2.material = miniMaterial;
      blackMini2.actionManager = teamBlackActionManager;
      blackMini2.translate(BABYLON.Axis.Z, 200, scene);
      blackMini2LOS = blackMini2._children[1];
      blackMini2LOS.setEnabled(false);

      blackMini3 = blackMini1.clone();
      blackMini3.name = "blackMini";
      blackMini3.id = "blackMini3";
      blackMini3.unit = "soldier";
      blackMini3.material = miniMaterial;
      blackMini3.actionManager = teamBlackActionManager;
      blackMini3.translate(BABYLON.Axis.Z, -200, scene);
      blackMini3LOS = blackMini3._children[1];
      blackMini3LOS.setEnabled(false)

      shadowGenerator.getShadowMap().renderList.push(blackMini1, blackMini2, blackMini3);
      players.teamBlack.minis.push(blackMini1, blackMini2, blackMini3);
    }
  );


  var whiteMini1;
  var whiteMini2;
  var whiteMini3;
  var clonedMini;
  var whiteMini1LOS
  var whiteMini2LOS
  var whiteMini3LOS
  //Consider looping through unit array of team
  BABYLON.SceneLoader.ImportMesh(
    "",
    "./Models/",
    "SKNCK.babylon",
    scene,
    function (newMeshes) {
      let whiteBase1 = BABYLON.MeshBuilder.CreateCylinder("whiteBase", { height: 5.5, diameter: 27, tessellation: 128 }, scene);
      whiteBase1.material = baseMaterialWhite;
      whiteBase1.translate(BABYLON.Axis.Y, 25, scene);
      whiteBase1.translate(BABYLON.Axis.X, 300, scene);
      whiteMini1 = BABYLON.Mesh.MergeMeshes(newMeshes);
      whiteMini1.translate(BABYLON.Axis.Y, 25, scene);
      whiteMini1.translate(BABYLON.Axis.X, 300, scene);
      whiteMini1.rotation.y = BABYLON.Tools.ToRadians(90);
      whiteMini1.name = "whiteMini";
      whiteMini1.id = "whiteMini1";
      whiteMini1.unit = "soldier";
      whiteMini1.material = miniMaterial;
      whiteMini1.checkCollisions = true;
      whiteMini1.actionManager = teamWhiteActionManager;
      whiteMini1.collisionGroup = 1;
      whiteMini1.collisionMask = 1;

      whiteMini1.addChild(whiteBase1);
      camera.setTarget(whiteMini1);

      whiteMini1.width = getWidth(whiteMini1);
      whiteMini1.height = getHeight(whiteMini1);

      whiteMini1LOS = lineOfSight.clone();
      whiteMini1LOS.parent = whiteMini1;
      whiteMini1LOS.position = new BABYLON.Vector3(0, 1, 0);
      whiteMini1LOS.rotation.y = BABYLON.Tools.ToRadians(-90);
      whiteMini1LOS.setEnabled(false);
      whiteMini1LOS.material = lineOfSightMatW;
      whiteMini1LOS._children[0].material = lineOfSightMMatW;
      whiteMini1LOS._children[1].material = lineOfSightLMatW;
      //whiteMini1LOS._children[2].material = lineOfSightXLMatW;

      lineOfSightMatW.diffuseColor = getLosColor(whiteMini1.unit, "teamWhite", "s"); //green
      lineOfSightMMatW.diffuseColor = getLosColor(whiteMini1.unit, "teamWhite", "m"); //blue
      lineOfSightLMatW.diffuseColor = getLosColor(whiteMini1.unit, "teamWhite", "l"); //yellow
      //lineOfSightXLMatW.diffuseColor = getLosColor(whiteMini1.unit, "teamWhite", "xl"); //red

      whiteMini2 = whiteMini1.clone();
      whiteMini2.name = "whiteMini";
      whiteMini2.id = "whiteMini2";
      whiteMini2.unit = "soldier";
      whiteMini2.material = miniMaterial;
      whiteMini2.actionManager = teamWhiteActionManager;
      whiteMini2.translate(BABYLON.Axis.Z, 200, scene);
      whiteMini2LOS = whiteMini2._children[1];
      whiteMini2LOS.setEnabled(false);

      whiteMini3 = whiteMini1.clone();
      whiteMini3.name = "whiteMini";
      whiteMini3.id = "whiteMini3";
      whiteMini3.unit = "soldier";
      whiteMini3.material = miniMaterial;
      whiteMini3.actionManager = teamWhiteActionManager;
      whiteMini3.translate(BABYLON.Axis.Z, -200, scene);
      whiteMini3LOS = whiteMini3._children[1];
      whiteMini3LOS.setEnabled(false);

      shadowGenerator.getShadowMap().renderList.push(whiteBase1, whiteMini1, whiteMini2, whiteMini3);
      players.teamWhite.minis.push(whiteMini1, whiteMini2, whiteMini3);
    }
  );

  var obstacles = [];
  BABYLON.SceneLoader.ImportMesh(
    "",
    "./Models/",
    "container.babylon",
    scene,
    function (newMeshes) {
      var container = BABYLON.Mesh.MergeMeshes(newMeshes);

      //container.material = diceMaterial;
      container.scaling = new BABYLON.Vector3(2, 2, 2);
      container.translate(BABYLON.Axis.Y, 50, scene);
      container.translate(BABYLON.Axis.X, 150, scene);
      container.translate(BABYLON.Axis.Z, 125, scene);
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

      var container2 = container.clone("obstacle")
      container2.position = new BABYLON.Vector3(200, 50, 125);
      container2.material = greenMat;

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
      container7.position = new BABYLON.Vector3(-200, 50, -125);
      container7.material = greenMat;

      var container8 = container.clone("obstacle")
      container8.position = new BABYLON.Vector3(-150, 50, -125);
      container8.material = greyMat;

      var container9 = container.clone("obstacle")
      container9.position = new BABYLON.Vector3(-175, 100, -150);
      container9.scaling.z = 1;

      var container10 = container.clone("obstacle")
      container10.position = new BABYLON.Vector3(175, 100, 100);
      container10.scaling.z = 1;
      container10.material = greyMat;

      var container11 = container.clone("obstacle")
      container11.position = new BABYLON.Vector3(250, 35, 150);
      container11.scaling.z = 1;
      container11.scaling.y = 1;
      container11.material = greyMat;

      var container12 = container.clone("obstacle")
      container12.position = new BABYLON.Vector3(-250, 35, -100);
      container12.scaling.z = 1;
      container12.scaling.y = 1;
      container12.material = redMat;

      shadowGenerator.getShadowMap().renderList.push(container, container2, container3, container4, container5, container6, container7, container8, container9, container10, container11, container12);
      obstacles.push(container, container2, container3, container4, container5, container6, container7, container8, container9, container10, container11, container12);
    }
  );


  var moveArea = BABYLON.MeshBuilder.CreateCylinder("moveArea", { height: 0.25, diameter: miniWidth * 8, tessellation: 256 }, scene);
  moveArea.material = invisibleMaterial;
  moveArea.actionManager = moveActionManager;
  moveArea.setEnabled(false);
  moveArea.position = new BABYLON.Vector3(0, 27, 0);

  var moveArea2 = BABYLON.MeshBuilder.CreateCylinder("moveArea", { height: 0.25, diameter: miniWidth * 8 + miniWidth, tessellation: 256 }, scene);
  moveArea2.material = moveAreaMat;
  moveArea2.parent = moveArea;

  var board;
  var map;
  BABYLON.SceneLoader.ImportMesh(
    "",
    "./Models/",
    "setting.babylon",
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
  };

  //Mini selected by player1;
  var selected = "";
  var rotate = false;
  var previous = {
    position: null,
    rotation: null
  };

  var selection = function (evt) {
    //left click
    if (evt.sourceEvent.which === 1) {
      let currentMesh = evt.meshUnderPointer;
      scene.hoverCursor = "pointer";
      if (selected === currentMesh) {
        moveAction({ skip: true });
        //camera.setTarget(board);
      } else if (currentMesh.id.includes("Mini")) {
        if (selected) {
          hl.removeMesh(selected);
        }
        if (currentPlayer.turnActions > 0) {
          hl.addMesh(currentMesh, BABYLON.Color3.White());
          hl.addMesh(moveArea, BABYLON.Color3.White());
          selected = currentMesh;
          previous.position = selected.position;
          moveArea.position = new BABYLON.Vector3(currentMesh.position.x, currentMesh.position.y + 2, currentMesh.position.z)
          moveArea.setEnabled(true);
        }
      }
    }
  }

  var cancelSelection = () => {
    if (selected && rotate) {
      if (previous.position) {
        selected.position = previous.position;
        selected.rotation = previous.rotation;
        moveArea.setEnabled(true);
        moveArea.position = new BABYLON.Vector3(previous.position.x, previous.position.y + 2, previous.position.z);
        selected._children[1].setEnabled(false);
        canvas.removeEventListener("mousemove", rotateOnMouseMove);
        rotate = false;
      }
    } else if (selected && !rotate) {
      moveArea.setEnabled(false);
      hl.removeMesh(selected);
      hl.removeMesh(moveArea);
      scene.removeMesh(clonedMini);
      selected._children[1].setEnabled(false);
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
    let originLeft = new BABYLON.Vector3(mini1.position.x, mini1.position.y + 5, mini1.position.z - mini1.width / 2 + mini1.width * 0.25);
    let originRight = new BABYLON.Vector3(mini1.position.x, mini1.position.y + 5, mini1.position.z + mini1.width / 2 - mini1.width * 0.25);

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
      console.log(mini1.name + " is in cover!")
      return true;
    } else if (hitsRight.some(hit => hit.pickedMesh.name.includes("obstacle"))) {
      console.log(mini1.name + " is in cover!")
      return true;
    } else {
      console.log(mini1.name + " is NOT in cover!")
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

  var handleLineOfSight = (ev) => {
    var enemyTarget = ev.meshUnderPointer;
    if (selected && noObstacle(selected, enemyTarget)) {
      if (enemyTarget.intersectsMesh(selected, false)) {
        //Melee position
        //scene.hoverCursor = "url('./Cursors/melee.cur') 10 10, auto";

      } else if (rangeToTarget(selected, enemyTarget)) {
        selected._children[1].setEnabled(true);
        moveArea.setEnabled(false);

        //In range position
        //scene.hoverCursor = "url('./Cursors/aim.cur'), auto";
      } else if (!enemyTarget.intersectsMesh(selected, false) && !rangeToTarget(selected, enemyTarget)) {
        //scene.hoverCursor = "url('./Cursors/unavailable.cur') 15 15, auto";
        moveArea.setEnabled(false);
        selected._children[1].setEnabled(true);
      }
    }
  }

  var cancelLineOfSight = () => {
    if (selected) {
      selected._children[1].setEnabled(false);
      if (!rotate) {
        moveArea.setEnabled(true);
      }
    }
    scene.hoverCursor = "pointer";
  }

  var targetFurthestMini = () => {
    if (players[currentPlayer.team].minis) {
      var miniPosition = players[currentPlayer.team].minis.map(mini => mini.position.x);
      var furthestMiniIndex = currentPlayer.team === "teamWhite" ? miniPosition.indexOf(Math.min(...miniPosition)) : miniPosition.indexOf(Math.max(...miniPosition));
      var furthestMini = players[currentPlayer.team].minis[furthestMiniIndex];
      var furthestTarget = BABYLON.Mesh.CreateSphere("targetSphere", { size: 10 }, scene);
      furthestTarget.visibility = 0;
      furthestTarget.position = new BABYLON.Vector3(furthestMini.position.x, furthestMini.position.y, 0);
      camera.setTarget(furthestTarget);
      setTimeout(() => {
        furthestTarget.dispose();
      }, 1100)
    }
  };

  var diceRoll = (rolls, blackMini, defense, selected) => {
    let arrayResult = [];
    for (let i = 0; i < rolls; i++) {
      arrayResult.push(Math.floor(Math.random() * 6) + 1)
    }

    return arrayResult;
  }

  var cloneDice = (rolls, mini, delay) => {
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
      if (mini.name.includes("white")) {
        dice[rolls[i] - 1].material = diceMatWhite;
      } else {
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

  var compareRolls = (playerRolls, playerMod, enemyRolls, enemyMod) => {
    //check if rolls successful, remove any unsuccessful rolls
    var playerSuccess = playerRolls.filter(roll => roll + playerMod >= currentPlayer.army.units.soldier.range.success);
    var enemySuccess = enemyRolls.filter(roll => roll + enemyMod >= enemyPlayer.army.units.soldier.range.success);

    console.log("Player rolls:");
    console.log(playerRolls);
    console.log("He has a " + playerMod + " modifier to dice roll");


    console.log("Enemy rolls:");
    console.log(enemyRolls);
    console.log("He has a " + enemyMod + " modifier to dice roll");

    console.log("Player success rolls:")
    console.log(playerSuccess);

    console.log("Enemy Success rolls:")
    console.log(enemySuccess);
    //check if duplicates, remove duplicates player enemy
    //var uniquePlayerRolls = [...playerSuccess];
    //var uniqueEnemyRolls = [...enemySuccess];

    for (let i = 0; i < playerSuccess.length; i++) {
      for (let j = 0; j < enemySuccess.length; j++) {
        if (playerSuccess[i] === enemySuccess[j]) {
          playerSuccess.splice(i, 1);
          enemySuccess.splice(j, 1)
        }
      }
    }

    if (Math.max(...playerSuccess) > Math.max(...enemySuccess)) {
      //player with the highest numbers win.   
      console.log("Player wins with a higher roll!");
      return "player";
    } else if (Math.max(...enemySuccess) > Math.max(...playerSuccess)) {
      console.log("Enemy wins with a higher roll!");
      return "enemy";
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

  // Consider the option of choosing multiple targets
  var onAttack = (ev) => {
    let enemyTarget = ev.meshUnderPointer;
    let winner = "";
    if (selected) {
      var currentMesh = selected;
      var range = rangeToTarget(selected, enemyTarget);

      let coverMod = isInCover(selected, enemyTarget) ? 1 : 0;
      var mods = coverMod + currentPlayer.army.units[selected.unit].range.mods[range];

      let enemyCoverMod = isInCover(enemyTarget, selected) ? 1 : 0;
      let enemyMods = enemyCoverMod + enemyPlayer.army.units[enemyTarget.unit].range.mods[range];

      if (range && isInAngle(selected, enemyTarget)) {
        if (enemyTarget.intersectsMesh(selected, false) || range === "c") {
          //Melee attack
          console.log('Stabbing ' + enemyTarget.id + " with " + selected.id)
          console.log("Player target roll: " + currentPlayer.army.units[selected.unit].melee.success + "+")
          let meleeRoll = diceRoll(currentPlayer.army.units[selected.unit].melee.roll);

          //Generate Dice
          cloneDice(meleeRoll, selected, 1000);

          console.log("Enemy target roll: " + enemyPlayer.army.units[selected.unit].melee.success + "+")
          let enemyMeleeRoll = diceRoll(1);
          //Generate Dice
          cloneDice(enemyMeleeRoll, enemyTarget, 1000);

          winner = compareRolls(meleeRoll, 0, enemyMeleeRoll, 0);
        } else {
          //Range attack
          var rolls = [];
          var modedRolls = [];
          var enemyRolls = [];
          //var modedEnemyRolls = [];


          console.log(`Shooting ${enemyTarget.id} with ${selected.id} at range ${range}.`)
          // Check for enemy roll (Should be enemy line of sight when rotation is implemented!)
          console.log("Player target roll: " + currentPlayer.army.units[selected.unit].range.success + "+")

          rolls = diceRoll(currentPlayer.army.units[selected.unit].range.roll);
          //Generate Dice
          cloneDice(rolls, selected, 1000);

          modedRolls = rolls.map(roll => roll + mods);

          //Enemy Target Response
          if (rangeToTarget(enemyTarget, selected)) {
            console.log("Enemy target roll: " + enemyPlayer.army.units[enemyTarget.unit].range.success + "+")

            enemyRolls = diceRoll(1);
            //Generate Dice
            cloneDice(enemyRolls, enemyTarget, 1000);

            winner = compareRolls(rolls, mods, enemyRolls, enemyMods);
          }

          //No response from enemy (range difference)
          if (!winner) {
            if (modedRolls.some(roll => roll >= currentPlayer.army.units[selected.unit].range.success)) {
              console.log("Success! You shot him!");
              winner = "player"
            }
          }
        }

        //Defense Roll
        if (winner === "player") {
          console.log("Enemy is hit. Defense roll target: " + enemyPlayer.army.units[enemyTarget.unit].defense.success + "+");
          if (enemyCoverMod > 0) {
            console.log("Enemy has +1 to dice roll as he is in cover.")
          }
          let defenseRoll = diceRoll(enemyPlayer.army.units[enemyTarget.unit].defense.roll)
          console.log("Enemy rolls : ");
          console.log(defenseRoll);
          setTimeout(function () {
            cloneDice(defenseRoll, enemyTarget, 1250);
          }, 1250);
          //Cover modifiers to add here
          if (defenseRoll.some(roll => roll + enemyCoverMod >= enemyPlayer.army.units[enemyTarget.unit].defense.success)) {
            console.log("Defense roll successful. Enemy saved!");
          } else {
            console.log("Enemy killed!");
            setTimeout(function () {
              enemyTarget.position = new BABYLON.Vector3(Math.floor(Math.random() * 190) - 200, 0, -440 + Math.floor(Math.random() * 30) - 15);
              enemyTarget.name = "decor";
              enemyTarget.isPickable = false
              players[enemyPlayer.team].minis = players[enemyPlayer.team].minis.filter(mini => mini.id !== enemyTarget.id)
              players[enemyPlayer.team].startActions -= 2
              isTheGameOver();
              cancelSelection();
            }, 2500);
          }
        } else if (winner === "enemy") {
          console.log("Player is hit. Defense roll target: " + currentPlayer.army.units[selected.unit].defense.success + "+")
          if (coverMod > 0) {
            console.log("Player has +1 to dice roll as he is in cover.")
          }
          let defenseRoll = diceRoll(currentPlayer.army.units[selected.unit].defense.roll, undefined, true, selected);
          console.log("Player rolls : ");
          console.log(defenseRoll);
          setTimeout(function () {
            cloneDice(defenseRoll, currentMesh, 1250);
          }, 1250);
          if (defenseRoll.some(roll => roll + coverMod >= currentPlayer.army.units[selected.unit].defense.success)) {
            console.log("Defense roll successful. Player mini saved!");
          } else {
            console.log("Player killed!");
            setTimeout(function () {
              camera.target = map;
              currentMesh.position = new BABYLON.Vector3(200 - Math.floor(Math.random() * 190), 0, -440 + Math.floor(Math.random() * 30) - 15);
              currentMesh.name = "decor";
              currentMesh.isPickable = false
              players[currentPlayer.team].minis = players[currentPlayer.team].minis.filter(mini => mini.id !== currentMesh.id)
              players[currentPlayer.team].startActions -= 2
              isTheGameOver();
              cancelSelection();
            }, 2500);
          }
        } else {
          console.log("No winners! Try again.")
        }

        players[currentPlayer.team].turnActions -= 1;
        scene.removeMesh(scene.getMeshByName("token"));
        cancelSelection();

        if (players[currentPlayer.team].turnActions === 0) {
          setTimeout(function () {
            switchPlayer();
          }, 3000);
        }
      }
    }
  }

  var moveAction = ({ skip }) => {
    if (selected) {
      if (!skip) {
        previous.position = selected.position;
        selected.position = clonedMini.position;
      }
      moveArea.position = new BABYLON.Vector3(selected.position.x, selected.position.y + 2, selected.position.z);
      moveArea.setEnabled(false);
      selected._children[1].setEnabled(true);
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
        players[currentPlayer.team].turnActions -= 1;
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

  moveActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
      clonedMini = selected.clone();
      clonedMini.position = selected.position;
      clonedMini.isPickable = false;
      var clonedMiniLOS = clonedMini._children[1];
      clonedMiniLOS.setEnabled(false);
      blackMini3LOS.setEnabled(false)

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
        selected._children[1].setEnabled(true);
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
        selected._children[1].setEnabled(false);
      }
      canvas.removeEventListener("mousemove", rotateOnMouseMove);
      canvas.removeEventListener("click", rotateAction);
    })
  );

  //Select current player mini
  teamBlackActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function (ev) {
      if (currentPlayer.team === "teamBlack") {
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
      if (currentPlayer.team === "teamWhite" && !rotate) {
        onAttack(ev);
      }
    })
  );

  //LOS on opposite team
  teamBlackActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
      if (currentPlayer.team === "teamWhite") {
        handleLineOfSight(ev);
      }
    })
  );

  teamBlackActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
      if (currentPlayer.team === "teamWhite") {
        cancelLineOfSight(ev);
      }
    })
  );


  //Select current player mini
  teamWhiteActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function (ev) {
      if (currentPlayer.team === "teamWhite") {
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
        onAttack(ev);
      }
    })
  );


  //LOS on opposite team
  teamWhiteActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
      if (currentPlayer.team === "teamBlack") {
        handleLineOfSight(ev);
      }
    })
  );

  teamWhiteActionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
      if (currentPlayer.team === "teamBlack") {
        cancelLineOfSight(ev);
      }
    })
  );

  canvas.addEventListener('contextmenu', cancelSelection, false);
  scene.onDispose = function () {
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("contextmenu", cancelSelection);
  }
}

export default () => (
  <div >
    <SceneComponent className="w-full h-full" antialias onSceneReady={onSceneReady} id='my-canvas' />
  </div>
)