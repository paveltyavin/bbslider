# Development

To run tests use this commands.

    npm install
    gulp build
    npm test
    
To start development process, execute `gulp` command, 
open `./test/index.html` in the browser and make start changing the code.

# Contributing

Source code, bugtracker and so one are here: 
https://github.com/paveltyavin/bbslider/ 


# Conventions

* All mouse events contain only this options:
    * clientX
    * clientY 
    * target
    
* Bar items can't use it's child (Range and Ghost) methods, but 
Range and Ghost can use methods of Bar
 
* BBSlider contains only pubic api methods end emits only public api events

## todo 

* functions
    * allowRemove
    * allowSwap
    * valueFormat
    * valueParse

* events
    * `.on('change', `
    * `.on('changing', `
    * `.on('range:click', `
    * `.on('range:remove', `
    * `.on('range:change', `
    
* methods
    * `.val(data)` validation
    * `.add()`
    * `.remove()`
    
* styles

* tests
    * ?
    
* gif
