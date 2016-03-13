module.exports = Part;


function Part( name , types , createF , extras ){
  if ( typeof name != "string" ) throw("name must be a string");
  if ( typeof createF != "function" ) throw("create must be a function");
  this.name = name;
  this.types = types;
  this.create = function( image , parent , source , index , opts ){
    var p = new Instance( this , image , parent , source , index , opts );
    if ( extras ) for ( var n in extras ){
      p[n] = extras[n];
    }
    p.create = createF;
    p.create(); // allow extra creativity
    return p;
  }
}

function Instance( part , image , parent , source , index , opts ){
  this.part = part;
  this.image = image;
  this.parent = parent;
  this.source = source;
  this.index = index;
  this.partIndex = index+1;
  this.opts = opts;
  this.subparts = [];
  this.random = source.seq(index);
}
Instance.prototype.describe = function( offset ){
  return offset+this.part.name+"("+(this.description||"")+")\n"+
    this.subparts.map(function(p){ return p.describe(" "+offset) }).join("");
}
Instance.prototype.findPart = function( key ){
  return this.parent.findPart(key);
}
Instance.prototype.get = function( key ){
  if ( this[key] ) return this[key];
  return this.parent.get(key);
}
Instance.prototype.createPart = function( key , indexOffset , opts ){
  var part = this.findPart(key);
  if ( !part ) throw("Unable to find part '"+part+"'");
  return part.create(
    this.image ,
    this /* parent */ ,
    this.source ,
    this.index+indexOffset ,
    opts||this.opts
  );
}
Instance.prototype.choseColor = function(){
  return this.get('pallete').choseColor( this.random );
}
Instance.prototype.buildXML = function( xml ){
  g = xml;
  if ( this.xml ){
    g = this.xml(xml)||xml; // if this returns an element, use it.
  };
  this.subparts.map(function(subpart){
    subpart.buildXML( g );
  });
}
Instance.prototype.findPart = function( key ){
  if ( this.parts ){
    return this.parts.find( this.partIndex , this.source , key );
  }else{
    return this.parent.findPart( key );
  }
}
