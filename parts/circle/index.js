var svgParts = require("../svgParts");
var Color = require("../../core/color");

module.exports = {
  tags:["shape"],
  create:function create(struct,stack,details){
    return new Circle(struct,stack,details);
  }
}

function Circle( struct , stack , details ){
  if ( ! details ) details = {};
  this.parent = stack
  this.size = details.size || struct.random.range( 2 , 0.4*Math.min(stack.width,stack.height) )
  this.width = this.size
  this.height = this.size;
  this.x = details.x || (stack.width-this.size) * struct.random.float();
  this.y = details.y || (stack.height-this.size) * struct.random.float();
  this.fill = details.color || struct.pickColors(1)[0].toHex();
}

Circle.prototype.build = function(xml){
  return xml.ele('circle',{
    cx:this.x,
    cy:this.y,
    r:this.size,
    fill:this.fill,
  });
}
