var svgParts = require("../svgParts");

module.exports = {
  tags:["shape"],
  create:function create(struct,stack,color){
    return new Triangle(struct,stack,color);
  }
}

function Triangle( struct , stack , color ){
  this.parent = stack;
  this.size = struct.random.range( 2 , 0.4*Math.min(stack.width,stack.height) )
  this.x = (stack.width-this.size) * struct.random.float();
  this.y = (stack.height-this.size) * struct.random.float();
  this.orient = struct.random.float();
  this.points = [
    this.genPoint(0),this.genPoint(1),this.genPoint(2)
  ];
  this.fill = color || struct.pickColors(1)[0].toHex();
}
Triangle.prototype.genPoint = function(n){
  var theta = this.orient + (n * (Math.PI*2/3));
  var x = this.x + (Math.sin(theta)*this.size);
  var y = this.y + (Math.cos(theta)*this.size);
  return x+","+y;
}
Triangle.prototype.build = function(xml){
  return xml.ele('polygon',{
    points:this.points.join(" "),
    fill:this.fill
  });
}
