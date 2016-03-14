var Part = require("../Part");

module.exports =  [1,2,5,12,24].map(function(width){
  return new Part(
    "straight("+width+")", /* name */
    ["line","stright-line"], /* types */
    function(){
      this.color = this.opts.color || this.choseColor();
      this.a = this.opts.a || {
        x:this.random.range(0, this.opts.width ),
        y:this.random.range(0, this.opts.height ) };
      this.b = this.opts.b || {
        x:this.random.range(0, this.opts.width ),
        y:this.random.range(0, this.opts.height ) };
      this.description="("+this.a.x+","+this.a.y+")("+this.b.x+","+this.b.y+"),"+this.color.toHex();
    },
    {
      buildXML:function(xml){
        xml.ele('path',{
          d:"M"+this.a.x+" "+this.a.y+" L"+this.b.x+" "+this.b.y,
          stroke:this.color.toHex(),
          'stroke-linecap':"round",
          'stroke-width':width
        });
      }
    }
  );
})
