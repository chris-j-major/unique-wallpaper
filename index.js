var source = require('./source');
var parts = require('./parts');

function Unique( opts ){
  var o = opts||{};
  this.parts =  parts[o.parts||"all"];
}

Unique.prototype.create = function( seed , opts ){
  if ( ! opts ) opts = {};
  var s = null;
  if ( typeof seed == 'number' ){
    s = source.seededSource( opts.seed );
  }else{
    throw("Seed is not a number "+(typeof seed))
    s = source.loopingSource(opts.data );
  }
  return new Image( s , opts.index||0 , this , opts );
}


function Image( source , index , unique , opts ){
  this.source = source;
  this.index = index;
  this.partIndex = this.index+4;
  this.terms = {};
  this.opts = opts;
  this.parts = opts.parts || unique.parts;
  this.base = this.parts.find( index , source , "base" );
  this.pallete = this.parts.find( index , source , "pallete" ).create( this, this , source , index+1 , opts );
  this.root = this.base.create( this , this , source , index+2 , opts );
}
Image.prototype.get = function(n){
  if ( n == 'pallete' ){
    return this.pallete;
  }
  if ( this.opts[n] ){
    return this.opts[n];
  }
  console.log("Unable to find a '"+n+"'")

  return null;
}
Image.prototype.findPart = function( key ){
  return this.parts.find( this.partIndex++ , this.source , key );
}
Image.prototype.addTerm = function( key , term ){
  return null;
}
Image.prototype.toXML = function(){
  return "";
}
Image.prototype.toDescription = function(){
  return this.root.describe("") + this.pallete.describe("");
}


module.exports = Unique;
