module.exports = {
  tags:["pointset","dynamic-pointset","simple-pointset"],
  create:function create(struct,stack,details){
    return new LinearPointset(struct,stack,details);
  }}

function LinearPointset(struct,parent,details){
  if (!details) details = {};
  if ( !details.length ) details.length = 10;
  this.x = details.x || (parent.width * struct.random.float());
  this.y = details.y || (parent.height * struct.random.float());
  this.theta = details.theta || (struct.random.float()*Math.PI*2);
  this.dist = ((parent.height+parent.width)/details.length) * struct.random.range(0.1,1.2);
  this.dx = Math.sin(this.theta)*this.dist;
  this.dy = Math.cos(this.theta)*this.dist;
}

LinearPointset.prototype.getPoint = function(n){
  return {
    x:this.x+(this.dx*n),
    y:this.x+(this.dy*n)
  }
}

LinearPointset.prototype.describe = function(s){
  return s+"LinearPointset("+this.x+"+"+this.dx+"*n,"+this.y+"+"+this.dy+"*n,)\n"
}

LinearPointset.prototype.keySearch = function( key , random ){
  if ( key.toLowerCase() == "pointset" ){
    return ["line based","linear","straight"];
  }else{
    return null;
  }
}
