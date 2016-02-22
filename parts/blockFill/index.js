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
  for ( var id=0 ; id<colors.length;id ++){
    var percent = (id / colors.length) * 100.0;
    stops[ percent+"%" ] = colors[id];
  }
  var gradient = new svgParts.LinearGradient({
    x1:"0%",y1:"0%",x2:"100%",y2:"100%"
  },stops);
  this.gradientId = struct.addDef( gradient );
  this.parent = stack;
}

BlockFill.prototype.build = function(xml){
  xml.ele("rect")
    .att("width",this.parent.width)
    .att("height",this.parent.height)
    .att("fill","url(#"+this.gradientId+")");
}
