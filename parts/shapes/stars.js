var Part = require("../Part");

var numbers = ["zero","one","two","three","four","five","six","seven","eight"];

module.exports =  [5,6,7].map(function(sides){
  return new Part(
    "star("+sides+")", /* name */
    ["shape","shape-simple","star"], /* types */
    function(){
      this.orient = this.opts.orient || this.random.range(0,Math.PI*2);
      this.size = this.opts.size || this.random.range(1,Math.min( this.opts.width , this.opts.height ));
      this.color = this.opts.color || this.choseColor();
      this.x = this.opts.x || this.random.range(0, this.opts.width );
      this.y = this.opts.y ||this.random.range(0, this.opts.height );
      this.image.addTerm("shape-color",this.color.toName()+" "+numbers[sides]+" pointed star");
      this.image.addTerm("shape",numbers[sides]+" pointed star");
      this.description="("+this.x+","+this.y+")"+this.size+","+this.color.toHex();
    },
    {
      buildXML:function(xml){
        var points = [];
        for ( var i=0 ; i <(sides*2) ; i++ ){
          var scale = (i%2==0)?0.4:1.1;
          var theta = this.orient + (i * (Math.PI*2/(sides*2)));
          var x = this.x + (Math.sin(theta)*this.size*scale);
          var y = this.y + (Math.cos(theta)*this.size*scale);
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
