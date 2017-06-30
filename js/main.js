/* Waits till document is ready */
var color = "#000000";
var random = false;
var lightBrush = false;

$(document).ready(function() {
  //createCanvas();
  $('#createCanvas').on('click', createCanvas);
  $('#clearScreen').on("click", clearScreen);
  $('#randomize').on("click", function() {
    random = true;
    lightBrush = false;
    $('.c-lightlyBrush').css("visibility", 'hidden');
    $('.c-original').css("visibility", 'hidden');
    $('.c-randomize').css("visibility", 'visible');
  });
  $('#lightlyBrush').on("click", function() {
    lightBrush = true;
    random = false;
    $('.c-lightlyBrush').css("visibility", 'visible');
    $('.c-randomize').css("visibility", 'hidden');
    $('.c-original').css("visibility", 'hidden');
  });
  $('#original').on("click", function() {
    lightBrush = false;
    random = false;
    $('.c-original').css("visibility", 'visible');
    $('.c-randomize').css("visibility", 'hidden');
    $('.c-lightlyBrush').css("visibility", 'hidden');
  });


});


function clearScreen() {
  $('.cell').each(function() {
    $(this).removeClass("color");
    $(this).removeClass("random-color");
    $(this).css("background-color", "rgba(255,255,255)");
  });
}

function changeColor() {
  color = $('#background').val();
  $('.color').css('background-color', color);
}

function createCanvas() {
  $('.row').remove();
  var result = window.prompt("How big do you want your canvas to be? Range from 16 to 100", "16");
  if (!Number.isInteger(result) && (result < 0 || result > 100)) {
    alert("Invalid dimensions, creating default canvas");
    result = 16;
  }
  var size = 598 / result;
  for (var k = 0; k < result; k++) {
    $('.container').append('<div class="row"></div>');
  }
  $('.row').each(function() {
    for (var i = 0; i < result; i++)
      $(this).append('<div class="cell"></div>');
  });
  $('.cell').width(size);
  $('.row').height(size);

  $('input#background').on("change",changeColor);

  $('.cell').hover(function() {
    if (lightBrush){
      $(this).css("background-color", makeLighter($(this).css("background-color")));
    } else if (random && !($(this).hasClass("randomize-color"))) {
      $(this).css("background-color", randomizeColor());
      $(this).addClass("color");
    } else {
      $(this).css("background-color", color);
      $(this).addClass("color");
    }

  });
}

function makeLighter(color) {
  color = color.replace(/[^\d,]/g, '').split(',');
  var red = (Math.floor(color[0] - 25.5));
  var green = (Math.floor(color[1] - 25.5));
  var blue = (Math.floor(color[2] - 25.5));
  if (red <= 0)
    return "#000000";
  var lighter_color = "rgb(" + red.toString() + " ," + green.toString() + " ," + blue.toString() + ")";
  return lighter_color;

}

function randomizeColor() {
  var red = Math.floor((Math.random() * 250 - 1) + 1);
  var green = Math.floor((Math.random() * 250 -1) + 1);
  var blue = Math.floor((Math.random() * 250-1) + 1);
  var color = "rgb(" + red.toString() + " ," + green.toString() + " ," + blue.toString() + ")";
  return color;
}
