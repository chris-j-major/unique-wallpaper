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

  var blend = struct.random.range(40,49.999);
  var grey = struct.random.range(0,0.3);
  var grey2 = 1-grey;
  var aPercent = blend+"%";
  var bPercent = (100-blend)+"%";


  var rangeA = {};
  rangeA[aPercent] = Color.grey(grey);
  rangeA[bPercent] = Color.grey(grey2);
  var rangeB = {};
  rangeB[aPercent] = Color.grey(grey2);
  rangeB[bPercent] = Color.grey(grey);

  this.a = stack.pickPart("block").create( struct , this );
  this.b = stack.pickPart("block").create( struct , this );

  var gradient = svgParts.LinearGradient.buildPoints( struct.random );

  this.gradientAId = struct.addDef( new svgParts.LinearGradient(gradient,rangeA) );
  this.gradientBId = struct.addDef( new svgParts.LinearGradient(gradient,rangeB) );

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


function buildGradientPoints( random ){
  var f = Math.floor(random.float() * 100);
  var f2 = Math.floor(100 - f);
  if ( random.bool() ){
    return {x1:"0%",y1:f+"%",x2:"100%",y2:f2+"%"}
  }else{
    return {x1:f+"%",y1:"0%",x2:f2+"%",y2:"100%"}
  }
}

SplitMask.prototype.build = function(xml){
  var g = xml.ele("g")
  g.ele("use").att("xlink:href","#"+this.defA).att("mask","url(#"+this.maskAid+")");
  g.ele("use").att("xlink:href","#"+this.defB).att("mask","url(#"+this.maskBid+")");
  return g;
}
