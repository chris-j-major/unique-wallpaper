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
  var shapes = Math.floor(struct.random.range(8,40));
  this.shapes = [];
  this.line = struct.pickPart("line");
  var colors = stack.pallete.pickColors( struct.random , Math.floor(struct.random.range(1,4)) );
  this.spacial = stack.spacial;

  this.pointA = struct.pickPart("pointset").create( struct , stack , {length:shapes} );
  this.pointB = struct.pickPart("dynamic-pointset").create( struct , stack , {length:shapes} );
  this.pointC = struct.pickPart("dynamic-pointset").create( struct , stack , {length:shapes} );

  for ( var id=0; id<shapes;id++){
    var a = this.pointA.getPoint(id);
    var b = this.pointB.getPoint(id);
    var c = this.pointC.getPoint(id);
    var i = Math.min(Math.floor(this.spacial.float(a.x,a.y)*colors.length),colors.length-1);
    this.shapes.push( this.line.create(struct,this,{color:colors[i].toHex(),
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
  return s+"OverlayLines\n"+
    this.line.describe(s+" ")+
    this.pointA.describe(s+" ")+
    this.pointB.describe(s+" ");
}
