module.exports = Part;


function Part( name , types , createF , extras ){
  if ( typeof name != "string" ) throw("name must be a string");
  if ( typeof createF != "function" ) throw("create must be a function");
  this.name = name;
  this.types = types;
  this.create = function( image , parent , source , index , opts ){
    var p = new Instance( this , image , parent , source , index , opts );
    for ( var n in extras ){
      p[n] = extras[n];
    }
    p.create = createF;
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
  this.random = source.seq(index);
}
