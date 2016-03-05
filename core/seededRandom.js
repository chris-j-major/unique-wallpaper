var randomSeed = require('random-seed');

function SeededRandom(seed){
  this.seed = seed;
  this.index = 0;
  this.rand = new randomSeed(seed);
  this.memos = {};
}

SeededRandom.prototype.memo = function(n){
  if ( ! this.memo[n] ){
    this.jump(n);
    this.memo[n] = this.float();
  }
  return this.memo[n];
}

SeededRandom.prototype.jump = function(index){
  index = parseInt(index);
  if ( this.index > index ){
    this.index = 0;
    this.rand = new randomSeed(this.seed);
  }
  while ( this.index < index ){
    this.float();
  }
}

SeededRandom.prototype.float = function(){
  this.index ++;
  return this.rand.random();
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
SeededRandom.prototype.spawn = function(choices){
  return new SeededRandom( this.range(0,233280) );
}

module.exports = SeededRandom;
