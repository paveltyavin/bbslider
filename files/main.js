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
  slider_events_change.on('changing', function (event) {
    result_events_changing.innerHTML = getTotalLength(event.data).toString();
  });
  slider_events_change.on('change', function (event) {
    result_events_change.innerHTML = getTotalLength(event.data).toString();
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


  var slider_options_valueParse = new multirangeslider({
    min: 0,
    max: 24,
    step: 0.5,
    minWidth: 2,

    label: function (value) {
      var minutes = value[1] - value[0];
      var hours = minutes / 60;
      if (hours == 1) {
        return 'one hour';
      }
      if (hours < 1) {
        return 'less than an hour';
      }
      if (hours > 1) {
        var result = parseInt(hours) + " hours";
        if ((hours % 1).toFixed(2) == "0.50") {
          result += " and a half";
        }
        return result;
      }
    },
    valueParse: function (value) {
      return value * 60
    },
    valueFormat: function (value) {
      return value / 60
    }
  });

  document.getElementById('slider_options_valueParse').appendChild(slider_options_valueParse.el);
  slider_options_valueParse.add([0, 7.5]);
  slider_options_valueParse.add([12.5, 23]);

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
  });

  var slider_methods_remove = new multirangeslider({
    min: 0,
    max: 100,
    step: 4
  });
  document.getElementById('slider_methods_remove').appendChild(slider_methods_remove.el);
  slider_methods_remove.add([40, 60], {id: 1});
  slider_methods_remove.add([80, 100], {id: 2});
  document.getElementById('button_methods_remove').addEventListener('click', function (event) {
    event.preventDefault();
    slider_methods_remove.remove(1);
  });
});