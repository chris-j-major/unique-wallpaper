var Part = require("../Part");

module.exports = [
new Part(
  "semigrid", /* name */
  ["pointset","pointset-dynamic"], /* types */
  function(){
    this.x = this.random.range(0, this.opts.width );
    this.y = this.random.range(0, this.opts.height );
    this.x2 = this.random.range(0, this.opts.width );
    this.y2 = this.random.range(0, this.opts.height );
    this.dx1 = (this.x2 - this.x) / (this.opts.range||20);
    this.dy1 = (this.y2 - this.y) / (this.opts.range||20);
    this.x3 = this.random.range(0, this.opts.width );
    this.y3 = this.random.range(0, this.opts.height );
    this.dx2 = (this.x3 - this.x) / (this.opts.range||20);
    this.dy2 = (this.y3 - this.y) / (this.opts.range||20);
    this.description = this.x+"+"+this.dy1+"*i"+this.dx2+"*j,"+this.y+"+"+this.dy1+"*i"+this.dy2+"*j"
  },
  {
    generate:function(id){
    var n = Math.floor(Math.sqrt(id));
    var m = id - (n*n);
    var i = 0;
    var j = 0;
    if ( m <= n ){
      i = n;
      j = m;
    }else{
      i = (2*n)-m;
      j = n;
    }
      return {x:this.x+(this.dx1*i)+(this.dx2*j),y:this.y+(this.dy1*i)+(this.dy2*j)}
    }
  }
),
new Part(
  "grid", /* name */
  ["pointset","pointset-dynamic"], /* types */
  function(){
    this.x = this.random.range(0, this.opts.width );
    this.y = this.random.range(0, this.opts.height );
    this.x2 = this.random.range(0, this.opts.width );
    this.y2 = this.random.range(0, this.opts.height );
    this.dx1 = (this.x2 - this.x) / (this.opts.range||20);
    this.dy1 = (this.y2 - this.y) / (this.opts.range||20);
    this.dx2 = this.dy1
    this.dy2 = -this.dx1;
    this.description = this.x+"+"+this.dy1+"*i"+this.dx2+"*j,"+this.y+"+"+this.dy1+"*i"+this.dy2+"*j"
  },
  {
    generate:function(id){
    var n = Math.floor(Math.sqrt(id));
    var m = id - (n*n);
    var i = 0;
    var j = 0;
    if ( m <= n ){
      i = n;
      j = m;
    }else{
      i = (2*n)-m;
      j = n;
    }
      return {x:this.x+(this.dx1*i)+(this.dx2*j),y:this.y+(this.dy1*i)+(this.dy2*j)}
    }
  }
)

];
