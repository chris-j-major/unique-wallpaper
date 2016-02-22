var svgParts = require("../svgParts");

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
  this.color = struct.pickColors(1)[0].toHex();
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
