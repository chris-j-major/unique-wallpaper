var Part = require("../Part");

module.exports = new Part(
  "linear", /* name */
  ["pointset","pointset-dynamic"], /* types */
  function(){
    this.image.addTerm("pointset","linear");
    this.x = this.random.range(0, this.opts.width );
    this.y = this.random.range(0, this.opts.height );
    this.x2 = this.random.range(0, this.opts.width );
    this.y2 = this.random.range(0, this.opts.height );
    this.dx = (this.x2 - this.x) / (this.opts.range||20)
    this.dy = (this.y2 - this.y) / (this.opts.range||20)
    this.description = this.x+"+"+this.dx+"*i,"+this.y+"+"+this.dy+"*i"
  },
  {
    generate:function(id){
      return {x:this.x+(this.dx*id),y:this.y+(this.dy*id)}
    }
  }
);
