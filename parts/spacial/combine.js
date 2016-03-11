var svgParts = require("../svgParts");
var Color = require("../../core/color");
var CommonParts = require("../CommonParts");

module.exports = {
  tags:["spacial"],
  create:function create(struct,stack,details){
    return new Combine(struct,stack,details);
  }
}

function Combine( struct , stack , details ){
  if ( ! details ) details = {};
  this.parent = stack;
  this.a = struct.pickPart("spacial-simple").create( struct , stack );
  this.b = struct.pickPart("spacial-simple").create( struct , stack );
  this.ac = struct.random.range(0.2,0.8);
  this.bc = 1.0 - this.ac;
}

Combine.prototype.float = function(x,y){
  return Math.min(Math.max(
    (this.ac * this.a.float(x,y) + this.bc * this.b.float(x,y))
    ,0.0),1.0);
}

Combine.prototype.describe = function(s){
  return s+"Combien\n";
}

Combine.prototype.keySearch = CommonParts.keySearchCombine( "a" , "b" );
