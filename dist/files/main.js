document.addEventListener("DOMContentLoaded", function (event) {
  var slider_1 = new BBSlider({
    min: 0,
    max: 100,
    step: 10
  });
  document.getElementById('el1').appendChild(slider_1.el);

  var slider_2 = new BBSlider({
    min: 0,
    max: 100,
    step: 10
  });
  slider_2.addRange([20, 60], {id: 1});
  document.getElementById('el2').appendChild(slider_2.el);

  slider_2.on('changing', function (data) {
    var result = 0;
    for (var i = 0; i < data.val.length; i++) {
      result += (data.val[i][1] - data.val[i][0]);
    }
    document.getElementById('result2').innerHTML = result.toString();
  });
  slider_2.on('change', function (data) {
    var result = 0;
    for (var i = 0; i < data.val.length; i++) {
      result += (data.val[i][1] - data.val[i][0]);
    }
    document.getElementById('result3').innerHTML = result.toString();
  });


  var slider_3 = new BBSlider({
    min: 0,
    max: 100,
    step: 10
  });
  slider_3.addRange([20, 60], {id: 1});
  slider_3.addRange([90, 100], {id: 2});
  document.getElementById('el3').appendChild(slider_3.el);

  var result4el = document.getElementById('result4');
  var result5el = document.getElementById('result5');
  var result6el = document.getElementById('result6');

  slider_3.on('range:changing', function (data) {
    if (data.id == 1) {
      result4el.innerHTML = (data.val[1] - data.val[0]).toString();
    }
  });

  slider_3.on('range:change', function (data) {
    if (data.id == 1) {
      result5el.innerHTML = (data.val[1] - data.val[0]).toString();
    }
    result6el.innerHTML = data.id.toString();
  });


  var slider_4 = new BBSlider({
    min: 0,
    max: 100,
    step: 10
  });
  document.getElementById('el4').appendChild(slider_4.el);
  slider_4.val([[40, 60], [80, 100]]);

});