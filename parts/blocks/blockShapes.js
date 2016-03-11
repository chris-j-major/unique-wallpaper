var svgParts = require("../svgParts");
var CommonParts = require("../CommonParts");

module.exports = {
  tags:["block","base","root"],
  create:function create(struct,stack){
    return new BlockShapes(struct,stack);
  }
}

function BlockShapes( struct , stack ){
  this.parent = stack;
  this.width = stack.width;
  this.height = stack.height;
  this.color = stack.pallete.pickColor(struct.random).toHex();
  this.spacial = stack.spacial;
  this.pallete = stack.pallete.without( this.color );
  this.inner = struct.pickPart("overlay").create(struct,this);
}

BlockShapes.prototype.build = function(xml){
  var g = xml.ele("g");
  g.ele("rect")
    .att("width",this.parent.width)
    .att("height",this.parent.height)
    .att("fill",this.color);
  this.inner.build(g);
  return g;
}

BlockShapes.prototype.describe = function(s){
  return s+"BlockShapes\n" + this.inner.describe(" "+s);
}

BlockShapes.prototype.keySearch = CommonParts.keySearchCombine( "inner" );
