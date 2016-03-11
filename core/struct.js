var SeededRandom = require("./seededRandom");
var Color = require("./color");
var builder = require('xmlbuilder');

function Struct(rand,width,height,parts,opts){
  this.random = new SeededRandom(rand);
  this.parts = parts;
  this.width = width;
  this.height = height;
  this.opts = opts||{};
  this.defs = [];
  this.defId = 1;
  // this must be last...
  this.pallete = this.pickPart("pallete").create( this , this );
  this.spacial = this.pickPart("spacial").create( this , this );
  this.root = this.pickPart("root").create( this , this );

  if ( this.opts.swatch ){
    this.extra = this.pickPart("swatch").create(this , this );
  }
}
Struct.prototype.addDef = function(def){
  var id = "def"+(this.defId++);
  def.id = id;
  this.defs.push( def );
  return id;
}
Struct.prototype.build = function( pretty ){
  var xml = builder.create('svg');
  xml.att('width', this.width );
  xml.att('height', this.height );
  xml.att('xmlns',"http://www.w3.org/2000/svg");
  xml.att('xmlns:xlink',"http://www.w3.org/1999/xlink")
  xml.att("version","1.1");
  // build the definitions
  var xmlDefs = xml.ele("defs");
  for ( var id in this.defs ){
    var def = this.defs[id];
    var e = def.build( xmlDefs );
    e.att("id",def.id);
  }
  // now build the structyre
  this.root.build(xml);
  if ( this.extra ){
    this.extra.build(xml);
  }
  // return
  return xml.end({ pretty: pretty });
}
Struct.prototype.describe = function(){
  return "ROOT\n"+this.root.describe(" ")+"PALLETE\n"+this.pallete.describe(" ");
}
Struct.prototype.pickPart = function( tag ){
  var set = this.parts.getAllByTag( tag );
  var index = Math.floor(this.random.range(0,set.length));
  return set[index];
}
Struct.prototype.keySearch = function( key ){
  var result = this.pallete.keySearch( key );
/*  if ( result ) return result;
  result = this.spacial.keySearch( key , random );
  if ( result ) return result;
  result = this.root.keySearch( key , random );*/
  return result;
}

module.exports = Struct;
