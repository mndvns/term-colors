
/**
 * Module dependencies.
 */

var Color = require('color');
var parse = require('color-parser');
var table = require('./table');
var type = require('type-component');

/**
 * Local constants.
 */

var lookup = swap(table);
var incs = ['0x00', '0x5f', '0x87',
            '0xaf', '0xd7', '0xff'];

module.exports = function (clr) {
  return ansi(clr);
};

/**
 * 
 */

function ansi(clr) {
  // TODO clean this crappy thing up
  var color = new Color(clr);
  var vert = convert.bind(color);
  color.values.ansi = convert(color.hexString());
  color.ansi = function(c) {
    return color.values.ansi = vert(c);
  }
  return color;
}

/**
 * Receive a string and return the closest
 * ansi color available.
 *
 * @param {String} clr
 */

function convert(clr) {
  // TODO fix these two lines to use either `toRGB` or '#hexString`
  if (typeof clr !== 'string') clr = this.hexString();
  var rgb = toRGB(clr);
  for (var i=0, parts=[]; i < rgb.length; i += 2) {
    var code = rgb.slice(i, i + 2);
    var hex = parseInt(code, 16);
    parts.push(hex);
  }
  for (var ii=0, res=[]; ii < parts.length; ii++) {
    var part = parts[ii];
    var i = 0;
    while (i < incs.length - 1) {
      var s = incs[i];
      var b = incs[++i];
      if (s <= part && part <= b) {
        var s1 = Math.abs(s - part);
        var b1 = Math.abs(b - part);
        if (s1 < b1) { res.push(s); }
                else { res.push(b); }
      }
    }
  }
  for (var i=0, key='', last=''; i < 3; i++) {
    var k = res[i].toString().slice(2);
    // TODO fix this. some keys are being repeated.
    if (last === k) continue;
    key += k;
  }
  return lookup[key];
}

/**
 * Format a color string to `{r, g, b}`.
 * @param {String} clr
 */

function toRGB(clr) {
  var rgba = parse(clr.toString());
  var buf = [];
  for (var k in rgba) {
    if (k === 'a') break;
    var v = rgba[k];
    var b = v.toString(16);
    b = b !== '0' ? b : '00';
    buf += b;
  }
  return buf;
}

/**
 * Clone an object.
 * @param {Object} obj
 */

function clone(obj) {
  var res = {};
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      res[k] = obj[k];
    }
  }
  return res;
}

/**
 * Clone an object with inverted key/values.
 * @param {Object} original
 * @param {Object} obj
 */

function swap(original, obj) {
  obj = obj || {};
  for (var k in original) {
    var v = original[k];
    obj[v] = k;
  }
  return obj;
}
