var SeededRandom = require("./seededRandom");
var Color = require("./color");
var builder = require('xmlbuilder');

function Struct(key,width,height,parts){
  this.random = new SeededRandom(key);
  this.parts = parts;
  this.width = width;
  this.height = height;
  this.defs = [];
  this.defId = 1;
  // this must be last...
  this.pallete = this.pickPart("pallete").create( this , this );
  this.root = this.pickPart("root").create( this , this );
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
Struct.prototype.pickColors = function( number ){
  var offset = 1/number;
  var start = this.random.float();
  var retval = [];
  for ( var index = 0 ; index < number ; index++){
    retval[index] = this.pallete.getColor( (start + (offset * index)) % 1.0 );
  }
  return retval;
}

module.exports = Struct;
