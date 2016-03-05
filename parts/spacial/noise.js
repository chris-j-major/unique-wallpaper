var svgParts = require("../svgParts");
var Color = require("../../core/color");

module.exports = {
  tags:["spacial","spacial-simple"],
  create:function create(struct,stack,details){
    return new Noise(struct,stack,details);
  }
}

function Noise( struct , stack , details ){
  if ( ! details ) details = {};
  this.parent = stack;
  this.w = (stack.width * 2); // used for generating indexes
  this.random = struct.random.spawn();
}

Noise.prototype.float = function(x,y){
  var n = x+(y+this.w);
  return this.random.memo(n);
}

Noise.prototype.describe = function(s){
  return s+"Noise\n";
}
