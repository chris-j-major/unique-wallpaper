var source = require('./source');
var parts = require('./parts');
var xmlbuilder = require('xmlbuilder');

function Unique( opts ){
  var o = opts||{};
  this.parts =  parts[o.parts||"all"];
}

Unique.prototype.create = function( seed , opts ){
  if ( ! opts ) opts = {};
  if ( ! opts.width ) opts.width = 800;
  if ( ! opts.height ) opts.height = 600;
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
  this.opts = new Opts( opts );
  this.parts = opts.parts || unique.parts;
  this.defs = [];
  this.extras = [];
  this.base = this.parts.find( index , source , "base" );
  this.pallete = this.parts.find( index+1 , source , "pallete" ).create( this, this , source , index+2 , this.opts );
  this.root = this.base.create( this , this , source , index+3 , this.opts );
  if ( opts.swatches ){
    this.extras.push( this.parts.find( index , source , "swatches" ).create( this, this , source , index+1 , this.opts ) );
  }
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
Image.prototype.toXML = function( pretty ){
  var xml = xmlbuilder.create('svg');
  xml.att('width', this.opts.width );
  xml.att('height', this.opts.height );
  xml.att('xmlns',"http://www.w3.org/2000/svg");
  xml.att('xmlns:xlink',"http://www.w3.org/1999/xlink")
  xml.att("version","1.1");
  // build the definitions
  var xmlDefs = xml.ele("defs");
  for ( var id in this.defs ){
    var def = this.defs[id];
    var e = def.buildXML( xmlDefs );
    e.att("id",def.id);
  }
  // now build the structyre
  this.root.buildXML(xml);
  if ( this.extra ) for ( var id in this.extra ){
    this.extra[id].buildXML(xml);
  }
  // return
  return xml.end({ pretty: pretty });
  return "";
}
Image.prototype.toDescription = function(){
  return this.root.describe("") + this.pallete.describe("");
}

function Opts(n){
  for ( var key in n ){
    this[key] = n[key];
  }
}
Opts.prototype.extend = function( n ){
  for ( var key in n ){
    this[key] = n[key];
  }
}

module.exports = Unique;
