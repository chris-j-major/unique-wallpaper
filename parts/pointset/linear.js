var parts = require("../../parts");

parts.addPart({
  tags:["pointset","dynamic-pointset"],
  create:function create(struct,stack,details){
    return new LinearPointset(struct,stack,details);
  }});

function LinearPointset(struct,parent,details){
  if (!details) details = {};
  this.x = details.x || (parent.width * struct.random.float());
  this.y = details.y || (parent.height * struct.random.float());
  this.theta = details.theta || (struct.random.float()*Math.PI*2);
  this.dist = 10 / (0.0001+struct.random.float()*struct.random.float());
  this.dx = Math.sin(this.theta)*this.dist;
  this.dy = Math.cos(this.theta)*this.dist;
}

LinearPointset.prototype.getPoint = function(n){
  return {
    x:this.x+(this.dx*n),
    y:this.x+(this.dy*n)
  }
}
