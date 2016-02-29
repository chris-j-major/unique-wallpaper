var parts = require('./parts');
var core = require('./core');

require("./parts/pointset");
require("./parts/lines");
require("./parts/blocks");
require("./parts/palletes");
require("./parts/shapes");
require("./parts/overlays");


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
  this.key = key;
}
Builder.prototype.size = function(width,height){
  this.width = width;
  this.height = height;
  return this;
};
Builder.prototype.describe = function(){
  var struct = this.unique.core.process(this.key,this.width,this.height,this.unique.parts);
  console.log(struct.describe);
  return struct.describe();
};
Builder.prototype.writeXML = function( pretty ){
  var struct = this.unique.core.process(this.key,this.width,this.height,this.unique.parts);
  return struct.build( pretty )
}
