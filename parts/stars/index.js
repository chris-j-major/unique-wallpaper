var svgParts = require("../svgParts");

var shapes = [ buildShape(5) , buildShape(6) , buildShape(7) , buildShape(11)  ];
function buildShape(sides){
  return {
    tags:["shape"],
    create:function create(struct,stack,details){
      return new Star(struct,stack,sides,details);
    }
  }
}

module.exports = shapes;

function Star( struct , stack , sides , details ){
  if ( ! details ) details = {};
  this.parent = stack;
  this.size = details.size||struct.random.range( 2 , 0.4*Math.min(stack.width,stack.height) )
  this.x = details.x || (stack.width-this.size) * struct.random.float();
  this.y = details.y || (stack.height-this.size) * struct.random.float();
  this.orient = struct.random.float();
  this.points = [];
  for ( var n=0;n<(sides*2);n++){
    this.points.push( this.genPoint(n,sides*2) );
  }
  this.fill = details.color || struct.pickColors(1)[0].toHex();
}
Star.prototype.genPoint = function(n,sides){
  var theta = this.orient + (n * (Math.PI*2/sides));
  var size = this.size;
  if ( n%2 == 0 ){
    size = this.size * 0.3;
  }
  var x = this.x + (Math.sin(theta)*size);
  var y = this.y + (Math.cos(theta)*size);
  return x+","+y;
}
Star.prototype.build = function(xml){
  return xml.ele('polygon',{
    points:this.points.join(" "),
    fill:this.fill
  });
}
