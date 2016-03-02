function Pallete(){
  this.range = [];
  this.total = 0;
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

Pallete.prototype.pickColors = function( random , number ){
  var offset = 1/number;
  var start = random.float();
  var retval = [];
  for ( var index = 0 ; index < number ; index++){
    retval[index] = this.getColor( (start + (offset * index)) % 1.0 );
  }
  return retval;
}

Pallete.prototype.pickColor = function( random ){
  return this.getColor( random.float() );
}

Pallete.prototype.without = function( colors ){
  if ( ! colors.push ){
    colors = [colors]; // make it an array
  }
  var p = new Pallete();
  for ( var id in this.range ){
    var n = this.range[id];
    if ( colors.indexOf( n.color.toHex() ) == -1 ){
      p.addRange( n.weight , n.color );
    }
  }
  //console.log(p,colors,this.range);
  return p;
}

module.exports = Pallete;
