var SVGParts = {};
module.exports = SVGParts;

SVGParts.Transform = function Transform( part , transform ){
  this.part = part;
  this.transform = transform;
}
setPrototypes( SVGParts.Transform , "part" );
SVGParts.Transform.prototype.buildXML = function( xml ){
  var g = xml.ele("g").att("transform",this.transform );
  this.part.buildXML( g );
  return g;
}


SVGParts.Mask = function Mask( opts ,parts){
  this.opts = opts;
  this.parts = parts;
  this.id = "not added yet!"
}
SVGParts.Mask.prototype.buildXML = function buildXML( xml ){
  this.opts.id = this.id;

  var e = xml.ele('mask',this.opts);
  for ( var id in this.parts ){
    this.parts[id].buildXML( e );
  }
  return e;
}


function setPrototypes( Object , element ){
  Object.prototype.describe = function( offset ){
    return this[element].describe(offset);
  }
  Object.prototype.findPart = function( key ){
    return this[element].findPart(key);
  }
  Object.prototype.get = function( key ){
    return this[element].get(key);
  }
  Object.prototype.createPart = function( key , indexOffset , opts ){
    return this[element].createPart(key,indexOffset,opts);
  }
  Object.prototype.choseColor = function(){
    return this[element].choseColor(key,indexOffset,opts);
  }
}
