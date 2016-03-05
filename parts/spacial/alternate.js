var svgParts = require("../svgParts");
var Color = require("../../core/color");

module.exports = {
  tags:["spacial"],
  create:function create(struct,stack,details){
    return new Alternate(struct,stack,details);
  }
}

function Alternate( struct , stack , details ){
  if ( ! details ) details = {};
  this.parent = stack;
  this.a = struct.pickPart("spacial-simple").create( struct , stack );
  this.b = struct.pickPart("spacial-simple").create( struct , stack );
  this.ac = struct.random.range(0.2,0.8);
  this.w = stack.width;
  this.random = struct.random.spawn();
}

Alternate.prototype.float = function(x,y){
  var n = x+(y+this.w);
  if ( this.random.memo(n ) < this.ac ){
    return this.a.float(x,y);
  }else{
    return this.b.float(x,y);
  }
}

Alternate.prototype.describe = function(s){
  return s+"Alternate\n";
}
