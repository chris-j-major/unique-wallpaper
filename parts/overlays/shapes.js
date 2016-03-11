var svgParts = require("../svgParts");
var CommonParts = require("../CommonParts");

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
  this.shape = struct.pickPart("shape");
  this.pointset = struct.pickPart("dynamic-pointset").create( struct , stack , {length:shapes} );
  this.spacial = stack.spacial;
  var colors = stack.pallete.pickColors( struct.random , shapes );
  for ( var id=0; id<shapes;id++){
    var p = this.pointset.getPoint(id);
    var i = Math.min(Math.floor(this.spacial.float(p.x,p.y)*colors.length),colors.length-1);
    this.shapes[id] = this.shape.create(struct,this,{x:p.x,y:p.y,color:colors[i].toHex()});
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

ScatterShapes.prototype.keySearch = CommonParts.keySearchCombine( "shape" , "pointset" );
