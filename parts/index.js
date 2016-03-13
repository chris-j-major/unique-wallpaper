module.exports = {
  'all':new PartSet(require("./all")),
  'none':new PartSet([]),
  PartSet:PartSet
};


function PartSet(array){
  var partMap = {};
  this.map = partMap;
  array.map(function(p){
    p.types.map(function(type){
      if( partMap[type] ){
        partMap[type].push(p);
      }else{
        partMap[type] = [ p ];
      }
    });
  });
}
PartSet.prototype.find = function( n , source , key ){
  if ( this.map[key] ){
    return source.choose( n , this.map[key] );
  }else{
    return null;
  }
}
