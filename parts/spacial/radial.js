var Part = require("../Part");

module.exports = new Part(
  "raidal", /* name */
  ["spacial"], /* types */
  function(){
    this.bgcolor = this.opts.bgcolor||this.choseColor();
    this.pointCount = Math.floor(this.random.range(1,4));
    this.radius = this.random.float()*Math.min( this.opts.width , this.opts.height );
    this.colorset = this.createPart("colorset" , 3 , this.opts.extend({bgcolor:this.bgcolor}) );
    this.pointset = this.createPart("pointset-dynamic" , 3 , this.opts.extend({range:this.points}) );
    this.subparts = [ this.colorset , this.pointset ];
    this.points = [];
    this.description = this.radius+",";
    for ( var i=0; i < this.pointCount ; i++ ){
      var p = this.pointset.generate(i);
      this.points.push( p );
      this.description += "["+p.x+","+p.y+"]";
    }
  },
  {
    generate:function(x,y){
      // get closest value
      var d = 1.0; // max
      for ( var id in this.points ){
        var dx = (x - this.points[id].x);
        var dy = (y - this.points[id].y);
        var newD = Math.sqrt((dx*dx)+(dy*dy)) / this.radius;
        if ( newD < d ){
          d = newD;
        }
      }
      return this.colorset.generate( d );
    }
  }
);
