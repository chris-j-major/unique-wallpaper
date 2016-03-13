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
    p.create();
    return p;
  }
}

function Instance( part , image , parent , source , index , opts ){
  this.part = part;
  this.image = image;
  this.parent = parent;
  this.source = source;
  this.index = index;
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
  return this.parent.get(key);
}
Instance.prototype.createPart = function( key , indexOffset , opts ){
  var part = this.findPart(key);
  if ( !part ) throw("Unable to find part '"+part+"'");
  return part.create(
    this.parent , this /* parent */ , this.source , this.index+indexOffset , opts
  );
}
Instance.prototype.choseColor = function(){
  return this.get('pallete').choseColor( this.random );
}
