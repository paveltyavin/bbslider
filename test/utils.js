function down(el, options) {
  if (options == undefined) {
    options = {}
  }
  var x = options.x || 0;
  var y = options.y || 0;
  var rect = el.getBoundingClientRect();

  simulant.fire(el, 'mousedown', {
    clientX: rect.left + x,
    clientY: rect.top + y
  });
}
function leave(el, options) {
  if (options == undefined) {
    options = {}
  }
  var x = options.x || 0;
  var y = options.y || 0;
  var rect = el.getBoundingClientRect();

  simulant.fire(el, 'mouseleave', {
    clientX: rect.left + x,
    clientY: rect.top + y
  });
}

function up(el, options) {
  if (options == undefined) {
    options = {}
  }
  var x = options.x || 0;
  var y = options.y || 0;
  var rect = el.getBoundingClientRect();

  simulant.fire(el, 'mouseup', {
    clientX: rect.left + x,
    clientY: rect.top + y
  });
}


function move(el, options, count) {
  if (options == undefined) {
    options = {}
  }
  if (count == undefined) {
    count = 100000;
  }
  if (count == 0) {
    throw new Error('maximum recursion exhausted')
  }

  var moveX;
  var moveY;

  if (options.endX !== undefined) {
    moveX = options.endX - options.startX
  } else {
    moveX = options.moveX || 0;
  }
  if (options.endY !== undefined) {
    moveY = options.endY - options.startY
  } else {
    moveY = options.moveY || 0;
  }

  var signX = moveX > 0 ? 1 : -1;
  var signY = moveY > 0 ? 1 : -1;

  var stepX = options.stepX || 1;
  var stepY = options.stepY || 1;

  var stopX = moveX == 0 || false;
  var stopY = moveY == 0 || false;

  var rect = el.getBoundingClientRect();

  var clientX = 0;
  var clientY = 0;

  if (options.clientX == undefined) {
    clientX = rect.left;
  } else {
    clientX = options.clientX;
  }

  if (options.clientY == undefined) {
    clientY = rect.top;
  } else {
    clientY = options.clientY;
  }

  if (options.startX != undefined) {
    clientX += options.startX;
  }
  if (options.startY != undefined) {
    clientY += options.startY;
  }

  if (!stopX) {
    clientX += stepX * signX;
  }

  if (!stopY) {
    clientY += stepY * signY;
  }

  simulant.fire(el, 'mousemove', {
    clientX: clientX,
    clientY: clientY
  });

  if (!stopX && (moveX - stepX * signX) * signX < 0) {
    stopX = true;
  }
  if (!stopY && (moveY - stepY * signY) * signY < 0) {
    stopY = true;
  }

  if (!stopX || !stopY) {
    move(el, {
      stepX: stepX,
      stepY: stepY,
      moveX: moveX - (stopX ? 0 : stepX * signX),
      moveY: moveY - (stopY ? 0 : stepY * signY),
      clientX: clientX,
      clientY: clientY
    }, count - 1);
  }
}