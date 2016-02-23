var svgParts = require("../svgParts");

var shapes = [];
for ( var sides=3; sides < 8; sides ++ ){
  shapes.push(buildShape(sides));
}
function buildShape(sides){
  return {
    tags:["shape"],
    create:function create(struct,stack,color){
      return new Polygon(struct,stack,sides,color);
    }
  }
}

module.exports = shapes;

function Polygon( struct , stack , sides , color ){
  this.parent = stack;
  this.size = struct.random.range( 2 , 0.4*Math.min(stack.width,stack.height) )
  this.x = (stack.width-this.size) * struct.random.float();
  this.y = (stack.height-this.size) * struct.random.float();
  this.orient = struct.random.float();
  this.points = [];
  for ( var n=0;n<sides;n++){
    this.points.push( this.genPoint(n,sides) );
  }
  this.fill = color || struct.pickColors(1)[0].toHex();
}
Polygon.prototype.genPoint = function(n,sides){
  var theta = this.orient + (n * (Math.PI*2/sides));
  var x = this.x + (Math.sin(theta)*this.size);
  var y = this.y + (Math.cos(theta)*this.size);
  return x+","+y;
}
Polygon.prototype.build = function(xml){
  return xml.ele('polygon',{
    points:this.points.join(" "),
    fill:this.fill
  });
}
