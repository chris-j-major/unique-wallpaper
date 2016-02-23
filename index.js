
module.exports = function (opts){
  if ( ! opts ) opts = {};
  var parts = require('./parts');
  var core = require('./core');

  parts.loadPart("blockFill");
  parts.loadPart("blockShapes");
  parts.loadPart("blockSplit");
  parts.loadPart("splitMask");

  parts.loadPart("scatterShapes");
  parts.loadPart("orderedShapes");
  parts.loadPart("gridShapes");

  parts.loadPart("polygon");
  parts.loadPart("stars");
  parts.loadPart("circle");

  parts.loadPart("midToneHilight");
  parts.loadPart("monochrome");
  parts.loadPart("bichrome");
  parts.loadPart("trichrome");

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
Builder.prototype.writeXML = function( pretty ){
  var struct = this.unique.core.process(this.key,this.width,this.height,this.unique.parts);
  return struct.build( pretty )
}
