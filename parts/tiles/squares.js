var svgParts = require("../svgParts");

module.exports = {
  tags:["tiles"],
  create:function create(struct,stack){
    return new SquareTiles(struct,stack);
  }
}

function SquareTiles( struct , stack , opts ){
  if ( ! opts ) opts = {};
  this.parent = stack;
  this.colors = stack.pallete.pickColors( struct.random , struct.random.range(2,4) );
  this.width = stack.width;
  this.height = stack.height;
  this.size = opts.size || (this.width+this.height)*struct.random.range(0.02,0.3);
  this.midx = this.width * struct.random.float();
  this.midy = this.height * struct.random.float();
  this.minx = Math.floor(-this.midx / this.size);
  this.miny = Math.floor(-this.midy / this.size);
  this.maxx = 1+Math.ceil((this.width-this.midx) / this.size);
  this.maxy = 1+Math.ceil((this.height-this.midy) / this.size);
  this.random = struct.random.spawn(); // TODO: Make this repeatable
}

SquareTiles.prototype.build = function(xml){
  var g = xml.ele("g")
  for ( var x = this.minx ; x<this.maxx ; x ++ ){
    for ( var y = this.miny ; y<this.maxy ; y ++ ){
      var i = Math.abs(x + y);
      var c = this.colors[ i % this.colors.length ];
      g.ele("rect")
        .att("x",this.midx+(x*this.size))
        .att("y",this.midy+(y*this.size))
        .att("width",this.size)
        .att("height",this.size)
        .att("fill",c.toHex() );
    }
  }
  return g;
}

SquareTiles.prototype.describe = function(s){
  return s+"SquareTiles\n"+this.pointset.describe(s+" ");
}
