var SVGParts = {};
module.exports = SVGParts;

SVGParts.Transform = function( part , transform ){
  this.part = part;
  this.transform = transform;
}
SVGParts.Transform.prototype.describe = function( offset ){
  return this.part.describe(offset);
}
SVGParts.Transform.prototype.findPart = function( key ){
  return this.part.findPart(key);
}
SVGParts.Transform.prototype.get = function( key ){
  return this.part.get(key);
}
SVGParts.Transform.prototype.createPart = function( key , indexOffset , opts ){
  return this.part.createPart(key,indexOffset,opts);
}
SVGParts.Transform.prototype.choseColor = function(){
  return this.part.choseColor(key,indexOffset,opts);
}
SVGParts.Transform.prototype.buildXML = function( xml ){
  var g = xml.ele("g").att("transform",this.transform );
  this.part.buildXML( g );
  return g;
}
