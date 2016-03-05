module.exports = {
  tags:["pointset","dynamic-pointset","simple-pointset"],
  create:function create(struct,stack,details){
    return new RandomPointset(struct,stack,details);
  }}

function RandomPointset(struct,stack,details){
  if (!details) details = {};
  if ( !details.length ) details.length = 10;
  this.random = struct.random.spawn(); // TODO: Make this repeatable
  this.width = stack.width;
  this.height = stack.height;
}

RandomPointset.prototype.getPoint = function(n){
  var a = n*2;
  return {
    x: (this.width) * this.random.memo(a),
    y: (this.height) * this.random.memo(a+1)
  }
}
RandomPointset.prototype.describe = function(s){
  return s+"RandomPointset()\n"
}
