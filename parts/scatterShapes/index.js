var svgParts = require("../svgParts");

module.exports = {
  tags:["block","base","root"],
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
  for ( var id=0; id<shapes;id++){
    this.shapes[id] = shape.create(struct,this);
  }
}

ScatterShapes.prototype.build = function(xml){
  var g = xml.ele("g")
  for ( var id in this.shapes ){
    this.shapes[id].build(g);
  }
  return g;
}
