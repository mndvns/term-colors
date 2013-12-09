
var app = require('..');
var table = require('../table');

describe('color', function() {
  it('should generate stuff', function() {
    forAll(property, randomHex);
  });
});

// number of tests to generate
var GEN = 7000;
// toggle stdout on or off
var OUT = true;
// width of characters to write
var WIDTH = 1;
// clear the terminal
process.stdout.write('\u001b[2J');

function forAll(property) {
  var generators = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < GEN; i ++) {
    var values = generators.map(fn);
    property.apply(null, values);
  }
  function fn(f) { return f(); }
}

function property(color) {
  var clr = app(color);
  clr.values.should.be.an.Object;
  clr.values.ansi.should.be.a.String;
  clr.values.rgb.should.be.an.Array;
  clr.ansi.should.be.a.Function;
  table[clr.ansi()].should.be.ok;
  print(color)
}

function print(raw, fmtd) {
  var out = fmtd || raw;
  var clr = app(raw)
  var ansi = clr.ansi();
  var lines = '';
  write(48);
  write(38);
  function write(ln) {
    lines += '\033['+ln+';5;'+ansi+'m'+out.slice(0, WIDTH)+'\033[0m';
  }
  if (OUT) process.stdout.write(lines);
  return lines;
}

function randomHex() {
  for (var i = 10, buf = '#'; i >= 0; --i) {
    buf += randomInt(0, 16).toString(16)
  }
  return buf.slice(0, 7);
}

function randomInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
