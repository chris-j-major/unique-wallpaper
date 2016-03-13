var Part = require("../Part");

module.exports =  [3,4,5,7,11].map(function(sides){
  return new Part(
    "polygon("+sides+")", /* name */
    ["shape","shape-simple","polygon"], /* types */
    function(){
      this.orient = this.opts.orient || this.random.range(0,Math.PI*2);
      this.size = this.opts.size || this.random.range(1,Math.min( this.opts.width , this.opts.height ));
      this.color = this.opts.color || this.choseColor();
      this.x = this.random.range(0, this.opts.width );
      this.y = this.random.range(0, this.opts.height );
      this.image.addTerm("shape-color",this.color.toName()+" "+this.part.name);
      this.description="("+this.x+","+this.y+")"+this.size+","+this.color.toHex();
    },
    {
      buildXML:function(xml){
        var points = [];
        for ( var i=0 ; i <sides ; i++ ){
          var theta = this.orient + (i * (Math.PI*2/sides));
          var x = this.x + (Math.sin(theta)*this.size);
          var y = this.y + (Math.cos(theta)*this.size);
          points.push(x+","+y)
        }
        xml.ele('polygon',{
          points:points.join(" "),
          fill:this.color.toHex()
        });
      }
    }
  );
})
