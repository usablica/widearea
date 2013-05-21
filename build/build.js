#!/usr/bin/env node

var fs = require('fs'),
  compressor = require('node-minify');

new compressor.minify({
  type: 'gcc',
  fileIn: '../widearea.js',
  fileOut: '../minified/widearea.min.js',
  callback: function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("JS minified successfully.");
    }
  }
});

new compressor.minify({
  type: 'yui-css',
  fileIn: '../widearea.css',
  fileOut: '../minified/widearea.min.css',
  callback: function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Main CSS minified successfully.");
    }
  }
});