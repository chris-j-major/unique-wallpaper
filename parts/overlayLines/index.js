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

  var pointA = struct.pickPart("pointset").create( struct , stack );;
  var pointB = struct.pickPart("dynamic-pointset").create( struct , stack );;
  var pointC = struct.pickPart("dynamic-pointset").create( struct , stack );;

  for ( var id=0; id<shapes;id++){
    var a = pointA.getPoint(id);
    var b = pointB.getPoint(id);
    var c = pointC.getPoint(id);
    this.shapes.push( line.create(struct,this,{color:colors[id%colors.length].toHex(),
      x1:a.x,y1:a.y,
      x2:b.x,y2:b.y,
      x3:c.x,y3:c.y}
    ));
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
