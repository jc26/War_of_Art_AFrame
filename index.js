$(document).ready(function(){
  $.getJSON("resources/resistance_info.json", function(data) {
    var before = "after";
    var armySize = Object.keys(data).length;
    var angleInc = 360 / armySize;
    var radius = 25;
    $.each(data, function(key, value) {
      var file = value.file;
      var fileName = file + "/" + file + ".json";
      var rotation = angleInc * value.position;
      var x = Math.sin(rotation * (Math.PI/180)) * radius;
      var lightX = Math.sin(rotation * (Math.PI/180)) * (radius-2);
      var z = Math.cos(rotation * (Math.PI/180)) * radius;
      var lightZ = Math.cos(rotation * (Math.PI/180)) * (radius-2);
      var html = "<a-entity id='" + file + "' class='army' object-model='src: url(/models/" + fileName + ");' rotation='0 " + rotation + " 0' position='" + x + " 0 " + z + "' scale='5 5 5'></a-entity>";
      html += "<a-entity text='align: center; width: 12; value: " + value.name + "' rotation='0 " + (rotation + 180) + " 0' position='" + x + " 10 " + z + "'></a-entity>";
      html += "<a-entity id='" + file + "_light" + "' light='type: spot; angle: 20; intensity: 0.3; penumbra: 1' rotation='-90' position='" + lightX + " 15 " + lightZ + "'></a-entity>"
      // html += "<a-entity text-geometry='value: " + name + "' rotation='0 " + (0-rotation) + " 0' position='" + x + " 10 " + z + "'></a-entity>";
      $("#" + before).after(html);
      before = value.file;
    });
  });
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
