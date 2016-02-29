var svgParts = require("../svgParts");

Math.PHI = 1.618033988749895;
var ONE_OVER_PHI = 1/ Math.PHI;
var ONE_OTHER = 1.0 - ONE_OVER_PHI;

module.exports = {
  tags:["root"],
  create:function create(struct,stack){
    return new BlockLayout(struct,stack);
  }
}

function BlockLayout( struct , stack ){
  this.parent = stack;
  this.width = stack.width;
  this.height = stack.height;

  this.split = struct.random.choose(["H","V","HV"]);

  switch(this.split){
    case "H":
      this.sections = [
        this.createSection( {x:0 , y:0 , width:this.width * ONE_OVER_PHI , height:this.height } , struct ),
        this.createSection( {x:this.width * ONE_OVER_PHI , y:0 , width:this.width * ONE_OTHER , height:this.height } , struct )
      ];
    break;
    case "V":
      this.sections = [
        this.createSection( {x:0 , y:0 , width:this.width , height:this.height*ONE_OVER_PHI } , struct ),
        this.createSection( {x:0 , y:this.height * ONE_OVER_PHI , width:this.width  , height:this.height*ONE_OTHER } , struct )
      ];
    break;
    case "HV":
      this.sections = [
        this.createSection( {x:0 , y:0 , width:this.width * ONE_OVER_PHI , height:this.height*ONE_OVER_PHI } , struct ),
        this.createSection( {x:this.width * ONE_OVER_PHI , y:0 , width:this.width * ONE_OTHER , height:this.height*ONE_OVER_PHI } , struct ),
        this.createSection( {x:0 , y:this.height * ONE_OVER_PHI , width:this.width  , height:this.height*ONE_OTHER } , struct )
      ];
    break;
  }

}

BlockLayout.prototype.createSection = function( opt , struct ){
  opt.inner = struct.pickPart("block").create(struct,opt);
  return opt;
}

BlockLayout.prototype.build = function(xml){
  this.sections.forEach(function(s){
    var g = xml.ele("g").att("transform","translate("+s.x+" "+s.y+")");
    s.inner.build(g);
  });
}

BlockLayout.prototype.describe = function(spacing){
  return spacing+"BlockLayout("+this.split+")\n" + this.sections.map(function(s){
    return s.inner.describe(spacing+" ")
  }).join("");
}
