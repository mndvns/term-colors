
var app = require('..');
var table = require('../table');
var should = require('should');


describe('color', function() {
  it('should generate stuff', function() {
    forAll(property, randomHex);
  });
});

// number of tests to generate
var GEN = 2000;
// toggle stdout on or off
var OUT = true;
// width of characters to write
var WIDTH = 1;
// clear the terminal
// process.stdout.write('\u001b[2J');

var prev = '';
var total = 0;

function forAll(property) {
  console.log();

  var generators = Array.prototype.slice.call(arguments, 1);

  for (var i = 0; i < GEN; i ++) {
    generators.map(render)
  }

  function render(i, f) {
    return property.apply(null, Ri(6, '#'));
  }

  function randomInteger(r){
    var i = parseInt(randomInt(0,123).toString().replace(/\./,''));
    if (r = typeof r !== 'number' ? randomInteger(i) : r) return r = r.toString(16)
  }

  function Ri(l, char){
    for (var i = 0, r = []; i <= l; i++) r[i] = char + randomInteger().slice(1, l+1);
    total ++;
    return r;
  }

}

function property(color) {
  // color = color.replace(/^#+/, '#');
  color = color.slice(0,4);
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
  var ansi = app(raw).ansi();
  var lines =
     '\033[0m'
    +'\033[48;5;'+ansi+'m'+out.slice(0, WIDTH)+'\033[0m'
    +'\033[38;5;'+ansi+'m'+out.slice(0, WIDTH)+'\033[0m'
  return OUT && process.stdout.write(lines);
}

function randomHex() {
  return randomInt(0, 16)
    .toString(16)
    .replace(/\./mg,'')
    .slice(0,5);
}

function randomInt(max, min) {
  return Math.random() * (max - min + 1) + min;
}
