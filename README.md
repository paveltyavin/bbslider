# BBSLIDER

[![Build Status](https://travis-ci.org/paveltyavin/bbslider.svg?branch=master)]
(https://travis-ci.org/paveltyavin/bbslider)

Slider for multiple ranges.
 
The idea comes from [Elessar](https://github.com/quarterto/Elessar)
 project. Thank you, [Matt](https://github.com/quarterto/)!
 
Main documentation is [here](http://paveltyavin.github.io/bbslider/).

## Install && Usage

    npm install bbslider
    

BBSlider exports as a CommonJS (Node) module, an AMD module, or a browser global:
```javascript
var BBSlider = require('bbslider');
```
```javascript
require(['bbslider'], function(BBSlider) { ... });
```
```html
<script src="path/to/bbslider.js"></script>
```

Create an instance with `var slider = new BBSlider` then add `slider.el` to the DOM somewhere.

```javascript
var slider = new BBSlider;
var yourElement = document.getElementById('your-element');
yourElement.appendChild(slider.el);
```


## Licence
[MIT](licence.md)