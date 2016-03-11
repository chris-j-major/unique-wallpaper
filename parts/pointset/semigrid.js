module.exports = {
  tags:["pointset","dynamic-pointset"],
  create:function create(struct,stack,details){
    return new SemiGridPointset(struct,stack,details);
  }}

function SemiGridPointset(struct,parent,details){
  if (!details) details = {};
  if ( !details.length ) details.length = 10;
  this.pointSetA = struct.pickPart("simple-pointset").create( struct , parent , details );
  this.pointSetB = struct.pickPart("simple-pointset").create( struct , parent , details );
}

SemiGridPointset.prototype.getPoint = function(i){
  var n = Math.floor(Math.sqrt(i));
  var m = i - (n*n);
  var x = 0;
  var y = 0;
  if ( m <= n ){
    x = n;
    y = m;
  }else{
    x = (2*n)-m;
    y = n;
  }
  var p1 = this.pointSetA.getPoint(x);
  var p2 = this.pointSetB.getPoint(y);
  return {
    x:(p1.x+p2.x)*0.5,
    y:(p1.y+p2.y)*0.5
  }
}

SemiGridPointset.prototype.describe = function(s){
  return s+"SemiGridPointset()\n"+this.pointSetA.describe(" "+s)+this.pointSetB.describe(" "+s);
}

SemiGridPointset.prototype.keySearch = function( key , random ){
  if ( key.toLowerCase() == "pointset" ){
    return ["grid like"];
  }else{
    return null;
  }
}
