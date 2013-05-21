/**
 * WideArea v0.1.0
 * https://github.com/usablica/widearea
 * MIT licensed
 *
 * Copyright (C) 2013 usabli.ca - By Afshin Mehrabani (@afshinmeh)
 */

(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    factory(exports);
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports'], factory);
  } else {
    // Browser globals
    factory(root);
  }
} (this, function (exports) {
  //Default config/variables
  var VERSION = '0.1.0';

  /**
   * WideArea main class
   *
   * @class WideArea
   */
  function WideArea(obj) {
    this._targetElement = obj;

    this._options = {
      wideAreaAttr: 'data-widearea',
      exitOnEsc: true,
      defaultColorScheme: 'light',
      closeIconLabel: 'Close WideArea',
      changeThemeIconLabel: 'Toggle Color Scheme',
      fullScreenIconLabel: 'WideArea Mode'
    };

    _enable.call(this);
  }

  /**
   * Enable the WideArea
   *
   * @api private
   * @method _enable
   */
  function _enable() {
    var self = this;
    //select all textareas in the target element
    var textAreaList = this._targetElement.querySelectorAll('textarea[' + this._options.wideAreaAttr + '=\'enable\']');
    //then, change all textareas to widearea
    for (var i = textAreaList.length - 1; i >= 0; i--) {
      var currentTextArea = textAreaList[i];
      //create widearea wrapper element
      var wideAreaWrapper  = document.createElement('div'),
          wideAreaIcons    = document.createElement('div')
          fullscreenIcon   = document.createElement('a');

      wideAreaWrapper.className = 'widearea-wrapper';
      wideAreaIcons.className   = 'widearea-icons';
      fullscreenIcon.className  = 'widearea-icon fullscreen';
      fullscreenIcon.title = this._options.fullScreenIconLabel;
      //hack!
      fullscreenIcon.href = 'javascript:void(0);';

      //bind to click event
      fullscreenIcon.onclick = function() {
        _enableFullScreen.call(self, this);
      };
      //clone current textarea
      wideAreaWrapper.appendChild(currentTextArea.cloneNode());
      wideAreaIcons.appendChild(fullscreenIcon);
      wideAreaWrapper.appendChild(wideAreaIcons);
      //add the wrapper to element
      currentTextArea.parentNode.replaceChild(wideAreaWrapper, currentTextArea);
    };
  }

  /**
   * FullScreen the textarea
   *
   * @api private
   * @method _enableFullScreen
   * @param {Object} link
   */
  function _enableFullScreen(link) {
    var self = this;

    //I don't know whether is this correct or not, but I think it's not a bad way
    var targetTextarea = link.parentNode.parentNode.querySelector("textarea");

    //clone current textarea
    var currentTextArea = targetTextarea.cloneNode();

    //add proper css class names
    currentTextArea.className = ('widearea-fullscreen '   + targetTextarea.className).trim();
    targetTextarea.className  = ('widearea-fullscreened ' + targetTextarea.className).trim();

    var controlPanel = document.createElement('div');
    controlPanel.className = 'widearea-controlPanel';

    //create close icon
    var closeIcon = document.createElement('a');
    closeIcon.href = 'javascript:void(0);';
    closeIcon.className = 'widearea-icon close';
    closeIcon.title = this._options.closeIconLabel;
    closeIcon.onclick = function(){
      _disableFullScreen.call(self);
    };

    //create close icon
    var changeThemeIcon = document.createElement('a');
    changeThemeIcon.href = 'javascript:void(0);';
    changeThemeIcon.className = 'widearea-icon changeTheme';
    changeThemeIcon.title = this._options.changeThemeIconLabel;
    changeThemeIcon.onclick = function() {
      _toggleColorScheme.call(self);
    };

    controlPanel.appendChild(closeIcon);
    controlPanel.appendChild(changeThemeIcon);

    //create overlay layer
    var overlayLayer = document.createElement('div');
    overlayLayer.className = 'widearea-overlayLayer ' + this._options.defaultColorScheme;

    //add controls to overlay layer
    overlayLayer.appendChild(currentTextArea);
    overlayLayer.appendChild(controlPanel);

    //finally add it to the body
    document.body.appendChild(overlayLayer);

    //set the focus to textarea
    currentTextArea.focus();

    //set the value of small textarea to fullscreen one
    currentTextArea.value = targetTextarea.value;

    //bind to keydown event
    this._onKeyDown = function(e) {
      if (e.keyCode === 27 && self._options.exitOnEsc == true) {
        //escape key pressed
        _disableFullScreen.call(self);
      }
    };
    if (window.addEventListener) {
      window.addEventListener('keydown', self._onKeyDown, true);
    } else if (document.attachEvent) { //IE
      document.attachEvent('onkeydown', self._onKeyDown);
    }
  }

  /**
   * Change/Toggle color scheme of WideArea
   *
   * @api private
   * @method _toggleColorScheme
   */
  function _toggleColorScheme() {
    var overlayLayer  = document.querySelector(".widearea-overlayLayer");
    if(/dark/gi.test(overlayLayer.className)) {
      overlayLayer.className = overlayLayer.className.replace('dark', 'light');
    } else {
      overlayLayer.className = overlayLayer.className.replace('light', 'dark');
    }
  }

  /**
   * Close FullScreen
   *
   * @api private
   * @method _disableFullScreen
   */
  function _disableFullScreen() {
    var smallTextArea = document.querySelector("textarea.widearea-fullscreened");
    var overlayLayer  = document.querySelector(".widearea-overlayLayer");
    var fullscreenTextArea = overlayLayer.querySelector("textarea");

    //change the focus
    smallTextArea.focus();

    //set fullscreen textarea to small one
    smallTextArea.value = fullscreenTextArea.value;

    //and then remove the overlay layer
    overlayLayer.parentNode.removeChild(overlayLayer);

    //clean listeners
    if (window.removeEventListener) {
      window.removeEventListener('keydown', this._onKeyDown, true);
    } else if (document.detachEvent) { //IE
      document.detachEvent('onkeydown', this._onKeyDown);
    }
  }

  /**
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   *
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
   */
  function _mergeOptions(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  }

  var wideArea = function (selector) {
    if (typeof (selector) === 'string') {
      //select the target element with query selector
      var targetElement = document.querySelector(selector);

      if (targetElement) {
        return new WideArea(targetElement);
      } else {
        throw new Error('There is no element with given selector.');
      }
    } else {
      return new WideArea(document.body);
    }
  };

  /**
   * Current WideArea version
   *
   * @property version
   * @type String
   */
  wideArea.version = VERSION;

  //Prototype
  wideArea.fn = WideArea.prototype = {
    clone: function () {
      return new WideArea(this);
    },
    setOption: function(option, value) {
      this._options[option] = value;
      return this;
    },
    setOptions: function(options) {
      this._options = _mergeOptions(this._options, options);
      return this;
    },
  };

  exports.wideArea = wideArea;
  return wideArea;
}));