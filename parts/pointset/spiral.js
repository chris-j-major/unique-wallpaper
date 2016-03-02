module.exports = {
  tags:["pointset","dynamic-pointset"],
  create:function create(struct,stack,details){
    return new SpiralPointset(struct,stack,details);
  }};

function SpiralPointset(struct,parent,details){
  if (!details) details = {};
  if ( !details.length ) details.length = 10;
  this.x = details.x || (parent.width * struct.random.float());
  this.y = details.y || (parent.height * struct.random.float());
  this.theta = details.theta || (struct.random.float()*Math.PI*2);
  this.tdelta = details.tdelta || ((struct.random.float()-0.5) * 0.2 );
  this.dist = ((parent.height+parent.width)/details.length) * struct.random.range(0.1,1.6);
}

SpiralPointset.prototype.getPoint = function(n){
  var t = this.theta + (n * this.tdelta);
  return {
    x:this.x+(Math.sin(t)*this.dist*n),
    y:this.x+(Math.cos(t)*this.dist*n)
  }
}
SpiralPointset.prototype.describe = function(s){
  return s+"SpiralPointset("+this.x+","+this.y+","+this.theta+","+this.tdelta+","+this.dist+")\n"
}
