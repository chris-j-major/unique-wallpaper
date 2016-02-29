var parts = require("../../parts");

parts.addPart({
  tags:["pointset","dynamic-pointset"],
  create:function create(struct,stack,details){
    return new RandomPointset(struct,stack,details);
  }});

function RandomPointset(struct,stack,details){
  if (!details) details = {};
  if ( !details.length ) details.length = 10; 
  this.random = struct.random.spawn();
  this.stack = stack;
}

RandomPointset.prototype.getPoint = function(n){
  return {
    x: (this.stack.width-this.size) * this.random.float(),
    y: (this.stack.height-this.size) * this.random.float()
  }
}
RandomPointset.prototype.describe = function(s){
  return s+"RandomPointset()\n"
}
