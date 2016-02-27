var parts = require("../../parts");

parts.addPart({
  tags:["pointset"], // not dynamic :)
  create:function create(struct,stack,details){
    return new StaticPointset(struct,stack,details);
  }});

function StaticPointset(struct,parent,details){
  if (!details) details = {};
  this.x = details.x || (parent.width * struct.random.float());
  this.y = details.y || (parent.height * struct.random.float());
}

StaticPointset.prototype.getPoint = function(n){
  return this;
}