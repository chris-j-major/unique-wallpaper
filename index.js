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


function Image( source , index , base , opts ){
  this.source = source;
  this.index = index;
  this.terms = {};
  this.parts = opts.parts || base.parts;
  this.base = this.parts.find( index , source , "base" );
  this.pallete = this.parts.find( index , source , "pallete" ).create( this, this , source , index+2 , opts );
  //this.root = base.create( this , this , source , index+1 , opts );
}
Image.prototype.get = function(n){
  if ( n == 'pallete '){
    return this.pallete;
  }
  if ( opts[n] ){
    return opts[n];
  }
  return null;
}
Image.prototype.addTerm = function( key , term ){
  return null;
}
Image.prototype.toXML = function(){
  return "";
}
Image.prototype.toDescription = function(){
  return "";
}


module.exports = Unique;
