var Part = require("../Part");

module.exports = new Part(
  "static", /* name */
  ["pointset","pointset-static"], /* types */
  function(){
    this.image.addTerm("pointset","static");
    this.x = this.random.range(0, this.opts.width );
    this.y = this.random.range(0, this.opts.height );
    this.description = this.x+","+this.y
  },
  {
    generate:function(id){
      return {x:this.x,y:this.y}
    }
  }
);
