var svgParts = require("../svgParts");
var Color = require("../../core/color");

module.exports = {
  tags:["root"], // Not block so it's not recursive...
  create:function create(struct,stack){
    return new OverlayMask(struct,stack);
  }
}

function OverlayMask( struct , stack ){
  this.parent = stack;
  this.pallete = stack.pallete;
  this.width = stack.width;
  this.height = stack.height;

  this.a = stack.pickPart("block").create( struct , this );
  this.defA = struct.addDef( this.a );
  this.b = stack.pickPart("block").create( struct , this );
  this.defB = struct.addDef( this.b );

  this.mask = stack.pickPart("overlay").create( struct , this );

  this.maskBid = struct.addDef( new svgParts.Mask( {}, [this.mask] ) );
}


OverlayMask.prototype.build = function(xml){
  var g = xml.ele("g")
  g.ele("use").att("xlink:href","#"+this.defA);
  g.ele("use").att("xlink:href","#"+this.defB).att("mask","url(#"+this.maskBid+")");
  return g;
}
OverlayMask.prototype.describe = function(s){
  return s+"OverlayMask\n"+this.mask.describe(" "+s)+this.a.describe(" "+s)+this.b.describe(" "+s);
}
