$(document).ready(function(){

  $.getJSON("resources/resistance_info.json", function(data) {
    var before = "after";
    var armySize = Object.keys(data).length;
    var angleInc = 360 / armySize;
    var radius = 25;
    $.each(data, function(key, value) {
      // loading models
      var file = value.file;
      var fileName = file + "/" + file + ".json";
      var rotation = angleInc * value.position;
      var x = Math.sin(rotation * (Math.PI/180)) * radius;
      var lightX = Math.sin(rotation * (Math.PI/180)) * (radius-2);
      var z = Math.cos(rotation * (Math.PI/180)) * radius;
      var lightZ = Math.cos(rotation * (Math.PI/180)) * (radius-2);
      var html = "<a-entity id='" + file + "' class='army' object-model='src: url(/models/" + fileName + ");' rotation='0 " + rotation + " 0' position='" + x + " 0 " + z + "' scale='5 5 5'></a-entity>";
      html += "<a-entity id='" + file + "_text" + "' text='align: center; width: 12; value: " + value.name + "' rotation='0 " + (rotation + 180) + " 0' position='" + x + " 10 " + z + "'></a-entity>";
      html += "<a-entity id='" + file + "_light" + "' light='type: spot; angle: 20; intensity: 0.3; penumbra: 1' rotation='-90' position='" + lightX + " 15 " + lightZ + "'></a-entity>"
      $("#" + before).after(html);
      before = value.file;

      // setting up local storage
      localStorage.setItem(key, false);
    });
    localStorage.setItem("progress", 0.0);
    localStorage.setItem("size", armySize);
    $('#progress-mark').css('margin-right', '39%');
    $('#progress-label').text('0%');
    $('#progress-mark').before("<svg id='svg-line' height='5' width='39.7%'><line id='progress-line' x1='0' y1='0' x2='1%' y2='0' style='stroke:rgb(255,0,0);stroke-width:5' /></svg>");
  });

  var progressDelta = Math.round(100 / localStorage.getItem("size"));
  var clickDisabled = false; // prevent double clicks
  $('#conquer-btn').click(function() {
    if (clickDisabled) { return; }
    clickDisabled = true;
    setTimeout(function(){clickDisabled = false;}, 1500);
    var conquerBtn = $('#conquer-btn');
    var currEnemy = $('#conquer-btn').val();
    var currLight = $('#' + currEnemy + '_light');
    var currText = $('#' + currEnemy + '_text');
    var progressMark = $('#progress-mark');
    var progressLabel = $('#progress-label');
    var oldProgressLabel = parseInt(progressLabel.text().slice(0, -1));
    var counter = {progress: oldProgressLabel};
    var newProgress;
    if (conquerBtn.text() === "CONQUER") {
      $('#conquer-btn').text("REVIVE");
      newProgress = oldProgressLabel + progressDelta;
      TweenLite.to(counter, 1, {progress:"+=" + progressDelta, roundProps:"progress", onUpdate:updateHandler, ease:Linear.easeNone});
      TweenLite.to(conquerBtn, 1, {css:{background:'rgba(32,32,32,1)'}});
      localStorage.setItem(currEnemy, true);
      currLight[0].setAttribute('light', { intensity: 0 });
      currText[0].setAttribute('text', { color: "#7D7D7D", width: 10 });
    } else {
      $('#conquer-btn').text("CONQUER");
      newProgress = oldProgressLabel - progressDelta;
      TweenLite.to(counter, 1, {progress:"-=" + progressDelta, roundProps:"progress", onUpdate:updateHandler, ease:Linear.easeNone});
      TweenLite.to(conquerBtn, 1, {css:{background:'rgba(200,32,46,1)'}});
      localStorage.setItem(currEnemy, false);
      currLight[0].setAttribute('light', { intensity: 3.0 });
      currText[0].setAttribute('text', { color: "#FFF", width: 12 });
    }
    var newMarginRight = 39 - (39 * (newProgress/100));
    // animation for dot
    TweenLite.to(progressMark, 1, {marginRight:(newMarginRight + "%")});
    // animation for line
    var tl = new TimelineLite();
    tl.staggerTo("#progress-line", 1, {attr:{x2: newProgress + "%"}}, 0.5);
    tl.play();
    // updateHandler() for progress counter animation
    function updateHandler() {
      progressLabel.text(counter.progress + "%");
    }
  });

});
