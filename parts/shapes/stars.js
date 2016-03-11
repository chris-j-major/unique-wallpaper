var svgParts = require("../svgParts");

var shapes = [ buildShape(5) , buildShape(6) , buildShape(7) , buildShape(11)  ];
function buildShape(sides){
  return {
    tags:["shape"],
    create:function create(struct,stack,details){
      return new Star(struct,stack,sides,details);
    },
    keySearch:function(key){
      if ( key == "shape" ){
          if ( this.sides == 5 ) return ["five-sided star"];
          if ( this.sides == 6 ) return ["six-sided star"];
          return ["star"];
      }
    }
  }
}

module.exports = shapes;

function Star( struct , stack , sides , details ){
  if ( ! details ) details = {};
  this.parent = stack;
  this.sides = sides;
  this.size = details.size||struct.random.range( 2 , 0.4*Math.min(stack.width,stack.height) )
  this.x = details.x || (stack.width-this.size) * struct.random.float();
  this.y = details.y || (stack.height-this.size) * struct.random.float();
  this.orient = struct.random.float();
  this.points = [];
  for ( var n=0;n<(sides*2);n++){
    this.points.push( this.genPoint(n,sides*2) );
  }
  this.fill = details.color || stack.pallete.pickColor(struct.random).toHex();
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

Star.prototype.describe = function(s){
  return s+"Star("+this.sides+")\n";
}

Star.prototype.keySearch = function( key , random ){
  if ( key.toLowerCase() == "shape" ){

    if ( this.sides == 5 ) return ["five-sided star"];
    if ( this.sides == 6 ) return ["six-sided star"];
    return ["star"];
  }else{
    return null;
  }
}
