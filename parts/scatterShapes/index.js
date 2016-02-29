var svgParts = require("../svgParts");

module.exports = {
  tags:["overlay"],
  create:function create(struct,stack){
    return new ScatterShapes(struct,stack);
  }
}

function ScatterShapes( struct , stack ){
  this.parent = stack;
  this.width = stack.width;
  this.height = stack.height;
  var shapes = Math.floor(struct.random.range(2,40));
  this.shapes = [];
  var shape = struct.pickPart("shape");
  this.pointset = struct.pickPart("dynamic-pointset").create( struct , stack );
  var colors = struct.pickColors( shapes );
  for ( var id=0; id<shapes;id++){
    var p = this.pointset.getPoint(id);
    this.shapes[id] = shape.create(struct,this,{x:p.x,y:p.y,color:colors[id].toHex()});
  }
}

ScatterShapes.prototype.build = function(xml){
  var g = xml.ele("g")
  for ( var id in this.shapes ){
    this.shapes[id].build(g);
  }
  return g;
}

ScatterShapes.prototype.describe = function(s){
  return s+"ScatterShapes\n"+this.pointset.describe(s+" ");
}
