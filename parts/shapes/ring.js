var svgParts = require("../svgParts");
var Color = require("../../core/color");

module.exports = {
  tags:["shape"],
  create:function create(struct,stack,details){
    return new Ring(struct,stack,details);
  },
  keySearch:function(key){
    if ( key == "shape" ){
      return "ring";
    }
  }
}

function Ring( struct , stack , details ){
  if ( ! details ) details = {};
  this.parent = stack
  this.size = details.size || struct.random.range( 2 , 0.4*Math.min(stack.width,stack.height) )
  this.width = this.size
  this.height = this.size;
  this.x = details.x || (stack.width-this.size) * struct.random.float();
  this.y = details.y || (stack.height-this.size) * struct.random.float();
  this.fill = details.color || stack.pallete.pickColor(struct.random).toHex();
}

Ring.prototype.build = function(xml){
  return xml.ele('circle',{
    cx:this.x,
    cy:this.y,
    r:this.size,
    fill:"none",
    'stroke-width':4,
    stroke:this.fill,
  });
}

Ring.prototype.describe = function(s){
  return s+"Ring\n";
}

Ring.prototype.keySearch = function( key , random ){
  if ( key.toLowerCase() == "shape" ){
    return ["circle","ring"];
  }else{
    return null;
  }
}
