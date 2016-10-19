# multirangeslider

[![Build Status](https://travis-ci.org/paveltyavin/multirangeslider.svg?branch=master)]
(https://travis-ci.org/paveltyavin/multirangeslider)

Slider for multiple ranges.

![slider](slider.gif "slider")
 
The idea comes from [Elessar](https://github.com/quarterto/Elessar)
 project. Thank you, [Matt](https://github.com/quarterto/)!
 
Main documentation is [here](http://paveltyavin.github.io/multirangeslider/).

## Install && Usage

    npm install multirangeslider
    

multirangeslider exports as a CommonJS (Node) module, an AMD module, or a browser global:
```javascript
var multirangeslider = require('multirangeslider');
```
```javascript
require(['multirangeslider'], function(multirangeslider) { ... });
```
```html
<script src="path/to/multirangeslider.js"></script>
```

Create an instance with `var slider = new multirangeslider` then add `slider.el` to the DOM somewhere.

```javascript
var slider = new multirangeslider;
var yourElement = document.getElementById('your-element');
yourElement.appendChild(slider.el);
```

## Documentation

See this [page](http://paveltyavin.github.io/multirangeslider/).

## Licence
[MIT](licence.md)