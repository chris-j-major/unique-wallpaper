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
  var a = n*2;
  var t = this.random.memo(a) * Math.PI * 2;
  var n = this.random.memo(a+1);
  var d = this.dist*(n*n)
  return {
    x:this.x+(Math.sin(t)*d),
    y:this.x+(Math.cos(t)*d)
  }
}
ScatterPointset.prototype.describe = function(s){
  return s+"ScatterPointset("+this.x+","+this.y+","+this.dist+")\n"
}

ScatterPointset.prototype.keySearch = function( key , random ){
  if ( key.toLowerCase() == "pointset" ){
    return ["scattered"];
  }else{
    return null;
  }
}
