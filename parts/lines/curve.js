var Part = require("../Part");

module.exports =  [1,2,5,12,24].map(function(width){
  return new Part(
    "curve("+width+")", /* name */
    ["line"], /* types */
    function(){
      this.image.addTerm("line","curve");
      this.color = this.opts.color || this.choseColor();
      this.a = this.opts.a || {
        x:this.random.range(0, this.opts.width ),
        y:this.random.range(0, this.opts.height ) };
      this.b = this.opts.b || {
        x:this.random.range(0, this.opts.width ),
        y:this.random.range(0, this.opts.height ) };
      this.c = this.opts.c || {
        x:this.random.range(0, this.opts.width ),
        y:this.random.range(0, this.opts.height ) };
      this.description="("+this.a.x+","+this.a.y+")("+this.b.x+","+this.b.y+")("+this.c.x+","+this.c.y+"),"+this.color.toHex();
    },
    {
      buildXML:function(xml){
        xml.ele('path',{
          d:"M"+this.a.x+" "+this.a.y+" Q"+this.b.x+" "+this.b.y+" "+this.c.x+" "+this.c.y,
          stroke:this.color.toHex(),
          'stroke-width':width,
          'stroke-linecap':"round",
          fill:"none"
        });
      }
    }
  );
})
