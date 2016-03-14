var Part = require("../Part");

module.exports = [
new Part(
  "spiral", /* name */
  ["pointset","pointset-dynamic"], /* types */
  function(){
    this.x = this.random.range(0, this.opts.width );
    this.y = this.random.range(0, this.opts.height );
    this.r = this.random.range(10, Math.min(this.opts.width,this.opts.height)/( this.opts.range||20 ) );
    this.t = this.random.range(3,30);
    if ( this.random.bool() ) this.t = - this.t;
    this.o = this.random.range(0,Math.PI*2);
    this.description = this.x+","+this.y+","+this.r,+","+this.t+","+this.o;
  },
  {
    generate:function(id){
      var theta = this.o + (id*this.t);
      var r = this.r * id;
      return {x:this.x+Math.sin(theta)*r,y:this.y+Math.cos(theta)*r}
    }
  }
)
];
