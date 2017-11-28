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
