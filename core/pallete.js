function Pallete(){
  Pallete.create();
}

Pallete.extend = function(obj){
  for ( var id in Pallete.prototype ){
    obj.prototype[id] = Pallete.prototype[id];
  }
}

Pallete.prototype.create = function(){
  this.range = [];
  this.total = 0;
}

Pallete.prototype.addRange = function( weight , color ){
  this.range.push({ weight:weight , color:color });
  this.total += weight;
}

Pallete.prototype.getColor = function( randomFloat ){
  var n = randomFloat * this.total;
  for ( var id in this.range ){
    var k = this.range[id];
    if ( n < k.weight ){
      return k.color;
    }else{
      n = n - k.weight;
    }
  }
  return null;
}

module.exports = Pallete;
