module.exports = {
  tags:["pointset","dynamic-pointset"],
  create:function create(struct,stack,details){
    return new GridPointset(struct,stack,details);
  }}

function GridPointset(struct,parent,details){
  if (!details) details = {};
  if ( !details.length ) details.length = 10;
  this.x = details.x || (parent.width * struct.random.float());
  this.y = details.y || (parent.height * struct.random.float());
  this.theta = details.theta || (struct.random.float()*Math.PI*2);
  this.dist = ((parent.height+parent.width)/Math.sqrt(details.length)) * struct.random.range(0.1,1.8);
  this.dx = Math.sin(this.theta)*this.dist;
  this.dy = Math.cos(this.theta)*this.dist;
}

GridPointset.prototype.getPoint = function(i){
  var n = Math.floor(Math.sqrt(i));
  var m = i - (n*n);
  var x = 0;
  var y = 0;
  if ( m <= n ){
    x = n;
    y = m;
  }else{
    x = (2*n)-m;
    y = n;
  }
  return {
    x:this.x+(this.dx*x),
    y:this.x+(this.dy*y)
  }
}

GridPointset.prototype.describe = function(s){
  return s+"GridPointset("+this.x+"+"+this.dx+"*n,"+this.y+"+"+this.dy+"*n,)\n"
}
