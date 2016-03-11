var svgParts = require("../svgParts");

module.exports = {
  tags:["swatch"],
  create:function create(struct,stack){
    return new Swatch(struct,stack);
  }
}

function Swatch( struct , stack , opts ){
  if ( ! opts ) opts = {};
  this.parent = stack;
  this.pallete = stack.pallete;
  this.width = stack.width;
  this.height = stack.height * 0.1;
}

Swatch.prototype.build = function(xml){
  var g = xml.ele("g")
  var x = 0;
  var xscale = this.width / this.pallete.total;
  for ( var id in this.pallete.range ){
    var r = this.pallete.range[id];
    var w = r.weight * xscale;
    g.ele("rect")
      .att("x",x)
      .att("y",0)
      .att("width",w)
      .att("height",this.height)
      .att("fill",r.color.toHex() );
      g.ele("text",{},r.color.toName() )
        .att("x",x + (w*0.2))
        .att("y",this.height * 0.4)
    x+= w;
  }
  return g;
}

Swatch.prototype.describe = function(s){
  return s+"Swatch\n";
}

Swatch.prototype.keySearch = function(){
  return null;
}
