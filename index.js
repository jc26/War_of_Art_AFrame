$(document).ready(function(){

  var aboutModal = $('#about-modal');
  aboutModal.css("height", "0%");
  $('#about-link').click(function() { toggleAbout() });
  $('#about-modal .ok-btn').click(function() { toggleAbout(); });

  var helpModal = $('#help-modal');
  helpModal.css("height", "0%");
  $('#help-link').click(function() { toggleHelp(); });
  $('#help-modal .ok-btn').click(function() { toggleHelp(); });

  function toggleAbout() {
    if (aboutModal[0].style.height === "0%") {
      closeModal(helpModal);
      openModal(aboutModal);
    } else {
      closeModal(aboutModal);
    }
  }

  function toggleHelp() {
    if (helpModal[0].style.height === "0%") {
      closeModal(aboutModal);
      openModal(helpModal);
    } else {
      closeModal(helpModal);
    }
  }

  function closeModal(modal) {
    if (modal[0].style.height === "0%") { return; }
    else {
      TweenLite.to(modal, 1, {height:("0%")});
      setTimeout(function () { modal.insertAfter('#below'); }, 1000);
    }
  }

  function openModal(modal) {
    if (modal[0].style.height === "100%") { return; }
    else {
      modal.insertAfter('#above');
      TweenLite.to(modal, 1, {height:("100%")});
    }
  }

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
      var descX = Math.sin((rotation - 5) * (Math.PI/180)) * radius;
      var descZ = Math.cos((rotation - 5) * (Math.PI/180)) * radius;
      var html = "<a-entity id='" + file + "' class='army' object-model='src: https://jc26.github.io/War_of_Art_AFrame/models/" + fileName + "' rotation='0 " + rotation + " 0' position='" + x + " 0 " + z + "' scale='5 5 5'></a-entity>";
      html += "<a-entity id='" + file + "_text" + "' text='align: center; width: 12; value: " + value.name + "' rotation='0 " + (rotation + 180) + " 0' position='" + x + " 10 " + z + "'></a-entity>";
      html += "<a-entity id='" + file + "_light" + "' light='type: spot; angle: 20; intensity: 0.3; penumbra: 1' rotation='-90' position='" + lightX + " 15 " + lightZ + "'></a-entity>"
      html += "<a-entity id='" + file + "_iden" + "' text='anchor: left; baseline: top; font: https://cdn.aframe.io/fonts/Monoid.fnt; align: left; height: 9; width: 6; wrapCount: 18" + "' visible='false' rotation='0 " + (rotation + 180 - 5) + " 0' position='" + descX + " 9 " + descZ + "'></a-entity>";
      $("#" + before).after(html);
      before = value.file;
      // setting up local storage
      localStorage.setItem(key, false);
      localStorage.setItem(key + "_iden", "");
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
    setTimeout(function(){clickDisabled = false;}, 1100);
    var conquerBtn = $('#conquer-btn');
    var currEnemy = $('#conquer-btn').val();
    var currLight = $('#' + currEnemy + '_light');
    var currText = $('#' + currEnemy + '_text');
    var progressMark = $('#progress-mark');
    var progressLabel = $('#progress-label');
    var oldProgressLabel = parseInt(progressLabel.text().slice(0, -1));
    var counter = {progress: oldProgressLabel};
    var newProgress;
    if (conquerBtn.text() === "DEFEAT") {
      $('#conquer-btn').text("REVIVE");
      newProgress = oldProgressLabel + progressDelta;
      TweenLite.to(counter, 1, {progress:"+=" + progressDelta, roundProps:"progress", onUpdate:updateHandler, ease:Linear.easeNone});
      TweenLite.to(conquerBtn, 1, {css:{background:'rgba(32,32,32,1)'}});
      localStorage.setItem(currEnemy, true);
      currLight[0].setAttribute('light', { intensity: 0 });
      currText[0].setAttribute('text', { color: "#7D7D7D", width: 10 });
      var textPos = currText[0].components.position.data;
      var startHTML = '' + (textPos.x - 2) + ' ' + textPos.y + ' ' + textPos.z;
      var endHTML = '' + (textPos.x + 2) + ' ' + textPos.y + ' ' + textPos.z;
      var textRot = currText[0].components.rotation.data;
      var rotationHTML = '' + textRot.x + ' ' + textRot.y + ' ' + textRot.z;
      var positionHTML = '' + textPos.x + ' ' + textPos.y + ' ' + textPos.z;
      // var lineHTML = "<a-entity id='" + currEnemy + '_line' + "' line='start: " + startHTML + "; end: " + endHTML + "; color: black' rotation='" + rotationHTML + "'></a-entity>"
      var lineHTML = "<a-entity id='" + currEnemy + '_line' + "' line='start: -2 10 -1; end: 2 10 -1; color: black' position='" + positionHTML + "' rotation='" + rotationHTML + "'></a-entity>"
      currText.after(lineHTML);
    } else {
      $('#conquer-btn').text("DEFEAT");
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

  var modal = $('.modal');
  $("#identify-btn").click(function() {
    modal.css('display', 'block');
    var currModel = $("#identify-btn").val();
    $('#identify-input').val(localStorage.getItem(currModel + "_iden"));
    $('#identify-input').focus();
  });

  $("#identify-ok-btn").click(function() {
    var currModel = $("#identify-btn").val();
    var newText = $('#identify-input').val();
    localStorage.setItem(currModel + "_iden", newText);
    $('#' + currModel + "_iden")[0].setAttribute('text', { value: newText });
    modal.css('display', 'none');
  });

  var tl1 = new TimelineLite();
  tl1.staggerTo(".fade-in1", 1, {opacity:1, ease:Power2.easeIn}, 3);
  $('#whatis-btn').click(function() {
    var tl2 = new TimelineLite();
    tl2.staggerTo(".fade-out1", 1, {opacity:0, ease:Power2.easeIn}, -0.5);
    tl2.staggerTo("#opening-content1", 1, {display: 'none'}, 0);
    tl2.staggerTo(".fade-in2", 1, {opacity:1, ease:Power2.easeIn}, 6);
  });
  $('#letskill-btn').click(function() {
    var tl3 = new TimelineLite();
    tl3.staggerTo(".fade-in2", 1, {opacity:0, ease:Power2.easeIn}, -0.5);
    tl3.staggerTo(".fade-in-logo", 1, {delay: 1, opacity:1, ease:Expo.easeIn}, 1);
    tl3.staggerTo("#opening", 1, {height:"0%", ease:Power2.easeIn}, 1);
  });

});
