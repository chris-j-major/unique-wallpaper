var Part = require("../Part");

module.exports =  new Part(
    "circle", /* name */
    ["shape","ring"], /* types */
    function(){
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
          fill:this.color.toHex()
        });
      }
    }
  );
