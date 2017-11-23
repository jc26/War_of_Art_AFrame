$(document).ready(function(){
  var before = "after";
  var fileNames = [
    "1_infallible",
    "2_fear",
    "3_finishline",
    "4_allies",
    "5_validation",
    "6_procrastination",
    "7_trouble",
    "8_victimhood",
    "9_unhappiness",
    "10_fundamentalism",
    "11_criticism",
    "12_fantasies",
    "13_rationalization",
    "14_overambition",
    "15_failuresuccess"
  ]
  var armySize = fileNames.length;
  var angleInc = 360 / armySize;
  var radius = 15;
  for (var i = 0; i < armySize; i++) {
    var name = fileNames[i];
    var fileName = name + "/" + name + ".json";
    var rotation = angleInc * i;
    var x = Math.sin(rotation * (Math.PI/180)) * radius;
    var z = Math.cos(rotation * (Math.PI/180)) * radius;
    var html = "<a-entity id='" + name + "' object-model='src: url(/models/" + fileName + ");' rotation='0 " + rotation + " 0' position='" + x + " 0 " + z + "' scale='5 5 5'></a-entity>";
    $("#" + before).after(html);
    before = name;
  }
});

// var renderer,
//   scene,
//   camera,
//   myCanvas = document.getElementById('myCanvas');
// //RENDERER
// renderer = new THREE.WebGLRenderer({
//   canvas: myCanvas,
//   antialias: true
// });
// renderer.setClearColor(0x000000);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// //CAMERA
// camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000 );
// //SCENE
// scene = new THREE.Scene();
// //LIGHTS
// var light = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(light);
// var light2 = new THREE.PointLight(0xffffff, 0.5);
// scene.add(light2);
//


// AFRAME.registerComponent('resist-model', {
//   schema: {
//     // color: {
//     //   default: '#000'
//     // },
//   },
//
//   update: function() {
//     var loader = new THREE.ObjectLoader();
//     var mesh;
//     loader.load('models/test-2-threejs/test-2.json', function(geometry, materials) {
//       mesh = new THREE.Mesh(geometry, new THREE.MultiMaterial(materials));
//     });
//     // var mesh;
//     // function handle_load(geometry, materials) {
//     //     //BASIC MESH
//     //     var material = new THREE.MultiMaterial(materials);
//     //     // mesh = new THREE.Mesh(geometry, material);
//     //     // scene.add(mesh);
//     //     // mesh.position.z = -10;
//     //     //ANIMATION MESH
//     //     // var material = new THREE.MeshLambertMaterial({morphTargets: true});
//     //     mesh = new THREE.Mesh(geometry, material);
//     //
//     //     // scene.add(mesh);
//     //     // mesh.position.z = -10;
//     // }
//     console.log(typeof mesh);
//     this.el.setObject3D('mesh', mesh);
//   },
//
//   remove: function() {
//     this.el.removeObject3D('mesh');
//   }
// });
