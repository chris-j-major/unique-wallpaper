var source = require('./source');
var parts = require('./parts');
var xmlbuilder = require('xmlbuilder');

function Unique( opts ){
  var o = opts||{};
  this.opts = new Opts( o );
  this.parts =  parts[o.parts||"all"];
}

Unique.prototype.create = function( seed , opts ){
  if ( ! opts ) opts = {};
  var s = null;
  if ( typeof seed == 'number' ){
    s = source.seededSource( seed );
  }else{
    var data = seed.split("").map( function(c){ return (c.charCodeAt(0) / 128.0)%1.0 } );
    s = source.loopingSource( data );
  }
  return new Image( s , opts.index||0 , this , opts );
}


function Image( source , index , unique , opts ){
  this.source = source;
  this.index = index;
  this.partIndex = this.index+4;
  this.terms = {};
  this.opts = unique.opts.extend( opts );
  if ( ! this.opts.width ) this.opts.width = 800;
  if ( ! this.opts.height ) this.opts.height = 600;
  this.parts = opts.parts || unique.parts;
  this.defs = [];
  this.defId = 1;
  this.extras = [];
  this.base = this.parts.find( index , source , "base" );
  this.pallete = this.parts.find( index+1 , source , "pallete" ).create( this, this , source , index+2 , this.opts );
  this.root = this.base.create( this , this , source , index+3 , this.opts );

  if ( this.opts.swatch ){
    this.extras.push( this.parts.find( index , source , "swatch" ).create( this, this , source , index+1 , this.opts ) );
  }
  if ( this.opts.mainText ){
    this.extras.push( this.parts.find( index , source , "textMain" ).create( this, this , source , index+1 , this.opts.extend({text:this.opts.mainText}) ) );
  }
  if ( this.opts.subText ){
    this.extras.push( this.parts.find( index , source , "textSub" ).create( this, this , source , index+1 , this.opts.extend({text:this.opts.subText}) ) );
  }
}
Image.prototype.get = function(n){
  if ( n == 'pallete' ){
    return this.pallete;
  }
  if ( n == 'parts' ){
    return this.parts;
  }
  if ( this.opts[n] ){
    return this.opts[n];
  }
  console.trace("Unable to find a '"+n+"'")
  return null;
}
Image.prototype.findPart = function( key ){
  return this.parts.find( this.partIndex++ , this.source , key );
}
Image.prototype.addTerm = function( key , term ){
  if ( !this.terms[key] ){
    this.terms[key] = [];
  }
  if (this.terms[key].indexOf( term ) == -1 ){
    this.terms[key].push( term );
  }
}
Image.prototype.createDef = function( def ){
  var id = "def"+(this.defId++);
  def.id = id;
  this.defs.push( def );
  return id;
}
Image.prototype.toXML = function( pretty ){
  var xml = xmlbuilder.create('svg');
  xml.att('width', this.opts.width );
  xml.att('height', this.opts.height );
  xml.att('xmlns',"http://www.w3.org/2000/svg");
  xml.att('xmlns:xlink',"http://www.w3.org/1999/xlink")
  xml.att("version","1.1");
  // build the definitions
  if ( this.defs.length > 0  ){
    var xmlDefs = xml.ele("defs");
    for ( var id in this.defs ){
      var def = this.defs[id];
      var e = def.buildXML( xmlDefs );
      e.att("id",def.id);
    }
  }
  // now build the structyre
  this.root.buildXML(xml);
  // build extra things if requested
  if ( this.extras ) for ( var id in this.extras ){
    this.extras[id].buildXML(xml);
  }
  // return
  return xml.end({ pretty: pretty });
}
Image.prototype.toDescription = function(){
  return this.pallete.describe("") + this.root.describe("") + this.extras.map( function(e){ return e.describe("."); } ).join("");
}

function Opts(n){
  for ( var key in n ){
    this[key] = n[key];
  }
}
Opts.prototype.extend = function( n ){
  var k = [];
  for ( var key in this ){
    k[key] = this[key];
  }
  for ( var key in n ){
    k[key] = n[key];
  }
  return new Opts(k);
}

module.exports = Unique;
