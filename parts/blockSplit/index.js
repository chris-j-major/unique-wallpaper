var svgParts = require("../svgParts");

module.exports = {
  tags:["block","base","root"],
  create:function create(struct,stack){
    return new BlockSplit(struct,stack);
  }
}

function BlockSplit( struct , stack ){
  this.parent = stack;
  this.width = stack.width;
  this.height = stack.height;
  var splitH = struct.random.bool();
  var splitPos = struct.random.choose([1/3,1/5,1/2]);
  var splitPosA = 1 - splitPos;
  if ( splitH ){
    this.a = { width:this.width , height:this.height * splitPos , x:0 , y:0 };
    this.b = { width:this.width , height:this.height * splitPosA , x:0 , y:this.a.height };
  }else{
    this.a = { width:this.width* splitPos , height:this.height , x:0 , y:0 };
    this.b = { width:this.width* splitPosA , height:this.height , x:this.a.width , y:0 };
  }
  this.innera = struct.pickPart("block").create(struct,this.a);
  this.innerb = struct.pickPart("block").create(struct,this.b);
}

BlockSplit.prototype.build = function(xml){
  var g = xml.ele("g");
  var a = g.ele("g");
  var b = g.ele("g").att("transform","translate("+this.b.x+" "+this.b.y+")");
  this.innera.build(a);
  this.innerb.build(b);
  return g;
}
