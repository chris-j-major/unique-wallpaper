var svgParts = require("../svgParts");
var Color = require("../../core/color");

module.exports = {
  tags:["spacial","spacial-simple"],
  create:function create(struct,stack,details){
    return new Radial(struct,stack,details);
  }
}

function Radial( struct , stack , details ){
  if ( ! details ) details = {};
  this.parent = stack;
  this.random = struct.random.spawn();
  var theta = struct.random.float() * Math.PI * 2;
  this.dx = stack.width * struct.random.float();
  this.dy = stack.height * struct.random.float();
  this.scale = (stack.width + stack.height) / 2;
}

Radial.prototype.float = function(x,y){
  var dx = (x - this.dx);
  var dy = (y - this.dy);
  p = ((dx*dx)+(dy*dy)) / this.scale;
  return Math.min(Math.max(p,0.0),1.0);
}

Radial.prototype.describe = function(s){
  return s+"Radial\n";
}
