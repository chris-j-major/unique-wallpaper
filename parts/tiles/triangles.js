var Part = require("../Part");

module.exports = new Part(
  "triangles", /* name */
  ["tiles","overlay"], /* types */
  function(){
    this.spacial = this.opts.spacial || this.createPart("spacial" , 3 , this.opts );
    this.image.addTerm("shape","triangle");
    this.image.addTerm("tiles","triangles");
    this.size = this.opts.size || (this.opts.width+this.opts.height)*this.random.range(0.02,0.3);
    this.midx = this.opts.width * this.random.float();
    this.midy = this.opts.height * this.random.float();
    this.minx = Math.floor(-this.midx / this.size)-1;
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
      var size = this.size * this.edgeShape;
      var offset = this.size * (1.0-this.edgeShape) * 0.5;
      var halfSize = size *0.5;
      for ( var x = this.minx ; x<this.maxx ; x ++ ){
        var pixelX = this.midx+(x*this.size);
        for ( var y = this.miny ; y<this.maxy ; y ++ ){
          var pixelY = this.midy+(y*this.size);
          var i = this.random.float(pixelX,pixelY);
          var co1 = this.spacial.generate( pixelX + halfSize , pixelY + halfSize  );
          var co2 = this.spacial.generate( pixelX + size , pixelY + halfSize );

          var a = pixelX+","+pixelY+" "+(pixelX+size)+","+pixelY+" "+(pixelX+halfSize)+","+(pixelY+size);
          var b = (pixelX+size+offset)+","+pixelY+" "+(pixelX+halfSize+offset)+","+(pixelY+size)+" "+(pixelX+halfSize+size+offset)+","+(pixelY+size);

          g.ele('polygon',{
            points:a,
            fill:co1.toHex()
          });
          g.ele('polygon',{
            points:b,
            fill:co2.toHex()
          });
        }
      }
      return g;
    }
  }
);
