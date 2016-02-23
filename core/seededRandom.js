function SeededRandom(seed){
  this.seed = parseInt(seed);
}

SeededRandom.prototype.float = function(){
  this.seed = (this.seed * 9301 + 49297) % 233280;
  return this.seed / 233280;
}

SeededRandom.prototype.bool = function(){
  var f = this.float();
  return f > 0.5;
}
SeededRandom.prototype.range = function(min,max){
  var f = this.float();
  var n = min + f * (max - min);
  return n;
}
SeededRandom.prototype.choose = function(choices){
  var id = Math.floor( this.float() * choices.length );
  return choices[id];
}

module.exports = SeededRandom;
