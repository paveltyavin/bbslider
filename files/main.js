function getTotalLength(data) {
  var result = 0;
  for (var i = 0; i < data.val.length; i++) {
    result += (data.val[i][1] - data.val[i][0]);
  }
  return result;
}

document.addEventListener("DOMContentLoaded", function (event) {


  //Overview

  var slider = new BBSlider({
    min: 0,
    max: 100,
    step: 10
  });
  document.getElementById('el').appendChild(slider.el);


  // Events

  var slider_events_change = new BBSlider({
    min: 0,
    max: 100,
    step: 10
  });
  document.getElementById('el_events_change').appendChild(slider_events_change.el);
  slider_events_change.addRange([20, 60], {id: 1});
  var result_events_changing = document.getElementById('result_events_changing');
  var result_events_change = document.getElementById('result_events_change');
  slider_events_change.on('changing', function (data) {
    result_events_changing.innerHTML = getTotalLength(data).toString();
  });
  slider_events_change.on('change', function (data) {
    result_events_change.innerHTML = getTotalLength(data).toString();
  });


  var slider_events_range_change = new BBSlider({
    min: 0,
    max: 100,
    step: 10
  });
  document.getElementById('el_events_range_change').appendChild(slider_events_range_change.el);
  slider_events_range_change.addRange([20, 60], {id: 1});
  slider_events_range_change.addRange([90, 100], {id: 2});

  var result_events_range_changing = document.getElementById('result_events_range_changing');
  var result_events_range_change = document.getElementById('result_events_range_change');
  var result_events_range_id = document.getElementById('result_events_range_id');

  slider_events_range_change.on('range:changing', function (data) {
    if (data.id == 1) {
      result_events_range_changing.innerHTML = (data.val[1] - data.val[0]).toString();
    }
  });

  slider_events_range_change.on('range:change', function (data) {
    if (data.id == 1) {
      result_events_range_change.innerHTML = (data.val[1] - data.val[0]).toString();
    }
    result_events_range_id.innerHTML = data.id.toString();
  });


  // Methods


  var slider_methods_val = new BBSlider({
    min: 0,
    max: 100,
    step: 10
  });
  document.getElementById('el_methods_val').appendChild(slider_methods_val.el);
  slider_methods_val.val([[40, 60], [80, 100]]);


  // Options

  var slider_options_allowRemove = new BBSlider({
    min: 0,
    max: 100,
    step: 10,
    allowRemove: true
  });
  document.getElementById('slider_options_allowRemove').appendChild(slider_options_allowRemove.el);
  slider_options_allowRemove.val([[40, 60], [80, 100]]);


  var slider_options_maxRanges = new BBSlider({
    min: 0,
    max: 100,
    step: 10,
    maxRanges: 3
  });
  document.getElementById('slider_options_maxRanges').appendChild(slider_options_maxRanges.el);
  slider_options_maxRanges.val([[0, 10], [20, 40]]);

});