var random = require('random-seed');

function seededSource( id ){
  return new MemoSource( random.create(id).random );
}
function loopingSource( data ){
  function f(n){
    var p = n % data.length;
    return n[p];
  }
  return new MemoSource( f );
}


function MemoSource( f ){
  this.memo = [];
  this.f = f;
}
MemoSource.prototype.float = function( n ){
  while ( n >= this.memo.length ){
    this.memo.push( this.f() );
  }
  return this.memo[n];
};
MemoSource.prototype.range = function( n , min , max ){
  var f = this.float(n);
  return min + ( max-min ) * f;
};
MemoSource.prototype.bool = function( n ){
  var f = this.float(n);
  return f > 0.5;
};
MemoSource.prototype.choose = function( n , array ){
  var index = Math.floor(this.range( n , 0 , array.length ));
  return array[index];
};
MemoSource.prototype.spawn = function( n ){
  var l = this.range( n , 0 , 65536 );
  return seededSource( l );
};
MemoSource.prototype.seq = function( index ){
  return new Sequence( this , index );
}

function Sequence( memo , index ){
  this.memo = memo;
  this.index = index;
}
Sequence.prototype.float = function(){
  return this.memo.float( this.index ++ );
}
Sequence.prototype.range = function( min , max ){
  return this.memo.range( this.index ++ , min , max );
}
Sequence.prototype.bool = function( ){
  return this.memo.bool( this.index ++ );
}
Sequence.prototype.choose = function( array ){
  return this.memo.choose( this.index ++ , array );
}

module.exports = {
  seededSource:seededSource,
  loopingSource:loopingSource
}
