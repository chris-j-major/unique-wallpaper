var svgParts = require("../svgParts");
var Color = require("../../core/color");

module.exports = {
  tags:["spacial","spacial-simple"],
  create:function create(struct,stack,details){
    return new Gradient(struct,stack,details);
  }
}

function Gradient( struct , stack , details ){
  if ( ! details ) details = {};
  this.parent = stack;
  this.random = struct.random.spawn();
  var theta = struct.random.float() * Math.PI * 2;
  this.dx = Math.sin(theta);
  this.dy = Math.cos(theta);
  this.scale = (stack.width + stack.height);
}

Gradient.prototype.float = function(x,y){
  var p = (x * this.dx) + (y * this.dy);
  p = p / this.scale;
  return Math.min(Math.max(p,0.0),1.0);
}

Gradient.prototype.describe = function(s){
  return s+"Gradient\n";
}
