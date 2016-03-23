var Part = require("../Part");

module.exports = new Part(
  "squares", /* name */
  ["tiles","overlay"], /* types */
  function(){
    this.spacial = this.opts.spacial || this.createPart("spacial" , 3 , this.opts );
    this.image.addTerm("shape","square");
    this.image.addTerm("tiles","squares");
    this.size = this.opts.size || (this.opts.width+this.opts.height)*this.random.range(0.02,0.3);
    this.midx = this.opts.width * this.random.float();
    this.midy = this.opts.height * this.random.float();
    this.minx = Math.floor(-this.midx / this.size);
    this.miny = Math.floor(-this.midy / this.size);
    this.maxx = 1+Math.ceil((this.opts.width-this.midx) / this.size);
    this.maxy = 1+Math.ceil((this.opts.height-this.midy) / this.size);
    this.edgeShape = this.random.range( 0.8 , 1.0 );
    this.description = this.size;
    this.subparts = [ this.spacial ];
  },
  {
    buildXML:function(xml){
      var g = xml.ele('g');
      for ( var x = this.minx ; x<this.maxx ; x ++ ){
        var pixelX = this.midx+(x*this.size);
        for ( var y = this.miny ; y<this.maxy ; y ++ ){
          var pixelY = this.midy+(y*this.size);
          var i = this.random.float(pixelX,pixelY);
          var c = this.spacial.generate( pixelX , pixelY );
          g.ele("rect")
            .att("x",pixelX)
            .att("y",pixelY)
            .att("width",this.size*this.edgeShape)
            .att("height",this.size*this.edgeShape)
            .att("fill",c.toHex() );
        }
      }
      return g;
    }
  }
);
