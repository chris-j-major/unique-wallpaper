var svgParts = require("../svgParts");

module.exports = {
  tags:["overlay"],
  create:function create(struct,stack){
    return new OrderedShapes(struct,stack);
  }
}

function OrderedShapes( struct , stack ){
  this.parent = stack;
  this.width = stack.width;
  this.height = stack.height;
  var shapes = Math.floor(struct.random.range(2,40));
  this.shapes = [];
  var shape = struct.pickPart("shape");
  var colors = struct.pickColors( Math.floor(struct.random.range(1,4)) );

  var theta = struct.random.float();
  var d = 0;
  var dscale = (this.width + this.height) / 4;
  var x = struct.random.float() * this.width;
  var y = struct.random.float() * this.height;
  var thetaDelta = struct.random.range(0.01,0.2);
  var dDelta = struct.random.range(0.01,0.4);
  var size = struct.random.range(0.1,0.8) * dscale;
  var sizeDelta = struct.random.range(0.9,1.1);

  for ( var id=0; id<shapes;id++){
    var tx = x + (Math.sin(theta)*d*dscale);
    var ty = y + (Math.cos(theta)*d*dscale);
    theta = theta + thetaDelta;
    d = d + dDelta;
    size = size * sizeDelta;
    this.shapes[id] = shape.create(struct,this,{color:colors[id%colors.length].toHex(),x:tx,y:ty,size:size});
  }
}

OrderedShapes.prototype.build = function(xml){
  var g = xml.ele("g")
  for ( var id in this.shapes ){
    this.shapes[id].build(g);
  }
  return g;
}
