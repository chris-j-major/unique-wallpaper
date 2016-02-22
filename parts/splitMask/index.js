var svgParts = require("../svgParts");
var Color = require("../../core/color");

module.exports = {
  tags:["root"],
  create:function create(struct,stack){
    return new SplitMask(struct,stack);
  }
}

function SplitMask( struct , stack ){
  this.parent = stack;
  this.width = stack.width;
  this.height = stack.height;

  this.a = stack.pickPart("block").create( struct , this );
  this.b = stack.pickPart("block").create( struct , this );

  var gradientA = new svgParts.LinearGradient({
    x1:"0%",y1:"100%",x2:"100%",y2:"0%"
  },{"49%":Color.black,"51%":Color.white});
  this.gradientAId = struct.addDef( gradientA );

  var gradientB = new svgParts.LinearGradient({
    x1:"0%",y1:"100%",x2:"100%",y2:"0%"
  },{"49%":Color.white,"51%":Color.black});
  this.gradientBId = struct.addDef( gradientB );

  this.defA = struct.addDef( this.a );
  this.defB = struct.addDef( this.b );

  var maskA = new svgParts.Mask( {}, [new svgParts.Rect({
    width:stack.width, height:stack.height,
    fill:"url(#"+this.gradientAId+")"
  })]);

  var maskB = new svgParts.Mask( {}, [new svgParts.Rect({
    width:stack.width, height:stack.height,
    fill:"url(#"+this.gradientBId+")"
  })]);

  this.maskAid = struct.addDef( maskA );
  this.maskBid = struct.addDef( maskB );
}

SplitMask.prototype.build = function(xml){
  var g = xml.ele("g")
  g.ele("use").att("xlink:href","#"+this.defA).att("mask","url(#"+this.maskAid+")");
  g.ele("use").att("xlink:href","#"+this.defB).att("mask","url(#"+this.maskBid+")");
  return g;
}
