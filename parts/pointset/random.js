module.exports = {
  tags:["pointset","dynamic-pointset"],
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
  //this.random.setPos( n );
  return {
    x: (this.width) * this.random.float(),
    y: (this.height) * this.random.float()
  }
}
RandomPointset.prototype.describe = function(s){
  return s+"RandomPointset()\n"
}
