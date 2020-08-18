(this["webpackJsonpinsys-game"]=this["webpackJsonpinsys-game"]||[]).push([[0],{147:function(e,n,t){},155:function(e,n,t){e.exports=t(163)},160:function(e,n,t){},161:function(e,n,t){},163:function(e,n,t){"use strict";t.r(n);var i=t(71),o=t.n(i),a=t(153),s=t.n(a),r=(t(160),t(161),t(147),t(100)),l=t(12),c=t(86),u=t(145),d=t(154),m=function(e){var n=Object(i.useRef)(null),t=(e.antialias,e.engineOptions,e.adaptToDeviceRatio,e.sceneOptions),a=e.onRender,s=(e.onSceneReady,Object(d.a)(e,["antialias","engineOptions","adaptToDeviceRatio","sceneOptions","onRender","onSceneReady"])),r=Object(i.useState)(!1),c=Object(u.a)(r,2),m=c[0],h=c[1],p=Object(i.useState)(null),g=Object(u.a)(p,2),f=g[0],M=g[1];return Object(i.useEffect)((function(){if(window){var e=function(){f&&f.getEngine().resize()};return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}}),[f]),Object(i.useEffect)((function(){if(!m){h(!0);var i=new l.g(n.current,!0,{stencil:!0}),o=new l.o(i,t);M(o),o.isReady()?e.onSceneReady(o):o.onReadyObservable.addOnce((function(n){return e.onSceneReady(n)})),i.runRenderLoop((function(){"function"===typeof a&&a(o),o.render()}))}return function(){null!==f&&f.dispose()}}),[m,t,e,a,f]),o.a.createElement("canvas",Object.assign({ref:n},s))},h={tabForces:{units:{soldier:{class:"FS",move:4,defense:{roll:1,success:4},melee:{roll:1,success:3},range:{roll:1,success:3,mods:{s:-1,m:1,l:0,xl:-1}},maxRange:1212,maxInGame:void 0,cost:10}}},sysTroops:{units:{soldier:{class:"FS",move:4,defense:{roll:1,success:4},melee:{roll:1,success:3},range:{roll:2,success:4,mods:{s:0,m:1,l:-1,xl:-1}},maxRange:1212,maxInGame:void 0,cost:10}}},rebels:{units:{soldier:{class:"FS",move:4,defense:{roll:1,success:4},melee:{roll:2,success:4},range:{roll:3,success:5,mods:{s:1,m:0,l:-1,xl:-2}},maxRange:1212,maxInGame:void 0,cost:10}}},outerRing:{units:{soldier:{class:"FS",move:4,defense:{roll:1,success:4},melee:{roll:2,success:3},range:{roll:1,success:3,mods:{s:1,m:0,l:-2,xl:-2}},maxRange:1212,maxInGame:void 0,cost:10}}},voidWarriors:{units:{soldier:{class:"FS",move:4,defense:{roll:1,success:4},melee:{roll:4,success:5},range:{roll:3,success:5,mods:{s:0,m:0,l:-1,xl:-2}},maxRange:1212,maxInGame:void 0,cost:10}}}};l.b.AllowMatricesInterpolation=!0;var p=function(e){var n=e.getEngine().getRenderingCanvas(),t=new l.c("arcCamera",l.t.ToRadians(0),l.t.ToRadians(100),780,new l.u(-60,400,0),e);t.attachControl(n,!0),t.angularsensibility*=-1,t.checkCollisions=!0,t.ellipsoid=new l.u(1.5,1,1.5);var i=new l.m("pointLight",new l.u(75,400,150),e);i.intensity=1,i.range=5e3,new l.i("hemiLight",new l.u(0,-4900,0),e).intensity=.7;var o=new l.q(1024,i);o.usePoissonSampling=!0;var a=new l.j("hl1",e),s=new l.r("invisibleMaterial",e);s.alpha=0;var u=new l.r("transparentMaterial",e);u.alpha=.5;var d=l.l.CreateSphere("skyBox",{diameter:5500,diameterX:5500},e),m=new l.r("skyBox",e);m.backFaceCulling=!1,d.material=m,d.receiveShadows=!0;var p=l.l.CreateCylinder("background",{height:1,diameter:5e3,tessellation:5e3},e),g=new l.r("background",e);g.opacityTexture=new l.s(".".concat("","/Textures/OpacityTemplate.png"),e),g.backFaceCulling=!1,p.material=g,p.translate(l.d.Y,-1,e),p.visibility=.4,p.receiveShadows=!0;var f=new l.r("boardMaterial",e);f.diffuseTexture=new l.s(".".concat("","/Textures/Wood/Wood_021_basecolor.jpg"),e),f.bumpTexture=new l.s(".".concat("","/Textures/Wood/Wood_021_normal.jpg"),e),f.ambientTexture=new l.s(".".concat("","/Textures/Wood/Wood_021_ambientOcclusion.jpg"),e);var M=new l.r("asphaltMaterial",e);M.diffuseTexture=new l.s(".".concat("","/Textures/Asphalt/Asphalt_001_COLOR.jpg"),e),M.bumpTexture=new l.s(".".concat("","/Textures/Asphalt/Asphalt_001_NRM.jpg"),e),M.specularTexture=new l.s(".".concat("","//Textures/Asphalt/Asphalt_001_SPEC.jpg"),e),M.ambientTexture=new l.s(".".concat("","/Textures/Asphalt/Asphalt_001_OCC.jpg"),e);var w=new l.r("plasticMaterial",e);w.diffuseColor=new l.f(220/255,220/255,220/255);var v=new l.r("tokenMaterial",e);v.diffuseTexture=new l.s(".".concat("","/Textures/Token/Coin_low_Coin_material_BaseColor2.png"),e),v.bumpTexture=new l.s(".".concat("","/Textures/Token/Coin_low_Coin_material_Normal.png"),e);var y=new l.r("tokenMaterial",e);y.diffuseTexture=new l.s(".".concat("","/Textures/Token/Coin_low_Coin_material_BaseColor.png"),e),y.bumpTexture=new l.s(".".concat("","/Textures/Token/Coin_low_Coin_material_Normal.png"),e);var b=new l.r("baseMaterial",e);b.diffuseColor=new l.f.Black;var k=new l.r("baseMaterial",e);k.diffuseColor=new l.f.White;var x=new l.r("diceMatWhite",e);x.diffuseColor=new l.f.White;var C=new l.r("diceMatBlack",e);C.diffuseColor=new l.f(55/255,71/255,79/255);var E="if( vPositionW.z  < -340.){ discard; } if( vPositionW.z  > 340.){ discard; } if( vPositionW.x  > 450.){ discard; } if( vPositionW.x  < -450.){ discard; }",S=new c.a("moveAreaMat",e);S.alpha=.25,S.Fragment_Custom_Diffuse(E);var O=new c.a("losMatSW",e);O.alpha=.25,O.Fragment_Custom_Diffuse(E);var _=new c.a("losMatMW",e);_.alpha=.25,_.Fragment_Custom_Diffuse(E);var B=new c.a("losMatLW",e);B.alpha=.25,B.Fragment_Custom_Diffuse(E);var T=new c.a("losMatXLW",e);T.alpha=.25,T.Fragment_Custom_Diffuse(E);var z=new c.a("losMatSB",e);z.alpha=.25,z.Fragment_Custom_Diffuse(E);var A=new c.a("losMatMB",e);A.alpha=.25,A.Fragment_Custom_Diffuse(E);var W=new c.a("losMatLB",e);W.alpha=.25,W.Fragment_Custom_Diffuse(E);var L=new c.a("losMatXLB",e);L.alpha=.25,L.Fragment_Custom_Diffuse(E);var N,P,R,j,D,F,I,G={teamWhite:{player:"@jrej",army:"outerRing",get armyStats(){return h[this.army]},units:["soldier","soldier","soldier"],minis:[],startActions:6,turnActions:6,get armyValue(){var e=this;return this.units.reduce((function(n,t){return n+e.armyStats.units[t].cost}),0)}},teamBlack:{player:"@inkito",army:"tabForces",get armyStats(){return h[this.army]},units:["soldier","soldier","soldier"],minis:[],startActions:6,turnActions:6,get armyValue(){var e=this;return this.units.reduce((function(n,t){return n+e.armyStats.units[t].cost}),0)}}},X={team:"teamWhite",get player(){return G[this.team].player},get army(){return G[this.team].armyStats},get startActions(){return G[this.team].startActions},get turnActions(){return G[this.team].turnActions}},Y={get team(){return"teamWhite"===X.team?"teamBlack":"teamWhite"},get player(){return G["teamWhite"===X.team?"teamBlack":"teamWhite"].player},get army(){return G["teamWhite"===X.team?"teamBlack":"teamWhite"].armyStats}},Z=new l.a(e),U=new l.a(e),H=new l.a(e),J=new l.a(e),K=function(){l.p.ImportMesh("",".".concat("","/Models/"),"token.babylon",e,(function(e){(N=l.k.MergeMeshes(e)).position=new l.u(150,-18,440),N.scaling=new l.u(800,900,800),N.name="token",N.id="token1",N.material="teamWhite"===X.team?y:v;for(var n,t=N.position.x,i=X.startActions-1,o=0;o<i;o++){(n=N.clone("token".concat(o+2))).name="token";var a=Math.floor(40*Math.random())+50;n.position.x=t-a,n.position.z=N.position.z+Math.floor(30*Math.random())-15,t-=a}G[X.team].turnActions=G[X.team].startActions}))};K();var V=[];l.p.ImportMesh("",".".concat("","/Models/"),"dice.babylon",e,(function(n){(P=l.k.MergeMeshes(n)).scaling=new l.u(20,20,20),P.translate(l.d.Y,30,e),P.translate(l.d.X,175,e),P.translate(l.d.Z,50,e),o.getShadowMap().renderList.push(P),P.id="dice1",P.name="dice",P.checkCollisions=!0,P.collisionGroup=1,P.collisionMask=1,P.setEnabled(!1),V.push(P)})),l.p.ImportMesh("",".".concat("","/Models/"),"dice2.babylon",e,(function(n){(R=l.k.MergeMeshes(n)).scaling=new l.u(20,20,20),R.translate(l.d.Y,33,e),R.translate(l.d.X,175,e),R.translate(l.d.Z,50,e),o.getShadowMap().renderList.push(R),R.id="dice2",R.name="dice",R.checkCollisions=!0,R.collisionGroup=1,R.collisionMask=1,R.setEnabled(!1),V.push(R)})),l.p.ImportMesh("",".".concat("","/Models/"),"dice3.babylon",e,(function(n){(j=l.k.MergeMeshes(n)).scaling=new l.u(20,20,20),j.translate(l.d.Y,33,e),j.translate(l.d.X,175,e),j.translate(l.d.Z,50,e),o.getShadowMap().renderList.push(j),j.id="dice3",j.name="dice",j.checkCollisions=!0,j.collisionGroup=1,j.collisionMask=1,j.setEnabled(!1),V.push(j)})),l.p.ImportMesh("",".".concat("","/Models/"),"dice4.babylon",e,(function(n){(D=l.k.MergeMeshes(n)).scaling=new l.u(20,20,20),D.translate(l.d.Y,33,e),D.translate(l.d.X,175,e),D.translate(l.d.Z,50,e),o.getShadowMap().renderList.push(D),D.id="dice4",D.name="dice",D.checkCollisions=!0,D.collisionGroup=1,D.collisionMask=1,D.setEnabled(!1),V.push(D)})),l.p.ImportMesh("",".".concat("","/Models/"),"dice5.babylon",e,(function(n){(F=l.k.MergeMeshes(n)).scaling=new l.u(20,20,20),F.translate(l.d.Y,33,e),F.translate(l.d.X,175,e),F.translate(l.d.Z,50,e),o.getShadowMap().renderList.push(F),F.id="dice5",F.name="dice",F.checkCollisions=!0,F.collisionGroup=1,F.collisionMask=1,F.setEnabled(!1),V.push(F)})),l.p.ImportMesh("",".".concat("","/Models/"),"dice6.babylon",e,(function(n){(I=l.k.MergeMeshes(n)).scaling=new l.u(20,20,20),I.translate(l.d.Y,33,e),I.translate(l.d.X,175,e),I.translate(l.d.Z,50,e),I.rotate(l.d.Y,l.t.ToRadians(90),e),o.getShadowMap().renderList.push(I),I.id="dice6",I.name="dice",I.checkCollisions=!0,I.collisionGroup=1,I.collisionMask=1,I.setEnabled(!1),V.push(I)}));var q=l.l.CreateCylinder("lineOfSights",{height:.1,diameter:429.25,tessellation:256},e);q.position=new l.u(0,100,0);var $=l.l.CreateCylinder("lineOfSightm",{height:.1,diameter:833.25,tessellation:256},e),Q=l.l.CreateCylinder("lineOfSightl",{height:.1,diameter:1641.25,tessellation:256},e);Q.parent=$.parent=q;var ee=l.e.FromMesh(q),ne=l.e.FromMesh($),te=l.e.FromMesh(Q),ie=l.l.CreateBox("LOSTemplate",{width:2*G[X.team].armyStats.units.soldier.maxRange,height:2500,depth:1},e);ie.rotate(l.d.X,l.t.ToRadians(90),e),ie.position=new l.u(G[X.team].armyStats.units.soldier.maxRange,100,0),ie.visibility=0;var oe=l.e.FromMesh(ie);te=te.subtract(oe).subtract(ne).subtract(ee),ne=ne.subtract(oe).subtract(ee);var ae=(ee=ee.subtract(oe)).toMesh("lineOfSightS"),se=ne.toMesh("lineOfSightM"),re=te.toMesh("lineOfSightL");re.parent=se.parent=ae,re.isPickable=se.isPickable=!1,ae.setEnabled(!1),ie.dispose(),q.dispose(),$.dispose(),Q.dispose();var le,ce,ue,de,me,he,pe,ge=function(e,n,t){var i=new l.f(164/255,27/255,7/255),o=new l.f(215/255,195/255,58/255),a=new l.f(7/255,66/255,164/255),s=new l.f(7/255,164/255,27/255);return G[n].armyStats.units[e].range.mods[t]>0?s:0===G[n].armyStats.units[e].range.mods[t]?a:-1===G[n].armyStats.units[e].range.mods[t]?o:G[n].armyStats.units[e].range.mods[t]<=-2?i:void 0},fe=function(e){return 2*e.getBoundingInfo().boundingBox.extendSize.y*e.scaling.y},Me=function(e){return 2*e.getBoundingInfo().boundingBox.extendSize.x*e.scaling.x},we=function(e){return 2*e.getBoundingInfo().boundingBox.extendSize.z*e.scaling.z};l.p.ImportMesh("",".".concat("","/Models/"),"STLRW.babylon",e,(function(n){var t=l.l.CreateCylinder("whiteBase",{height:2.5,diameter:27,tessellation:128},e);t.material=b,t.translate(l.d.Y,26.5,e),t.translate(l.d.X,-300,e),(le=l.k.MergeMeshes(n)).translate(l.d.Y,25,e),le.translate(l.d.X,-300,e),le.name="blackMini",le.id="blackMini1",le.unit="soldier",le.rotation.y=l.t.ToRadians(-90),le.material=w,le.actionManager=H,le.enablePointerMoveEvents=!0,le.addChild(t),le.width=Me(le),le.height=fe(le),le.checkCollisions=!0,le.collisionGroup=1,le.collisionMask=1;var i=ae.clone();i.parent=le,i.position=new l.u(0,1,0),i.rotation.y=l.t.ToRadians(-90),i.setEnabled(!1),i.material=z,i._children[0].material=A,i._children[1].material=W,le.losMat=[z.name,A.name,W.name,L.name],z.diffuseColor=ge(le.unit,"teamBlack","s"),A.diffuseColor=ge(le.unit,"teamBlack","m"),W.diffuseColor=ge(le.unit,"teamBlack","l"),(ce=le.clone()).name="blackMini",ce.id="blackMini2",ce.unit="soldier",ce.material=w,ce.actionManager=H,ce.translate(l.d.Z,200,e),ce._children[1].setEnabled(!1),(ue=le.clone()).name="blackMini",ue.id="blackMini3",ue.unit="soldier",ue.material=w,ue.actionManager=H,ue.translate(l.d.Z,-200,e),ue._children[1].setEnabled(!1),o.getShadowMap().renderList.push(le,ce,ue),G.teamBlack.minis.push(le,ce,ue)})),l.p.ImportMesh("",".".concat("","/Models/"),"SKNCK.babylon",e,(function(n){var i=l.l.CreateCylinder("whiteBase",{height:2.5,diameter:27,tessellation:128},e);i.material=k,i.translate(l.d.Y,26.5,e),i.translate(l.d.X,300,e),i.translate(l.d.Z,1.5,e),(de=l.k.MergeMeshes(n)).translate(l.d.Y,25,e),de.translate(l.d.X,300,e),de.translate(l.d.Z,0,e),de.rotation.y=l.t.ToRadians(90),de.name="whiteMini",de.id="whiteMini1",de.unit="soldier",de.material=w,de.checkCollisions=!0,de.actionManager=J,de.collisionGroup=1,de.collisionMask=1,de.addChild(i),t.setTarget(de),de.width=Me(de),de.height=fe(de);var a=ae.clone();a.parent=de,a.position=new l.u(0,1,0),a.rotation.y=l.t.ToRadians(-90),a.setEnabled(!1),a.material=O,a._children[0].material=_,a._children[1].material=B,de.losMat=[O.name,_.name,B.name,T.name],O.diffuseColor=ge(de.unit,"teamWhite","s"),_.diffuseColor=ge(de.unit,"teamWhite","m"),B.diffuseColor=ge(de.unit,"teamWhite","l"),(me=de.clone()).name="whiteMini",me.id="whiteMini2",me.unit="soldier",me.material=w,me.actionManager=J,me.translate(l.d.Z,200,e),me._children[1].setEnabled(!1),(he=de.clone()).name="whiteMini",he.id="whiteMini3",he.unit="soldier",he.material=w,he.actionManager=J,he.translate(l.d.Z,-200,e),he._children[1].setEnabled(!1),o.getShadowMap().renderList.push(i,de,me,he),G.teamWhite.minis.push(de,me,he)}));var ve=[];l.p.ImportMesh("",".".concat("","/Models/"),"container.babylon",e,(function(n){var t=l.k.MergeMeshes(n);t.scaling=new l.u(2,2,2),t.id="obstacle1",t.name="obstacle",t.receiveShadows=!0,t.width=Me(t),t.length=we(t),t.height=fe(t);var i=new l.r(e);i.diffuseColor=new l.f(.518,.271,.267);var a=new l.r(e);a.diffuseColor=new l.f(.671,.663,.733);var r=new l.r(e);r.diffuseColor=new l.f(.318,.502,.43);var c=t.clone("obstacle");c.position=new l.u(22,0,2.5);var u=t.clone("obstacle");u.position=new l.u(-22,0,2.5);var d=l.k.MergeMeshes([c,u]);d.material=i,d.name=d.id="obstacle",d.position=new l.u(180,50,125),c.dispose(),u.dispose();var m=t.clone("obstacle");m.position=new l.u(100,50,-125),m.material=i;var h=t.clone("obstacle");h.position=new l.u(150,50,-125);var p=t.clone("obstacle");p.position=new l.u(-100,50,125);var g=t.clone("obstacle");g.position=new l.u(-150,50,125),g.material=i;var f=t.clone("obstacle");f.position=new l.u(22,0,2.5);var M=t.clone("obstacle");M.position=new l.u(-22,0,2.5);var w=l.k.MergeMeshes([f,M]);w.material=r,w.name=w.id="obstacle",w.position=new l.u(-180,50,-125),f.dispose(),M.dispose();var v=t.clone("obstacle");v.position=new l.u(-180,100,-150),v.scaling.z=1;var y=t.clone("obstacle");y.position=new l.u(180,100,100),y.scaling.z=1,y.material=a;var b=t.clone("obstacle");b.position=new l.u(250,38,150),b.scaling.z=1,b.scaling.y=1,b.material=r;var k=t.clone("obstacle");k.position=new l.u(-250,38,-100),k.scaling.z=1,k.scaling.y=1,k.material=i,o.getShadowMap().renderList.push(d,m,h,p,g,w,v,y,b,k),ve.push(d,m,h,p,g,w,v,y,b,k),t.material=s}));var ye=l.l.CreateCylinder("moveArea",{height:.25,diameter:202,tessellation:256},e);ye.material=s,ye.actionManager=U,ye.setEnabled(!1),ye.position=new l.u(0,26,0);var be,ke,xe=l.l.CreateCylinder("moveArea",{height:.25,diameter:227.25,tessellation:256},e);xe.material=S,xe.parent=ye,l.p.ImportMesh("","",".".concat("","/Models/setting.babylon"),e,(function(n){(be=n[0]).scaling=new l.u(1150,1200,1e3),be.material=f,o.getShadowMap().renderList.push(be),(ke=l.l.CreateBox("map",{width:808,height:606,depth:1},e)).rotate(l.d.X,l.t.ToRadians(90),e),ke.material=M,ke.receiveShadows=!0,ke.translate(l.d.Y,25,e),ke.actionManager=Z}));var Ce=function(){"teamWhite"===X.team?(X.team="teamBlack",t.position=new l.u(-700,300,0),Re()):"teamBlack"===X.team&&(X.team="teamWhite",t.position=new l.u(700,300,0),Re()),K()},Ee="",Se=!1,Oe={position:null,rotation:null},_e=function(n){if(1===n.sourceEvent.which){var t=n.meshUnderPointer;e.hoverCursor="pointer",Ee===t?Ye({skip:!0}):t.id.includes("Mini")&&(Ee&&a.removeMesh(Ee),X.turnActions>0&&(a.addMesh(t,l.f.White()),a.addMesh(ye,l.f.White()),Ee=t,Oe.position=Ee.position,ye.position=new l.u(t.position.x,26,t.position.z),ye.setEnabled(!0)))}},Be=function(){Ee&&Se?(Oe.position&&(Ee.position=Oe.position,Ee.rotation=Oe.rotation,ye.setEnabled(!0),ye.position=new l.u(Oe.position.x,26,Oe.position.z),Ee._children[1].setEnabled(!1),e.getMeshByName("groundLOS".concat(Ee.id))&&e.getMeshByName("groundLOS".concat(Ee.id)).setEnabled(!1)),n.removeEventListener("mousemove",Ue),Se=!1):Ee&&!Se&&(ye.setEnabled(!1),a.removeMesh(Ee),a.removeMesh(ye),e.removeMesh(pe),Ee._children[1].setEnabled(!1),e.getMeshByName("groundLOS".concat(Ee.id))&&e.getMeshByName("groundLOS".concat(Ee.id)).setEnabled(!1),Re(),Ee="",e.hoverCursor="pointer",pe&&pe.dispose())},Te=function(n,t){var i=new l.u(n.position.x,n.position.y+.75*fe(n),n.position.z),o=new l.u(t.position.x,t.position.y+.75*fe(t),t.position.z-t.width/2+.25*t.width),a=new l.u(t.position.x,t.position.y+.75*fe(t),t.position.z+t.width/2-.25*t.width),s=o.subtract(i);s=l.u.Normalize(s);var r=a.subtract(i);r=l.u.Normalize(r);var c=l.u.Distance(n.position,t.position)-Me(t)/2,u=new l.n(i,s,c),d=new l.n(i,r,c),m=e.multiPickWithRay(u),h=e.multiPickWithRay(d);return!m.some((function(e){return e.pickedMesh.name.includes("obstacle")}))||!h.some((function(e){return e.pickedMesh.name.includes("obstacle")}))},ze=function(n,t){var i=new l.u(n.position.x,n.position.y+5,n.position.z-n.width/2+.25*n.width),o=new l.u(n.position.x,n.position.y+5,n.position.z+n.width/2-.25*n.width),a=new l.u(t.position.x,t.position.y+5,t.position.z),s=a.subtract(i);s=l.u.Normalize(s);var r=a.subtract(o);r=l.u.Normalize(r);var c=Me(n)/2+Me(n),u=new l.n(i,s,c),d=new l.n(o,r,c),m=e.multiPickWithRay(u),h=e.multiPickWithRay(d);return m.some((function(e){return e.pickedMesh.name.includes("obstacle")}))||h.some((function(e){return e.pickedMesh.name.includes("obstacle")}))?(console.log(n.name+" is in cover!"),!0):(console.log(n.name+" is NOT in cover!"),!1)},Ae=function(e,n){var t=Ze(e),i=new l.u(e.position.x,55,e.position.z),o=new l.u(n.position.x,55,n.position.z).subtract(i);return o=l.u.Normalize(o),!(180*Math.acos(l.u.Dot(t,o))/Math.PI>90)},We=function(e,n){return e.position.y>n.position.y+fe(n)?(console.log(e.name+" is higher"),!0):(console.log(e.name+" is NOT Higher"),!1)},Le=function(n){var t=new l.u(n.position.x,n.position.y,n.position.z),i=new l.u(0,-1,0),o=fe(n),a=new l.n(t,i,o),s=e.multiPickWithRay(a);return s.some((function(e){return e.pickedMesh.name.includes("obstacle")}))?s.filter((function(e){return e.pickedMesh.name.includes("obstacle")})).map((function(e){return e.pickedMesh}))[0]:s.some((function(e){return e.pickedMesh.name.includes("map")}))?s.filter((function(e){return e.pickedMesh.name.includes("map")})).map((function(e){return e.pickedMesh}))[0]:void 0},Ne=function(n){var t=n.meshUnderPointer;Ee&&Te(Ee,t)&&(t.intersectsMesh(Ee,!1)||(Ie(Ee,t)?(Ee._children[1].setEnabled(!0),e.getMeshByName("groundLOS".concat(Ee.id))&&e.getMeshByName("groundLOS".concat(Ee.id)).setEnabled(!0),ye.setEnabled(!1)):t.intersectsMesh(Ee,!1)||Ie(Ee,t)||(ye.setEnabled(!1),Ee._children[1].setEnabled(!0),e.getMeshByName("groundLOS".concat(Ee.id)).setEnabled(!0))))},Pe=function(){Ee&&(Ee._children[1].setEnabled(!1),e.getMeshByName("groundLOS".concat(Ee.id))&&e.getMeshByName("groundLOS".concat(Ee.id)).setEnabled(!1),Se||ye.setEnabled(!0)),e.hoverCursor="pointer"},Re=function(){if(G[X.team].minis&&G[X.team].minis.length>0){var n=G[X.team].minis.map((function(e){return e.position.x})),i="teamWhite"===X.team?n.indexOf(Math.min.apply(Math,Object(r.a)(n))):n.indexOf(Math.max.apply(Math,Object(r.a)(n))),o=G[X.team].minis[i],a=l.k.CreateSphere("targetSphere",{size:10},e);a.visibility=0,a.position=new l.u(o.position.x,o.position.y,0),t.setTarget(a),setTimeout((function(){a.dispose()}),1100)}},je=function(e,n,t,i){for(var o=[],a=0;a<e;a++)o.push(Math.floor(6*Math.random())+1);return o},De=function(n,t,i){for(var o=new l.u(t.position.x+10,t.position.y+7,t.position.z+30),a=new l.u(t.position.x+10,t.position.y+7,t.position.z+45),s=new l.u(t.position.x+-5,t.position.y+7,t.position.z+30),r=new l.u(t.position.x+-5,t.position.y+7,t.position.z+37.5),c=new l.u(t.position.x+-5,t.position.y+7,t.position.z+45),u=new l.u(t.position.x+-20,t.position.y+7,t.position.z+30),d=new l.u(t.position.x+-20,t.position.y+7,t.position.z+37.5),m=[o,a,s,c,u,new l.u(t.position.x+-20,t.position.y+7,t.position.z+45)],h=function(o){g=o+1,t.name.includes("white")?V[n[o]-1].material=x:V[n[o]-1].material=C,3===n.length&&3===g?V[n[o]-1].clone("diceClone".concat(o)).position=r:5===n.length&&5===g?V[n[o]-1].clone("diceClone".concat(o)).position=d:V[n[o]-1].clone("diceClone".concat(o)).position=m[o],setTimeout((function(){e.removeMesh(e.getMeshByName("diceClone".concat(o)))}),i)},p=0;p<n.length;p++){var g;h(p)}},Fe=function(e,n,t,i){var o=e.filter((function(e){return e+n>=X.army.units.soldier.range.success})),a=t.filter((function(e){return e+i>=Y.army.units.soldier.range.success}));console.log("Player rolls:"),console.log(e),console.log("He has a "+n+" modifier to dice roll"),console.log("Enemy rolls:"),console.log(t),console.log("He has a "+i+" modifier to dice roll"),console.log("Player success rolls:"),console.log(o),console.log("Enemy Success rolls:"),console.log(a);for(var s=0;s<o.length;s++)for(var l=0;l<a.length;l++)o[s]===a[l]&&(o.splice(s,1),a.splice(l,1));return Math.max.apply(Math,Object(r.a)(o))>Math.max.apply(Math,Object(r.a)(a))?(console.log("Player wins with a higher roll!"),"player"):Math.max.apply(Math,Object(r.a)(a))>Math.max.apply(Math,Object(r.a)(o))?(console.log("Enemy wins with a higher roll!"),"enemy"):null},Ie=function(e,n){var t,i=l.u.Distance(e.position,n.position)-n.width/2,o="whiteMini"===e.name?"teamWhite":"teamBlack",a=G[o].armyStats.units[e.unit].maxRange;return i<=e.width/2+n.width/2?t="c":i<=202?t="s":i>202&&i<=404?t="m":i>404&&i<=808?t="l":i>808&&i<=a?t="xl":i>a&&(t=null),Te(e,n)&&Ae(e,n)?t:null},Ge=function(){var e="";return 0===G.teamBlack.startActions&&0===G.teamWhite.startActions?(console.log("tie"),e=null,console.log("Game Over. No Winners this time.")):0===G.teamBlack.startActions?(e="Team White",console.log("Game Over. ".concat(e," wins!"))):0===G.teamWhite.startActions?(e="Team Black",console.log("Game Over. ".concat(e," wins!"))):e=void 0,e},Xe=function(n){var i=n.meshUnderPointer,o="";if(Ee){var a=Ee,s=Ie(Ee,i),r=ze(Ee,i)?1:0,c=We(Ee,i)?1:0,u=r+c+X.army.units[Ee.unit].range.mods[s],d=ze(i,Ee)?1:0,m=We(i,Ee)?1:0,h=d+m+Y.army.units[i.unit].range.mods[s];if(s&&Ae(Ee,i)){if(i.intersectsMesh(Ee,!1)||"c"===s){console.log("Stabbing "+i.id+" with "+Ee.id),console.log("Player target roll: "+X.army.units[Ee.unit].melee.success+"+");var p=je(X.army.units[Ee.unit].melee.roll);De(p,Ee,1e3),console.log("Enemy target roll: "+Y.army.units[Ee.unit].melee.success+"+");var g=je(1);De(g,i,1e3),o=Fe(p,0,g,0)}else{var f=[],M=[],w=[];console.log("Shooting ".concat(i.id," with ").concat(Ee.id," at range ").concat(s,".")),console.log("Player target roll: "+X.army.units[Ee.unit].range.success+"+"),f=je(X.army.units[Ee.unit].range.roll),De(f,Ee,1e3),M=f.map((function(e){return e+u})),Ie(i,Ee)&&(console.log("Enemy target roll: "+Y.army.units[i.unit].range.success+"+"),w=je(1),De(w,i,1e3),o=Fe(f,u,w,h)),o||M.some((function(e){return e>=X.army.units[Ee.unit].range.success}))&&(console.log("Success! You shot him!"),o="player")}if("player"===o){console.log("Enemy is hit. Defense roll target: "+Y.army.units[i.unit].defense.success+"+"),d>0&&console.log("Enemy has +1 to dice roll as he is in cover.");var v=je(Y.army.units[i.unit].defense.roll);console.log("Enemy rolls : "),console.log(v),setTimeout((function(){De(v,i,1250)}),1250),v.some((function(e){return e+d>=Y.army.units[i.unit].defense.success}))?console.log("Defense roll successful. Enemy saved!"):(console.log("Enemy killed!"),setTimeout((function(){i.position=new l.u(Math.floor(190*Math.random())-200,0,-440+Math.floor(30*Math.random())-15),i.name="decor",i.isPickable=!1,G[Y.team].minis=G[Y.team].minis.filter((function(e){return e.id!==i.id})),G[Y.team].startActions-=2,Ge(),Be()}),2500))}else if("enemy"===o){console.log("Player is hit. Defense roll target: "+X.army.units[Ee.unit].defense.success+"+"),r>0&&console.log("Player has +1 to dice roll as he is in cover.");var y=je(X.army.units[Ee.unit].defense.roll);console.log("Player rolls : "),console.log(y),setTimeout((function(){De(y,a,1250)}),1250),y.some((function(e){return e+r>=X.army.units[Ee.unit].defense.success}))?console.log("Defense roll successful. Player mini saved!"):(console.log("Player killed!"),setTimeout((function(){t.target=ke,a.position=new l.u(200-Math.floor(190*Math.random()),0,-440+Math.floor(30*Math.random())-15),a.name="decor",a.isPickable=!1,G[X.team].minis=G[X.team].minis.filter((function(e){return e.id!==a.id})),G[X.team].startActions-=2,Ge(),Be()}),2500))}else console.log("No winners! Try again.");G[X.team].turnActions-=1,e.removeMesh(e.getMeshByName("token")),Be(),0===G[X.team].turnActions&&setTimeout((function(){Ce()}),3500)}}},Ye=function(n){var t=n.skip;if(Ee){if(t||(Oe.position=Ee.position,Ee.position=pe.position),ye.position=new l.u(Ee.position.x,26,Ee.position.z),ye.setEnabled(!1),Ee._children[1].setEnabled(!0),Le(Ee)&&Le(Ee).name.includes("obstacle")){e.getMeshByName("groundLOS".concat(Ee.id))?(e.getMeshByName("groundLOS".concat(Ee.id)).position.y=26-Ee.position.y,e.getMeshByName("groundLOS".concat(Ee.id)).setEnabled(!0)):Ee._children[1].clone("groundLOS".concat(Ee.id)).position.y=26-Ee.position.y,e.getMeshByName("groundMoveArea")?e.getMeshByName("groundMoveArea").position.y=Ee.position.y-fe(Ee)/2-5:(ye.clone("groundMoveArea"),e.getMeshByName("groundMoveArea").parent=ye,e.getMeshByName("groundMoveArea").position=new l.u(0,Ee.position.y-fe(Ee)/2-5,0));var i="if( vPositionW.z  < ".concat(Math.round(Le(Ee).position.z-we(Le(Ee))/2),".){ discard; } if( vPositionW.z  > ").concat(Math.round(Le(Ee).position.z+we(Le(Ee))/2),".){ discard; } if( vPositionW.x  > ").concat(Math.round(Le(Ee).position.x+Me(Le(Ee))/2),".){ discard; } if( vPositionW.x  < ").concat(Math.round(Le(Ee).position.x-Me(Le(Ee))/2),".){ discard; }"),o=new c.a("highMat",e);o.alpha=.25,o.Fragment_Custom_Diffuse(i),o.diffuseColor=e.getMaterialByName(Ee.losMat[0]).diffuseColor,Ee._children[1].material=o,Ee._children[1]._children.forEach((function(n,t){n.material=new c.a("highMat".concat(t),e),n.material.alpha=.25,n.material.Fragment_Custom_Diffuse(i),n.material.diffuseColor=e.getMaterialByName(Ee.losMat[t+1]).diffuseColor})),e.getMeshByName("groundMoveArea").material=new c.a("highMoveMat",e),e.getMeshByName("groundMoveArea").material.alpha=.25,e.getMeshByName("groundMoveArea").material.Fragment_Custom_Diffuse(i),e.getMeshByName("groundMoveArea")._children.forEach((function(e){return e.setEnabled(!1)}))}else Ee._children[1].material=e.getMaterialByName(Ee.losMat[0]),Ee._children[1]._children.forEach((function(n,t){return n.material=e.getMaterialByName(Ee.losMat[t+1])})),xe.material=S,e.getMeshByName("groundLOS".concat(Ee.id))&&e.getMeshByName("groundLOS".concat(Ee.id)).dispose(),e.getMeshByName("groundMoveArea")&&e.getMeshByName("groundMoveArea").dispose();Oe.rotation=Ee.rotation.clone(),Se=!0}},Ze=function(e){var n=new l.u(0,0,-1),t=e.getDirection(n);return t.normalize(),t},Ue=function(e){if(e.preventDefault(),Ee&&Ke(e)){var n=Ee.position.x-Ke(e).x,t=Ee.position.z-Ke(e).z;Ee.rotation.y=Math.atan2(n,t)}},He=function(n){1!==n.which&&1!==n.sourceEvent.which||Ee&&Se&&(G[X.team].turnActions-=1,e.removeMesh(e.getMeshByName("token")),Se=!1,Oe.position=null,Oe.rotation=null,Be(),0===G[X.team].turnActions&&setTimeout((function(){Ce()}),1e3))},Je=function(e){if((e.preventDefault(),Ee&&Ke(e))&&(![].concat(Object(r.a)(G[Y.team].minis),Object(r.a)(G[X.team].minis.filter((function(e){return e.id!==Ee.id})))).some((function(n){return Ke(e).x<n.position.x+Me(n)-2&&Ke(e).x>n.position.x-Me(n)+2&&Ke(e).z<n.position.z+Me(n)-2&&Ke(e).z>n.position.z-Me(n)+2}))&&!ve.filter((function(e){return fe(e)+e.position.y-fe(e)/2>fe(Ee)+Ee.position.y})).some((function(n){return Ke(e).x<n.position.x+Me(n)/2+Me(Ee)/2&&Ke(e).x>n.position.x-Me(n)/2-Me(Ee)/2&&Ke(e).z<n.position.z+we(n)/2+Me(Ee)/2&&Ke(e).z>n.position.z-we(n)/2-Me(Ee)/2}))&&Ke(e).x>-388&&Ke(e).x<388&&Ke(e).z>-285&&Ke(e).z<285)){var n=ve.filter((function(e){return fe(e)<fe(Ee)+Ee.position.y-25})).filter((function(n){return Ke(e).x<n.position.x+Me(n)/2+Me(Ee)/2&&Ke(e).x>n.position.x-Me(n)/2-Me(Ee)/2&&Ke(e).z<n.position.z+we(n)/2+Me(Ee)/2&&Ke(e).z>n.position.z-we(n)/2-Me(Ee)/2}));n&&n.length>0?pe.position=new l.u(Ke(e).x,fe(n[0])+25,Ke(e).z):pe.position=new l.u(Ke(e).x,25,Ke(e).z)}},Ke=function(){var n=e.pick(e.pointerX,e.pointerY,(function(e){return e===ke}));return n.hit?n.pickedPoint:null};U.registerAction(new l.h(l.a.OnPointerOverTrigger,(function(e){(pe=Ee.clone()).position=Ee.position,pe.isPickable=!1,pe._children.forEach((function(e){return e.setEnabled(!1)})),pe.material=u,n.addEventListener("mousemove",Je,!1),n.addEventListener("click",Ye,!1)}))),U.registerAction(new l.h(l.a.OnPointerOutTrigger,(function(e){pe.dispose(),n.removeEventListener("mousemove",Je),n.removeEventListener("click",Ye)}))),Z.registerAction(new l.h(l.a.OnPointerOverTrigger,(function(e){Ee&&Se&&Ee._children[1].setEnabled(!0),Se&&(n.addEventListener("mousemove",Ue,!1),n.addEventListener("click",He,!1))}))),Z.registerAction(new l.h(l.a.OnPointerOutTrigger,(function(t){Ee&&!Se&&(Ee._children[1].setEnabled(!1),e.getMeshByName("groundLOS".concat(Ee.id))&&e.getMeshByName("groundLOS".concat(Ee.id)).setEnabled(!1)),n.removeEventListener("mousemove",Ue),n.removeEventListener("click",He)}))),H.registerAction(new l.h(l.a.OnPickUpTrigger,(function(e){"teamBlack"===X.team&&(Se?He(e):_e(e))}))),H.registerAction(new l.h(l.a.OnLeftPickTrigger,(function(e){"teamWhite"!==X.team||Se||Xe(e)}))),H.registerAction(new l.h(l.a.OnPointerOverTrigger,(function(e){"teamWhite"===X.team&&Ne(e)}))),H.registerAction(new l.h(l.a.OnPointerOutTrigger,(function(e){"teamWhite"===X.team&&Pe()}))),J.registerAction(new l.h(l.a.OnPickUpTrigger,(function(e){"teamWhite"===X.team&&(Se?He(e):_e(e))}))),J.registerAction(new l.h(l.a.OnLeftPickTrigger,(function(e){"teamBlack"!==X.team||Se||Xe(e)}))),J.registerAction(new l.h(l.a.OnPointerOverTrigger,(function(e){"teamBlack"===X.team&&Ne(e)}))),J.registerAction(new l.h(l.a.OnPointerOutTrigger,(function(e){"teamBlack"===X.team&&Pe()}))),n.addEventListener("contextmenu",Be,!1),e.onDispose=function(){n.removeEventListener("mousemove",Je),n.removeEventListener("contextmenu",Be)}},g=function(){return o.a.createElement("div",null,o.a.createElement(m,{className:"w-full h-full",antialias:!0,onSceneReady:p,id:"my-canvas"}))},f=function(){return o.a.createElement("div",{className:"w-full h-full"},o.a.createElement(g,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[155,1,2]]]);
//# sourceMappingURL=main.1c2f37f6.chunk.js.map