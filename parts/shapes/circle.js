var svgParts = require("../svgParts");
var Color = require("../../core/color");

module.exports = {
  tags:["shape"],
  create:function create(struct,stack,details){
    return new Circle(struct,stack,details);
  },
  keySearch:function(key){
    if ( key == "shape" ){
      return ["circle"]
    }
  }
}

function Circle( struct , stack , details ){
  if ( ! details ) details = {};
  this.parent = stack
  this.size = details.size || struct.random.range( 2 , 0.4*Math.min(stack.width,stack.height) )
  this.width = this.size
  this.height = this.size;
  this.x = details.x || (stack.width-this.size) * struct.random.float();
  this.y = details.y || (stack.height-this.size) * struct.random.float();
  this.fill = details.color || stack.pallete.pickColor(struct.random).toHex();
}

Circle.prototype.build = function(xml){
  return xml.ele('circle',{
    cx:this.x,
    cy:this.y,
    r:this.size,
    fill:this.fill,
  });
}

Circle.prototype.describe = function(s){
  return s+"Circle\n";
}

Circle.prototype.keySearch = function( key , random ){
  if ( key.toLowerCase() == "shape" ){
    return ["circle"];
  }else{
    return null;
  }
}
