var svgParts = require("../svgParts");
var Color = require("../../core/color");

module.exports = {
  tags:["shape"],
  create:function create(struct,stack,color){
    return new Square(struct,stack,color);
  }
}

function Square( struct , stack , color ){
  this.parent = stack;
  this.size = struct.random.range( 2 , 0.4*Math.min(stack.width,stack.height) )
  this.width = this.size
  this.height = this.size;
  this.x = (stack.width-this.size) * struct.random.float();
  this.y = (stack.height-this.size) * struct.random.float();
  this.fill = color || struct.pickColors(1)[0].toHex();
}

Square.prototype.build = function(xml){
  return xml.ele('rect',{
    x:this.x,
    y:this.y,
    width:this.size,
    height:this.size,
    fill:this.fill,
  });
}