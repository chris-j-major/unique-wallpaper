var svgParts = require("../svgParts");

module.exports = {
  tags:["overlay"],
  create:function create(struct,stack){
    return new OverlayLines(struct,stack);
  }
}

function OverlayLines( struct , stack ){
  this.parent = stack;
  this.width = stack.width;
  this.height = stack.height;
  var shapes = Math.floor(struct.random.range(20,90));
  this.shapes = [];
  var line = struct.pickPart("line");
  var colors = struct.pickColors( Math.floor(struct.random.range(1,4)) );

  var theta = struct.random.float();
  var d = 0;
  var dscale = (this.width + this.height) / 4;
  var x = struct.random.float() * this.width;
  var y = struct.random.float() * this.height;
  var thetaDelta = struct.random.range(0.01,0.2);
  var dDelta = struct.random.range(0.01,0.4);

  for ( var id=0; id<shapes;id++){
    var tx = x + (Math.sin(theta)*d*dscale);
    var ty = y + (Math.cos(theta)*d*dscale);
    theta = theta + thetaDelta;
    d = d + dDelta;
    this.shapes.push( line.create(struct,this,{color:colors[id%colors.length].toHex(),x1:tx,y1:ty,x2:x,y2:y}));
  }
}

OverlayLines.prototype.build = function(xml){
  var g = xml.ele("g")
  for ( var id in this.shapes ){
    this.shapes[id].build(g);
  }
  return g;
}

OverlayLines.prototype.describe = function(s){
  return s+"OverlayLines\n";
}
