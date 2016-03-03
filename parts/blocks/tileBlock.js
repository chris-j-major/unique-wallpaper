var svgParts = require("../svgParts");

module.exports = {
  tags:["block","root"],
  create:function create(struct,stack){
    return new TileBlock(struct,stack);
  }
}

function TileBlock( struct , stack ){
  this.parent = stack;
  this.width = stack.width;
  this.height = stack.height;
  this.spacial = stack.spacial;
  this.pallete = stack.pallete;
  this.tiles = struct.pickPart("tiles").create( struct , this );
}

TileBlock.prototype.build = function(xml){
  return this.tiles.build(xml);
}

TileBlock.prototype.describe = function(spacing){
  return spacing+"TileBlock()\n";
}
