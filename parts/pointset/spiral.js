var parts = require("../../parts");

parts.addPart({
  tags:["pointset","dynamic-pointset"],
  create:function create(struct,stack,details){
    return new SpiralPointset(struct,stack,details);
  }});

function SpiralPointset(struct,parent,details){
  if (!details) details = {};
  this.x = details.x || (parent.width * struct.random.float());
  this.y = details.y || (parent.height * struct.random.float());
  this.theta = details.theta || (struct.random.float()*Math.PI*2);
  this.tdelta = details.tdelta || ((struct.random.float()-0.5) * 0.2 );
  this.dist = 10 / (0.0001+struct.random.float()*struct.random.float());
}

SpiralPointset.prototype.getPoint = function(n){
  var t = this.theta + (n * this.tdelta);
  return {
    x:this.x+(Math.sin(t)*this.dist*n),
    y:this.x+(Math.cos(t)*this.dist*n)
  }
}
