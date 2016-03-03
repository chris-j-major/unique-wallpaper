var svgParts = require("../svgParts");

module.exports = {
  tags:["block","base"],
  create:function create(struct,stack){
    return new BlockFill(struct,stack);
  }
}

function BlockFill( struct , stack ){
  var stops = {};
  this.stopCount = Math.floor(struct.random.range(2,3));
  var colors = stack.pallete.pickColors(struct.random,this.stopCount);
  var spacing = struct.random.float() * 48.0;
  var range = 100.0 - (spacing*2);
  for ( var id=0 ; id<colors.length;id ++){
    var percent = Math.floor(spacing + ((id / colors.length) * range));
    stops[ percent+"%" ] = colors[id];
  }
  var gradient = new svgParts.LinearGradient(
    svgParts.LinearGradient.buildPoints( struct.random ) ,stops);
  this.gradientId = struct.addDef( gradient );
  this.parent = stack;
  this.pallete = stack.pallete;
  this.spacial = stack.spacial;
}

BlockFill.prototype.build = function(xml){
  return xml.ele("rect")
    .att("width",this.parent.width)
    .att("height",this.parent.height)
    .att("fill","url(#"+this.gradientId+")");
}

BlockFill.prototype.describe = function(spacing){
  return spacing+"BlockFill("+this.stopCount+")\n";
}
