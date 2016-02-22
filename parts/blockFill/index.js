var svgParts = require("../svgParts");

module.exports = {
  tags:["block","base","root"],
  create:function create(struct,stack){
    return new BlockFill(struct,stack);
  }
}

function BlockFill( struct , stack ){
  var stops = {};
  var stopCount = Math.floor(struct.random.range(2,4));
  var colors = struct.pickColors(stopCount);
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
}

BlockFill.prototype.build = function(xml){
  return xml.ele("rect")
    .att("width",this.parent.width)
    .att("height",this.parent.height)
    .att("fill","url(#"+this.gradientId+")");
}
