var RandomSeed = require('random-seed');

function SeededRandom(rand,seed){
  if ( typeof rand != 'function' ) throw "SeededRandom requires a function"
  this.rand = rand;
  this.seed = seed;
  this.index = 0;
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
  if ( !this.seed ){
    console.trace("Unable to jump into a non seeded randomness");
    return;
  }
  if ( this.index > index ){
    this.index = 0;
    this.rand = new RandomSeed( this.seed ).random;
  }
  while ( this.index < index ){
    this.memo[this.index] = this.float();
  }
}

SeededRandom.prototype.float = function(){
  this.index ++;
  return this.rand();
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
  var seed = this.range(0,0xffffffff);
  return new SeededRandom( new RandomSeed( seed ).random , seed );
}

module.exports = SeededRandom;
