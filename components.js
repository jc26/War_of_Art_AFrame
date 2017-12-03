AFRAME.registerComponent('cam-intersect', {
  schema: {default: ''},

  init: function () {
    var el = $(".title");
    var tl = new TimelineMax();
    tl.to(el, 1, {alpha:0.5, repeatDelay:0, repeat:-1, yoyo:true})
    tl.play();

    this.el.addEventListener('click', function (evt) {
      if (evt.detail.intersectedEl != null && evt.detail.intersectedEl.className === "army") {
        var light = $('#' + evt.detail.intersectedEl.id + '_light');
        if (localStorage.getItem(evt.detail.intersectedEl.id) === "true") {
          light[0].setAttribute('light', { intensity: 0.1 });
        } else {
          light[0].setAttribute('light', { intensity: 3.0 });
        }
        var buttons = $(".emit-button");
        $.getJSON("resources/resistance_info.json", function(data) {
          tl.restart();
          tl.pause();
          $("#desc-title").text("DESCRIPTION");
          $("#howto-title").text("STRATEGY");
          $(".title").css("font-size", "13px");
          $(".title").css("font-weight", "600");
          $(".title").css("letter-spacing", "5px");
          $(".title").css("font-style", "normal");
          $(".title").css("padding", "9px 0 9px 2px")
          buttons.css("visibility", "visible");
          buttons.css("display", "inherit");
          $("#" + evt.detail.intersectedEl.id + '_iden')[0].setAttribute("visible", true);
          $(".panel-img").css("visibility", "visible");
          $("#desc-text").text(data[evt.detail.intersectedEl.id].desc);
          $("#howto-text").text(data[evt.detail.intersectedEl.id].howto);
          buttons.val(evt.detail.intersectedEl.id);
          if (localStorage.getItem(evt.detail.intersectedEl.id) === "true") {
            $("#conquer-btn").text("REVIVE");
            $("#conquer-btn").css('background', 'rgba(32,32,32,1)');
          } else {
            $("#conquer-btn").text("DEFEAT");
            $("#conquer-btn").css('background', 'rgba(200,32,46,1)');
          }
        });
      }
    });

    this.el.addEventListener('mouseleave', function (evt) {
      if (evt.detail.intersectedEl != null && evt.detail.intersectedEl.className === "army") {
        var light = $('#' + evt.detail.intersectedEl.id + '_light');
        if (localStorage.getItem(evt.detail.intersectedEl.id) === "true") {
          light[0].setAttribute('light', { intensity: 0 });
        } else {
          light[0].setAttribute('light', { intensity: 0.3 });
        }
        tl.play();
        $("#" + evt.detail.intersectedEl.id + '_iden')[0].setAttribute("visible", false);
        $(".title").text("face your enemy");
        $(".title").css("font-size", "10px");
        $(".title").css("font-weight", "300");
        $(".title").css("font-style", "italic");
        $(".title").css("letter-spacing", "normal");
        $(".emit-button").css("display", "none");
        $(".title").css("padding", "11px 0 11px 2px")
        $(".panel-img").css("visibility", "hidden");
        $("#desc-text").text("");
        $("#howto-text").text("");
      }
    });
  }

});
