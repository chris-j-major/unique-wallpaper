module.exports = {
  tags:["pointset"], // not dynamic :)
  create:function create(struct,stack,details){
    return new StaticPointset(struct,stack,details);
  }};

function StaticPointset(struct,parent,details){
  if (!details) details = {};
  if ( !details.length ) details.length = 10;
  this.x = details.x || (parent.width * struct.random.float());
  this.y = details.y || (parent.height * struct.random.float());
}

StaticPointset.prototype.getPoint = function(n){
  return this;
}


StaticPointset.prototype.describe = function(s){
  return s+"StaticPointset("+this.x+","+this.y+")\n";
}
