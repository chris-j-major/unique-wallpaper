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
  this.random = struct.random.spawn();
}

Noise.prototype.float = function(x,y){
  return this.random.float();
}

Noise.prototype.describe = function(s){
  return s+"Noise\n";
}
