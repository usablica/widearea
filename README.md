Widearea
========

> Lightweight, easy-to-use JavaScript/CSS library to create expandable textarea and write large amount of text easily.

## How to use

Really simple. Just include both `widearea.js` and `widearea.css` in your page (use minified version for production) and then call this JavaScript function:

    wideArea();

See online [demo](http://usablica.github.io/widearea/).

## API

###wideArea([selector])

Creating a Widearea object.

**Available since**: v0.1.0

**Parameters:**
 - selector : String (optional)
   Should be defined to search for `textarea`s in a specific container

**Returns:**
 - wideArea object.

**Example:**
```javascript
wideArea() //without selector, to search all textarea(s) in the page
wideArea("#writingContainer") //search for textarea(s) only in #writingContainer
````

-----

###wideArea.setOption(option, value)

Set a single option to wideArea object.

**Available since**: v0.1.0

**Parameters:**
 - option : String
   Option key name.

 - value : String/Number
   Value of the option.

**Returns:**
 - wideArea object.

**Example:**
```javascript
wideArea().setOption("defaultColorScheme", "dark");
````

----

###wideArea.setOptions(options)

Set a group of options to the wideArea object.

**Available since**: v0.1.0

**Parameters:**
 - options : Object
   Object that contains option keys with values.

**Returns:**
 - wideArea object.

**Example:**
```javascript
wideArea().setOptions({ defaultColorScheme: "dark", closeIconLabel: "Exit" });
````

-----

###wideArea.clearData(value)

Clear the textarea value from localStorage

**Available since**: v0.3.0

**Parameters:**
 - value : Object | String | Number
   This method accept parameter with different types
     1. `Object` for clearing data using DOM object
     2. `String` for clearing data using CSS selector
     3. `Number` for clearing data using the widearea id

**Returns:**
 - wideArea object.

**Example:**
```javascript
wideArea().clearData(1); //clear textarea data with `data-widearea-id` == 1
wideArea().clearData("#first"); //clear textarea data with `#first` selector
wideArea().clearData($("#first")); //get DOM object with jQuery and pass it to clearData()
````

-----

###Options:

 - `wideAreaAttr`: Extra attribute name for detecting `textarea`s that uses Widearea, default is `data-widearea`
 - `exitOnEsc`: Close Fullscreen mode when pressing Escape, default is `true`
 - `defaultColorScheme`: Default color scheme, default is `light`
 - `closeIconLabel`: Close icon label, default is `Close WideArea`.
 - `changeThemeIconLabel`: Change color scheme icon label, default is `Toggle Color Scheme`
 - `fullScreenIconLabel`: Fullscreen mode icon label, default is `WideArea Mode`
 - `autoSaveKeyPrefix`: Prefix key for localStorage items


## Build

First you should install `nodejs` and `npm`, then first run this command: `npm install` to install all dependencies.

Now you can run this command to minify all static resources:

    make build

## Roadmap
- More browser compatibility
- Provide more examples
- Add templating option

## Release History

 * **v0.3.0** - 2013-07-26 
   - Add auto-save option for all textareas
   - Bug fixes

 * **v0.2.0** - 2013-06-07 
   - Basic changes in initiating WideArea
   - Remove WideArea div wrapper
   - Code refactoring

 * **v0.1.1** - 2013-05-26 
   - Adding tab-key support while typing
   - Fix some bugs in multiple textareas
   - Fix bug when textarea has an existing value

 * **v0.1.0** - 2013-05-22 
   - First commit. 

## Author
**Afshin Mehrabani**

- [Twitter](https://twitter.com/afshinmeh)
- [Github](https://github.com/afshinm)
- [Personal page](http://afshinm.name/)  

**Ehsan Arasteh**

- [Twitter](https://twitter.com/ehsandotnet)
- [Github](https://github.com/ehsandotnet)  

## License
> Copyright (C) 2012 Afshin Mehrabani (afshin.meh@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.
