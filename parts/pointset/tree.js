var Part = require("../Part");

module.exports = [
new Part(
  "spiral", /* name */
  ["pointset","pointset-dynamic"], /* types */
  function(){
    this.x = this.random.range(0, this.opts.width );
    this.y = this.random.range(0, this.opts.height );
    this.r = this.random.range(50, Math.min(this.opts.width,this.opts.height)/Math.log( this.opts.range||20 ) );
    this.o = this.random.range(0,Math.PI*2);
    this.do = this.random.range(0.01,0.4);
    this.ro = this.random.range(-0.02,0.02);
    this.description = this.x+","+this.y
  },
  {
    generate:function(id){
      var row = 1;
      var rowlength = 1;
      var offset = id;
      while ( offset > rowlength ){
        offset -= rowlength;
        row++;
        rowlength *= 2;
      }
      var p = offset;
      var n = rowlength - offset;
      var theta = this.o + (this.do*p)-(this.do*n) + (this.ro*row);
      var r = this.r * row;
      return {x:this.x+Math.sin(theta)*r,y:this.y+Math.cos(theta)*r}
    }
  }
)
];
