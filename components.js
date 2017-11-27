AFRAME.registerComponent('follow-camera', {
  schema: {default: ''},

  init: function () {
    var eventName = this.data;
    this.el.addEventListener('componentchanged', function (evt) {
      console.log(evt.detail);
      // if (evt.detail.name !== 'rotation') { return; }
      // else {
      //   // this.emit(eventName);
      //   var sceneEl = document.querySelector('a-scene');
      //   var entities = sceneEl.querySelectorAll('.follow-camera');
      //   for (var i = 0; i < entities.length; i++) {
      //     var newX = evt.detail.newData.x;
      //     var newY = evt.detail.newData.y;
      //     var newZ = evt.detail.newData.z;
      //     console.log(entities[i]);
      //     var radius = 1;
      //     var entX = radius * Math.sin((newZ) * (Math.PI/180)) * Math.cos((-newX) * (Math.PI/180));
      //     var entY = radius * Math.sin((newZ) * (Math.PI/180)) * Math.sin((-newX) * (Math.PI/180));
      //     var entZ = radius * Math.cos((newZ) * (Math.PI/180));
      //     entities[i].setAttribute('position', { x: entX, y: entY + 8, z: entZ - 2 });
      //     entities[i].setAttribute('rotation', { x: newX, y: newY, z: newZ });
      //   }
      // }
    });
  }
});

AFRAME.registerComponent('cam-intersect', {
  schema: {default: ''},

  init: function () {
    this.el.addEventListener('click', function (evt) {
      if (evt.detail.intersectedEl != null && evt.detail.intersectedEl.className === "army") {
        var light = $('#' + evt.detail.intersectedEl.id + '_light');
        light[0].setAttribute('light', {
          intensity: 3.0
        });
        $.getJSON("resources/resistance_info.json", function(data) {
          $("#desc-title").text("DESCRIPTION");
          $("#howto-title").text("HOW TO KILL");
          $(".title").css("font-size", "13px");
          $(".title").css("font-weight", "600");
          $(".title").css("letter-spacing", "5px");
          $(".title").css("font-style", "normal");
          $("#conquer-btn").css("visibility", "visible");
          $(".panel-img").css("visibility", "visible");
          $("#desc-text").text(data[evt.detail.intersectedEl.id].desc);
          $("#howto-text").text(data[evt.detail.intersectedEl.id].howto);
        });
      }
    });
    this.el.addEventListener('mouseleave', function (evt) {
      if (evt.detail.intersectedEl != null && evt.detail.intersectedEl.className === "army") {
        var light = $('#' + evt.detail.intersectedEl.id + '_light');
        light[0].setAttribute('light', {
          intensity: 0.3
        });
        $(".title").text("look at your enemy");
        $(".title").css("font-size", "10px");
        $(".title").css("font-weight", "300");
        $(".title").css("font-style", "italic");
        $(".title").css("letter-spacing", "normal");
        $("#conquer-btn").css("visibility", "hidden");
        $(".panel-img").css("visibility", "hidden");
        $("#desc-text").text("");
        $("#howto-text").text("");
      }
    });
  }

});
