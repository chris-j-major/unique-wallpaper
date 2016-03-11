var parts = require('./parts');
var core = require('./core');

var RandomSeed = require('random-seed');

require("./parts/pointset");
require("./parts/lines");
require("./parts/blocks");
require("./parts/palletes");
require("./parts/shapes");
require("./parts/overlays");
require("./parts/tiles");
require("./parts/spacial");

require("./parts/debug");

module.exports = function (opts){
  if ( ! opts ) opts = {};

  return new Unique(parts,core,opts);
}

function Unique(parts,core,opts){
  this.parts = parts;
  this.core = core;
  this.opts = opts;
}
Unique.prototype.start = function(key){
  return new Builder(this,key);
}

function Builder(unique,key){
  this.unique = unique;
  this.width = unique.opts.width||800;
  this.height = unique.opts.height||600;
  if ( typeof key == 'number' ){
    this.key = key;
    this.rand = new RandomSeed(key).random;
  }else{
    this.key = null;
    this.rand = key;
  }
  this.struct = null;
}
Builder.prototype.size = function(width,height){
  this.width = width;
  this.height = height;
  return this;
};
Builder.prototype.getStruct = function(){
  if ( !this.struct ){
    this.struct = this.unique.core.process(this.rand,this.width,this.height,this.unique.parts,this.unique.opts);
  }
  return this.struct;
}
Builder.prototype.describe = function(){
  return this.getStruct().describe();
};
Builder.prototype.writeXML = function( pretty ){
  return this.getStruct().build( pretty )
}
Builder.prototype.keySearch = function( key  ){
  return makeSet(this.getStruct().keySearch( key.toLowerCase() ));
}

function makeSet(a){
  var ret = [];
  for ( var id in a ){
    if ( ret.indexOf(a[id]) == -1 ) ret.push(a[id]);
  }
  return ret;
}
