var svgParts = require("../svgParts");
var Color = require("../../core/color");

module.exports = {
  tags:["line"],
  create:function create(struct,stack,details){
    return new Line(struct,stack,details);
  }
}

function Line( struct , stack , details ){
  if ( ! details ) details = {};
  this.parent = stack
  this.x1 = details.x1 || (stack.width-this.size) * struct.random.float();
  this.y1 = details.y1 || (stack.height-this.size) * struct.random.float();
  this.x2 = details.x2 || (stack.width-this.size) * struct.random.float();
  this.y2 = details.y2 || (stack.height-this.size) * struct.random.float();
  this.fill = details.color || struct.pickColors(1)[0].toHex();
}

Line.prototype.build = function(xml){
  return xml.ele('path',{
    d:"M"+this.x1+" "+this.y1+" L"+this.x2+" "+this.y2,
    stroke:this.fill,
    'stroke-width':"3"
  });
}

Line.prototype.describe = function(s){
  return s+"Line\n";
}
