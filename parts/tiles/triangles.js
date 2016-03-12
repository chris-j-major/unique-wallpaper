var svgParts = require("../svgParts");

module.exports = {
  tags:["tiles"],
  create:function create(struct,stack){
    return new TriangleTiles(struct,stack);
  }
}

function TriangleTiles( struct , stack , opts ){
  if ( ! opts ) opts = {};
  this.parent = stack;
  this.colors = stack.pallete.pickColors( struct.random , 2 );
  this.width = stack.width;
  this.height = stack.height;
  this.spacial = stack.spacial;
  this.size = opts.size || (this.width+this.height)*struct.random.range(0.02,0.3);
  this.midx = this.width * struct.random.float();
  this.midy = this.height * struct.random.float();
  this.minx = Math.floor(-this.midx / this.size);
  this.miny = Math.floor(-this.midy / this.size);
  this.maxx = 1+Math.ceil((this.width-this.midx) / this.size);
  this.maxy = 1+Math.ceil((this.height-this.midy) / this.size);
  this.edgeShape = struct.random.range( 0.8 , 1.0 );
}

TriangleTiles.prototype.build = function(xml){
  var g = xml.ele("g")
  var esize = this.size * this.edgeShape;
  var esize2 = (esize + this.size)*0.5;
  var esize3 = this.size - esize2;
  for ( var x = this.minx ; x<this.maxx ; x ++ ){
    var pixelX = this.midx+(x*this.size);
    for ( var y = this.miny ; y<this.maxy ; y ++ ){
      var pixelY = this.midy+(y*this.size);
      var i = this.spacial.float(pixelX + (this.size*0.5),pixelY);
      var c = this.colors[ 0 ].lerp( this.colors[1] , i );
      g.ele("polygon")
        .att("points",pixelX+","+pixelY+" "+(pixelX+esize)+","+(pixelY)+" "+(pixelX)+","+(pixelY+esize) )
        .att("fill",c.toHex() );
      i = this.spacial.float(pixelX ,pixelY+(this.size*0.5));
      c = this.colors[ 0 ].lerp( this.colors[1] , i );
      g.ele("polygon")
        .att("points",(pixelX+esize2)+","+(pixelY+esize2)+" "+(pixelX+esize2)+","+(pixelY+esize3)+" "+(pixelX+esize3)+","+(pixelY+esize2) )
        .att("fill",c.toHex() );
    }
  }
  return g;
}

TriangleTiles.prototype.describe = function(s){
  return s+"TriangleTiles\n";
}

TriangleTiles.prototype.keySearch = function( key , random ){
  if ( key.toLowerCase() == "tiles" ){
    return ["triangles"];
  }else if ( key.toLowerCase() == "shape" ){
    return ["triangles"];
  }else{
    return null;
  }
}
