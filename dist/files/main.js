function getTotalLength(data) {
  var result = 0;
  for (var i = 0; i < data.length; i++) {
    var range = data[i];
    result += (range.val[1] - range.val[0]);
  }
  return result;
}

document.addEventListener("DOMContentLoaded", function (event) {


  //Overview

  var slider = new multirangeslider({
    min: 0,
    max: 100,
    step: 2,
    minWidth: 14
  });
  document.getElementById('el').appendChild(slider.el);


  // Events

  var slider_events_change = new multirangeslider({
    min: 0,
    max: 100,
    step: 10
  });
  document.getElementById('el_events_change').appendChild(slider_events_change.el);
  slider_events_change.add([20, 60], {id: 1});
  var result_events_changing = document.getElementById('result_events_changing');
  var result_events_change = document.getElementById('result_events_change');
  slider_events_change.on('changing', function (data) {
    result_events_changing.innerHTML = getTotalLength(data).toString();
  });
  slider_events_change.on('change', function (data) {
    result_events_change.innerHTML = getTotalLength(data).toString();
  });


  // Options

  var slider_options_allowRemove = new multirangeslider({
    min: 0,
    max: 100,
    step: 4,
    minWidth: 12,
    allowRemove: true
  });
  document.getElementById('slider_options_allowRemove').appendChild(slider_options_allowRemove.el);
  slider_options_allowRemove.add([40, 60]);
  slider_options_allowRemove.add([80, 100]);


  var slider_options_maxRanges = new multirangeslider({
    min: 0,
    max: 100,
    step: 10,
    maxRanges: 3
  });
  document.getElementById('slider_options_maxRanges').appendChild(slider_options_maxRanges.el);
  slider_options_maxRanges.add([0, 10]);
  slider_options_maxRanges.add([20, 40]);


  var slider_options_readOnly = new multirangeslider({
    min: 0,
    max: 100,
    step: 10,
    readOnly: true
  });
  document.getElementById('slider_options_readOnly').appendChild(slider_options_readOnly.el);
  slider_options_readOnly.add([0, 10]);
  slider_options_readOnly.add([20, 40]);


  // Methods

  var slider_methods_removeAll = new multirangeslider({
    min: 0,
    max: 100,
    step: 4
  });
  document.getElementById('slider_methods_removeAll').appendChild(slider_methods_removeAll.el);
  slider_methods_removeAll.add([40, 60]);
  slider_methods_removeAll.add([80, 100]);
  document.getElementById('button_methods_removeAll').addEventListener('click', function (event) {
    event.preventDefault();
    slider_methods_removeAll.removeAll();
  })

});