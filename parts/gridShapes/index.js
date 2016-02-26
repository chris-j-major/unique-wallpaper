var svgParts = require("../svgParts");

module.exports = {
  tags:["overlay"],
  create:function create(struct,stack){
    return new GridShapes(struct,stack);
  }
}

function GridShapes( struct , stack ){
  this.parent = stack;
  this.width = stack.width;
  this.height = stack.height;
  var shapes = Math.floor(struct.random.range(2,40));
  this.shapes = [];
  var shape = struct.pickPart("shape");
  var colors = struct.pickColors( Math.floor(struct.random.range(1,4)) );

  var orient = struct.random.float();
  var points = struct.random.range(3,15);
  var size = struct.random.range(0.1,1.0) * (((this.width + this.height) /2) / points) ;
  var threshold = struct.random.range(0.1,1.0);

  for ( var px=0;px<points;px++){
    for ( var py=0;py<points;py++){
      if ( struct.random.float() > threshold ){
        var tx = (this.width / points) * px;
        var ty = (this.height / points) * py;
        this.shapes.push( shape.create(struct,this,{size:size,x:tx,y:ty}) );
      }
    }
  }
}

GridShapes.prototype.build = function(xml){
  var g = xml.ele("g")
  for ( var id in this.shapes ){
    this.shapes[id].build(g);
  }
  return g;
}

GridShapes.prototype.describe = function(s){
  return s+"GridShapes\n";
}
