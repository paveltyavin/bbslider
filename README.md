BBSLIDER
========

[![Build Status](https://travis-ci.org/paveltyavin/bbslider.svg?branch=master)]
(https://travis-ci.org/paveltyavin/bbslider)

Slider for timetable on more.

[gif]

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


## Changelog


## Licence
[MIT](licence.md)