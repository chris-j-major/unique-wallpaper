module.exports = {
  tags:["pointset","dynamic-pointset"],
  create:function create(struct,stack,details){
    return new ScatterPointset(struct,stack,details);
  }};

function ScatterPointset(struct,parent,details){
  if (!details) details = {};
  if ( !details.length ) details.length = 10;
  this.random = struct.random.spawn();
  this.x = details.x || (parent.width * struct.random.float());
  this.y = details.y || (parent.height * struct.random.float());
  this.dist = ((parent.height+parent.width)/details.length) * struct.random.range(0.1,1.4);
}

ScatterPointset.prototype.getPoint = function(n){
  var t = this.random.float() * Math.PI * 2;
  var n = this.random.float();
  var d = this.dist*(n*n)
  return {
    x:this.x+(Math.sin(t)*d),
    y:this.x+(Math.cos(t)*d)
  }
}
ScatterPointset.prototype.describe = function(s){
  return s+"ScatterPointset("+this.x+","+this.y+","+this.dist+")\n"
}
