var Part = require("../Part");

module.exports =  [1,2,5,12,24].map(function(width){
  return new Part(
    "ring("+width+")", /* name */
    ["shape","ring"], /* types */
    function(){
      this.image.addTerm("shape","ring");
      this.size = this.opts.size || this.random.range(1,Math.min( this.opts.width , this.opts.height ));
      this.color = this.opts.color || this.choseColor();
      this.x = this.opts.x || this.random.range(0, this.opts.width );
      this.y = this.opts.y ||this.random.range(0, this.opts.height );
      this.description="("+this.x+","+this.y+"),"+this.size+","+this.color.toHex();
    },
    {
      buildXML:function(xml){
        xml.ele('circle',{
          cx:this.x,
          cy:this.y,
          r:this.size,
          stroke:this.color.toHex(),
          'stroke-width':width,
          fill:"none"
        });
      }
    }
  );
})
