var svgParts = require("../svgParts");

var shapes = [];
for ( var sides=3; sides < 8; sides ++ ){
  shapes.push(buildShape(sides));
}
function buildShape(sides){
  return {
    tags:["shape"],
    create:function create(struct,stack,details){
      return new Polygon(struct,stack,sides,details);
    },
    keySearch:function(key){
      if ( key == "shape" ){
        if ( sides == 3 ) return ["triangle","three-sided polygon"];
        if ( sides == 4 ) return ["square","four-sided polygon"];
        if ( sides == 5 ) return ["five-sided polygon","five-sided shape"];
        if ( sides == 6 ) return ["six-sided polygon","six-sided shape"];
        return ["polygon shape"];
      }
    }
  }
}

module.exports = shapes;

function Polygon( struct , stack , sides , details ){
  if ( ! details ) details = {};
  this.parent = stack;
  this.sides = sides;
  this.size = details.size||struct.random.range( 2 , 0.4*Math.min(stack.width,stack.height) )
  this.x = details.x||(stack.width-this.size) * struct.random.float();
  this.y = details.y||(stack.height-this.size) * struct.random.float();
  this.orient = struct.random.float();
  this.points = [];
  for ( var n=0;n<sides;n++){
    this.points.push( this.genPoint(n,sides) );
  }
  this.fill = details.color || stack.pallete.pickColor(struct.random).toHex();
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

Polygon.prototype.describe = function(s){
  return s+"Polygon("+this.sides+")\n";
}

Polygon.prototype.keySearch = function( key , random ){
  if ( key.toLowerCase() == "shape" ){
    if ( this.sides == 3 ) return ["triangle","three-sided polygon"];
    if ( this.sides == 4 ) return ["square","four-sided polygon"];
    if ( this.sides == 5 ) return ["five-sided polygon","five-sided shape"];
    if ( this.sides == 6 ) return ["six-sided polygon","six-sided shape"];
    return ["polygon shape"];
  }else{
    return null;
  }
}
