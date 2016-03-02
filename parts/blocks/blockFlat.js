var svgParts = require("../svgParts");

module.exports = {
  tags:["block"],
  create:function create(struct,stack){
    return new BlockFlat(struct,stack);
  }
}

function BlockFlat( struct , stack ){
  this.color = stack.pallete.pickColor(struct.random).toHex();
  this.parent = stack;
}

BlockFlat.prototype.build = function(xml){
  return xml.ele("rect")
    .att("width",this.parent.width)
    .att("height",this.parent.height)
    .att("fill",this.color);
}

BlockFlat.prototype.describe = function(spacing){
  return spacing+"BlockFlat()\n";
}
