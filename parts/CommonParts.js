
module.exports = {
  keySearchCombine:function(){
    var a = arguments;
    return function(term){
      var retval = [];
      for ( var id in a ){
        var key = a[id];
        if ( !this[key] ){
          console.log(this.describe("!"));
          console.trace("Unable to find "+key+"  ("+id+")")
        }else if ( !this[key].keySearch ){
          console.log(this[key].describe("!"));
          console.dir(this[key]);
          console.trace("Unable to find keySearch for "+key+"  ("+id+")")
        }else{
          v = this[key].keySearch( term );
          if ( v ){
            if ( v.push ){
              retval = retval.concat(v);
            }else{
              retval.push(v);
            }
          }
        }
      }
      if ( retval.length > 0 ){
        return retval;
      }else{
        return null;
      }
    }
  }
}
